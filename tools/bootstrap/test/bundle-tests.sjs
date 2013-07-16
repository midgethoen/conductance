var {context, test, assert} = require('sjs:test/suite');
var {each, map} = require('sjs:sequence');
var url = require('sjs:url');
var fs = require('sjs:nodejs/fs');
var childProcess = require('sjs:nodejs/child-process');
var cutil = require('sjs:cutil');
var str = require('sjs:string');

var hosts = require('./hosts');
var proxyModule = require('../proxy');

var proxy = null;
test.afterAll {||
	console.log("EL PROXY STOP");
	if(proxy) {
		proxy.resume();
	}
};

[
	{
		platform: 'linux',
		arch: 'x64',
		archive: 'linux_x64.tar.gz',
	},
	{
		platform: 'osx',
		arch: 'x64',
		archive: 'linux_x64.tar.gz',
	},
	{
		platform: 'windows',
		arch: 'x64',
		archive: 'linux_x64.tar.gz',
	},
] .. each {|system|
	var platform = system.platform;
	var arch = system.arch;
	var manifestContents = fs.readFile(url.normalize('../share/manifest.json', module.id), 'utf-8')

	context("#{platform}_#{arch}") {||
		var host = hosts[platform];
		var bundle = url.normalize("../dist/#{system.archive}", module.id) .. url.toPath();
		test.beforeAll {||
			childProcess.run('redo-ifchange', [bundle], {'stdio':'inherit'});
			if (!proxy) {
				proxy = cutil.breaking {|brk|
					proxyModule.serve(9090, brk);
				}
			}
		}

		test('host is available') {||
			// don't bother running futher tests if this one fails
			host.runCmd('true');
		}

		context('manual') {||
			test('unpack & boot') {||
				assert.ok(fs.exists(bundle));
				host.copyFile(bundle, '/tmp/conductance-install');
				host.runCmd('bash -ex -c "cd $HOME; rm -rf .conductance; mkdir .conductance; cd .conductance; tar zxf /tmp/conductance-install"');
				host.runCmd('export CONDUCTANCE_DEBUG=1 HTTP_PROXY=' + host.proxy +' HTTPS_PROXY='+host.proxy+'; $HOME/.conductance/share/boot.sh');
				var output = host.runCmd('$HOME/.conductance/bin/conductance --help');
				assert.ok(output .. str.contains('O N I   C O N D U C T A N C E'), output);
				assert.ok(output .. str.contains('Usage: conductance [options] [configfile]'), output);
			}

			test('download new component versions') {||
				var manifest = JSON.parse(manifestContents);
				
				// make a new copy for modification
				var newManifest = JSON.parse(manifestContents);
				var cond = newManifest.data.conductance;
				cond.id = ' 0.99-dev';

				conductance_archive = proxyModule.download(cond.href);

				proxy.value.fake({
					manifest.manifest_url: new Buffer(JSON.stringify(newManifest)),
					manifest.data.stratifiedjs.href: null,
				});

				var output = host.runCmd('$HOME/.conductance/bin/conductance self-update');
				assert.ok(output .. str.contains('conductance: 0.99-dev'), output);

				var output = host.runCmd('$HOME/.conductance/bin/conductance self-update');
			}
		}
	}.timeout(null);
}
