var html  = require('./base');
var { values, propertyPairs, keys } = require('sjs:object');
var { sanitize, isString } = require('sjs:string');
var { map, join, each } = require('sjs:sequence');
var url = require('sjs:url');

//----------------------------------------------------------------------
exports.CSSDocument = function(content, parent_class) {
  parent_class = parent_class || '';
  return require('./css').scope(content, parent_class);
};

//----------------------------------------------------------------------

/**
  @function Document
  @param {../surface::FragmentTree} [content] Document content
  @param {Settings} [settings]
  @setting {../surface::FragmentTree} [title] Document title
  @setting {../surface::FragmentTree} [head] Additional HTML content to appear in the document's <head> (before SJS is initialized)
  @setting {String} [init] SJS source code to run on the client once SJS is initialized
  @setting {String} [main] SJS module URL to run on the client
  @setting {Function|String} [template="default"] Document template
  @desc
    **Note:** the `head` and `title` settings can be any [../surface::FragmentTree] type,
    but since they're used for customising the HTML <head> before SJS is initialized, only the
    raw HTML value be used (i.e any mechanisms and other non-html content on these objects will be ignored).

    If `template` is a function, it will be called with a single argument - an object containing the following properties:

     - head: html to be inserted into the <head> element
     - script: initialization, as a <script type="text/sjs"> tag
     - body: the main document content

    `template` must return a String.

    If `template` is a string, it will be passed to [::loadTemplate], and the returned
    function will be called as above.
*/
exports.Document = function(content, settings) {

  content = html.collapseHtmlFragment(content || undefined);

  var headContent, userInit, title, mainModule, template;
  if(settings) {
    title = settings.title;
    headContent = settings.head;
    userInit = settings.init;
    mainModule = settings.main;
    template = settings.template;
  }

  template = template || 'default';
  if (template .. isString) template = exports.loadTemplate(template);

  headContent = headContent ? html.collapseHtmlFragment(headContent).getHtml() : "";
  if (title) {
    headContent += html.collapseHtmlFragment(`<title>$title</title>`).getHtml();
  }

  headContent += keys(content.getExternalScripts()) ..
    map(url -> "<script src=\"#{sanitize(url)}\"></script>") ..
    join('\n');

  headContent += values(content.getStyleDefs()) ..
      map([ref_count,def] -> def.getHtml()) ..
    join('\n');

  headContent += "<script src='/__sjs/stratified.js' asyc='true'></script>";

  headContent += "<script type='text/sjs'>
    require.hubs.push(['mho:', '/__mho/']);
    require.hubs.push(['\u2127:', 'mho:']);
  </script>";

  var mechanisms = propertyPairs(content.getMechanisms()) ..
    map(function([id, code]) {
      if (typeof code !== 'string')
        throw new Error('Static surface code cannot contain mechanisms with function objects');
      return "mechs[#{id}] = function(){ #{code} };"
    });

  var bootScript = "";
  if (userInit) bootScript += "\n" + userInit;
  
  // keep static & dynamic worlds from colliding; see comment at top of html.sjs
  bootScript += html._getDynOniSurfaceInit()

  if (mechanisms.length > 0) {
    bootScript += "
      (function () {
        var mechs = {};
        #{mechanisms .. join('\n')}
        var { reverse, each, filter } = require('sjs:sequence');
        (document.body.querySelectorAll('._oni_mech_') || []) .. 
          reverse .. // we want to start mechanisms in post-order; querySelectorAll is pre-order
          each {
            |elem|
            elem.__oni_mechs = [];
            elem.getAttribute('data-oni-mechanisms').split(' ') .. 
            filter .. // only truthy elements
            each { 
              |mech|
              elem.__oni_mechs.push(spawn mechs[mech].call(elem, elem));
            }
          }
        })();
    ";
  }

  if(mainModule) bootScript += "\nrequire(\"#{sanitize(mainModule)}\", {main: true});";


  bootScript = "<script type='text/sjs'>#{ html.escapeForTag(bootScript, 'script') }</script>";

  return template({ head: headContent,
                    script: bootScript,
                    body: content.getHtml()
                  });
};

/**
  @function loadTemplate
  @param {String} [name] template name or module URL
  @param {optional String} [base] base URL
  @desc
    Loads a template module by name or URL and returns its
    Document property (which should be a function).

    If `name` is a single word (i.e no path separators), it's assumed to name a builtin
    template, which are currently:

     - default
     - plain

    Otherwise, `name` is normalized against `base` (using [sjs:url::normalize]). If
    you do not pass a `base` argument, `name` must be an absolute URL.
*/
exports.loadTemplate = function(name, base) {
  if (/^\w+$/.test(name)) {
    // name is relative to ./doctemplates/
    name = './doctemplates/'+name;
  } else {
    name = url.normalize(name, base);
  }

  try {
    require.resolve(name);
  }
  catch(e) {
    throw new Error("Document Template #{name} not found");
  }

  var module = require(name);
  var fn = module.Document;
  if(!fn) throw new Error("#{name} is not a template module");
  return fn;
};
