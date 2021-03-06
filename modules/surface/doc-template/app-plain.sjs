/* (c) 2013-2014 Oni Labs, http://onilabs.com
 *
 * This file is part of Conductance, http://conductance.io/
 *
 * It is subject to the license terms in the LICENSE file
 * found in the top-level directory of this distribution.
 * No part of Conductance, including this file, may be
 * copied, modified, propagated, or distributed except
 * according to the terms contained in the LICENSE file.
 */

/**
  @summary A minimal template for `.app` modules
  @desc
    This template includes no default styles or additional javascript.
*/

exports.Document = settings ->
  `<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
    <script type='text/sjs' module='mho:app'>
      var html = require('mho:surface/html');
      module.exports = require('sjs:object').merge(html, {
        body: document.body,
        mainContent: document.body
      });
    </script>
    ${ settings.head }
    ${ settings.script }
  </head>
  <body>${settings.body}</body>
</html>`;
