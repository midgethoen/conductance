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

/* ------------------------------------ *
* NOTE:                                *
*   This file is auto-generated        *
*   any manual edits will be LOST      *
* ------------------------------------ */

/* ------------------------------------ *
* NOTE:                                *
*   This file is auto-generated        *
*   any manual edits will be LOST      *
* ------------------------------------ */
/**
  // metadata for sjs:bundle:
  @require sjs:object
  @require sjs:array
  @require sjs:sequence
  @require sjs:compare
  @require sjs:debug
  @require sjs:function
  @require sjs:cutil
  @require sjs:quasi
  @require sjs:assert
  @require sjs:logging
  @require sjs:string
  @require sjs:event
  @require sjs:sys
  @require sjs:url
*/

var hostenv = require('builtin:apollo-sys').hostenv;
var modules = [
  'sjs:object',
  'sjs:array',
  'sjs:sequence',
  'sjs:string',
  'sjs:compare',
  'sjs:debug',
  {id: 'sjs:function', name:'fn'},
  'sjs:cutil',
  'sjs:quasi',
  {id:'sjs:assert', name:'assert'},
  {id:'sjs:logging', include:['print','debug','verbose','info','warn','error']},
  {id:'sjs:logging', name:'logging'},
  'sjs:event',
  {id:'sjs:sys', name: 'sys'},
  {id:'sjs:http', name: 'http'},
  {id:'sjs:regexp', name: 'regexp'},
  {id:'sjs:url', name: 'url'},
];

if (hostenv === 'nodejs') {
  modules = modules.concat([
    'sjs:nodejs/stream',
    {id:'sjs:sys', include: ['argv', 'eval']},
    {id:'nodejs:path', name: 'path'},
    {id:'sjs:nodejs/fs', name: 'fs'},
    {id:'sjs:nodejs/child-process', name: 'childProcess'},
  ]);
} else {
  modules = modules.concat([
    {id:'sjs:sys', include: ['eval']},
    {id: 'sjs:xbrowser/dom', name: 'dom'},
    {id: 'sjs:xbrowser/dom', include: ['preventDefault','stopEvent', 'eventTarget']},
  ]);
}


/**
  // metadata for sjs:bundle:
  @require mho:surface
  @require mho:env
*/

modules = modules.concat([
  {id:'mho:env', name:'env'},
  {id:'mho:surface'},
  {id:'mho:observable'},
]);

if (hostenv === 'nodejs') {
  modules = modules.concat([
    {id:'mho:server', include:['Host', 'Route', 'Port']},
    {id:'mho:server', name:'server'},
    {id:'mho:server/route', name:'route'},
    'mho:server/response',
    'mho:server/generator',
  ]);
}

module.exports = require(modules);

/**
@noindex
@summary Common functionality for conductance applications
@desc
  
  This module combines commonly-used functionality from the
  Conductance and StratifiedJS standard libraries. It includes
  everything from the [sjs:std::] SJS module, plus functionality
  available only to conductance applications.
  
  Typically, conductance applications and scripts will use this
  module to access common functionality in a single line:
  
      @ = require('mho:std');
  
  (see also: [sjs:#language/syntax::@altns])
  
  
  ### Module aliases:
  
   - **assert**: (module [sjs:assert](#sjs%3Aassert))
   - **childProcess**: (module [sjs:nodejs/child-process](#sjs%3Anodejs%2Fchild-process))
   - **dom**: (module [sjs:xbrowser/dom](#sjs%3Axbrowser%2Fdom))
   - **env**: (module [mho:env](#mho%3Aenv))
   - **fn**: (module [sjs:function](#sjs%3Afunction))
   - **fs**: (module [sjs:nodejs/fs](#sjs%3Anodejs%2Ffs))
   - **http**: (module [sjs:http](#sjs%3Ahttp))
   - **logging**: (module [sjs:logging](#sjs%3Alogging))
   - **path**: (module [nodejs:path](http://nodejs.org/api/path.html))
   - **regexp**: (module [sjs:regexp](#sjs%3Aregexp))
   - **route**: (module [mho:server/route](#mho%3Aserver%2Froute))
   - **server**: (module [mho:server](#mho%3Aserver))
   - **sys**: (module [sjs:sys](#sjs%3Asys))
   - **url**: (module [sjs:url](#sjs%3Aurl))
  
  ### Symbols from the [mho:observable](#mho%3Aobservable) module:
  
   - **changes**: (function [mho:observable::changes])
   - **current**: (function [mho:observable::current])
   - **isConflictError**: (function [mho:observable::isConflictError])
   - **ObservableVar**: (class [mho:observable::ObservableVar])
   - **observe**: (function [mho:observable::observe])
  
  
  ### Symbols from the [mho:server](#mho%3Aserver) module:
  *(when in the nodejs environment)*
  
   - **Host**: (class [mho:server::Host])
   - **Port**: (class [mho:server::Port])
   - **Route**: (class [mho:server::Route])
  
  
  ### Symbols from the [mho:server/generator](#mho%3Aserver%2Fgenerator) module:
  *(when in the nodejs environment)*
  
   - **BundleGenerator**: (function [mho:server/generator::BundleGenerator])
   - **moduleTimestamp**: (function [mho:server/generator::moduleTimestamp])
  
  
  ### Symbols from the [mho:server/response](#mho%3Aserver%2Fresponse) module:
  *(when in the nodejs environment)*
  
   - **HttpError**: (class [mho:server/response::HttpError])
   - **isHttpError**: (function [mho:server/response::isHttpError])
   - **NotFound**: (function [mho:server/response::NotFound])
   - **ServerError**: (function [mho:server/response::ServerError])
  
  
  ### Symbols from the [mho:surface](#mho%3Asurface) module:
  
   - **appendContent**: (function [mho:surface::appendContent])
   - **Attrib**: (function [mho:surface::Attrib])
   - **Autofocus**: (function [mho:surface::Autofocus])
   - **Class**: (function [mho:surface::Class])
   - **Document**: (function [mho:surface::Document])
   - **Element**: (class [mho:surface::Element])
   - **Enabled**: (function [mho:surface::Enabled])
   - **ensureElement**: (function [mho:surface::ensureElement])
   - **Id**: (function [mho:surface::Id])
   - **insertAfter**: (function [mho:surface::insertAfter])
   - **insertBefore**: (function [mho:surface::insertBefore])
   - **isElement**: (function [mho:surface::isElement])
   - **loadTemplate**: (function [mho:surface::loadTemplate])
   - **Mechanism**: (function [mho:surface::Mechanism])
   - **On**: (function [mho:surface::On])
   - **OnClick**: (function [mho:surface::OnClick])
   - **prependContent**: (function [mho:surface::prependContent])
   - **Prop**: (function [mho:surface::Prop])
   - **RawHTML**: (function [mho:surface::RawHTML])
   - **removeNode**: (function [mho:surface::removeNode])
   - **replaceContent**: (function [mho:surface::replaceContent])
   - **RequireExternalScript**: (function [mho:surface::RequireExternalScript])
   - **RequireExternalStyle**: (function [mho:surface::RequireExternalStyle])
   - **Style**: (function [mho:surface::Style])
  
  
  ### Symbols from the [sjs:array](#sjs%3Aarray) module:
  
   - **cmp**: (function [sjs:array::cmp])
   - **cycle**: (function [sjs:array::cycle])
   - **difference**: (function [sjs:array::difference])
   - **flatten**: (function [sjs:array::flatten])
   - **isArrayLike**: (function [sjs:array::isArrayLike])
   - **remove**: (function [sjs:array::remove])
   - **union**: (function [sjs:array::union])
  
  
  ### Symbols from the [sjs:compare](#sjs%3Acompare) module:
  
   - **describeEquals**: (function [sjs:compare::describeEquals])
   - **eq**: (function [sjs:compare::eq])
   - **equals**: (function [sjs:compare::equals])
   - **shallowEq**: (function [sjs:compare::shallowEq])
   - **shallowEquals**: (function [sjs:compare::shallowEquals])
  
  
  ### Symbols from the [sjs:cutil](#sjs%3Acutil) module:
  
   - **breaking**: (function [sjs:cutil::breaking])
   - **Condition**: (class [sjs:cutil::Condition])
   - **Queue**: (class [sjs:cutil::Queue])
   - **Semaphore**: (class [sjs:cutil::Semaphore])
   - **waitforAll**: (function [sjs:cutil::waitforAll])
   - **waitforFirst**: (function [sjs:cutil::waitforFirst])
  
  
  ### Symbols from the [sjs:debug](#sjs%3Adebug) module:
  
   - **inspect**: (function [sjs:debug::inspect])
   - **prompt**: (function [sjs:debug::prompt])
  
  
  ### Symbols from the [sjs:event](#sjs%3Aevent) module:
  
   - **Emitter**: (class [sjs:event::Emitter])
   - **HostEmitter**: (class [sjs:event::HostEmitter])
   - **wait**: (function [sjs:event::wait])
   - **when**: (function [sjs:event::when])
  
  
  ### Symbols from the [sjs:logging](#sjs%3Alogging) module:
  
   - **debug**: (function [sjs:logging::debug])
   - **error**: (function [sjs:logging::error])
   - **info**: (function [sjs:logging::info])
   - **print**: (function [sjs:logging::print])
   - **verbose**: (function [sjs:logging::verbose])
   - **warn**: (function [sjs:logging::warn])
  
  
  ### Symbols from the [sjs:nodejs/stream](#sjs%3Anodejs%2Fstream) module:
  *(when in the nodejs environment)*
  
   - **pump**: (function [sjs:nodejs/stream::pump])
   - **read**: (function [sjs:nodejs/stream::read])
   - **ReadableStringStream**: (class [sjs:nodejs/stream::ReadableStringStream])
   - **readAll**: (function [sjs:nodejs/stream::readAll])
   - **WritableStringStream**: (class [sjs:nodejs/stream::WritableStringStream])
   - **write**: (function [sjs:nodejs/stream::write])
  
  
  ### Symbols from the [sjs:object](#sjs%3Aobject) module:
  
   - **clone**: (function [sjs:object::clone])
   - **construct**: (function [sjs:object::construct])
   - **Constructor**: (function [sjs:object::Constructor])
   - **extend**: (function [sjs:object::extend])
   - **get**: (function [sjs:object::get])
   - **getOwn**: (function [sjs:object::getOwn])
   - **getPath**: (function [sjs:object::getPath])
   - **has**: (function [sjs:object::has])
   - **hasOwn**: (function [sjs:object::hasOwn])
   - **keys**: (function [sjs:object::keys])
   - **merge**: (function [sjs:object::merge])
   - **override**: (function [sjs:object::override])
   - **ownKeys**: (function [sjs:object::ownKeys])
   - **ownPropertyPairs**: (function [sjs:object::ownPropertyPairs])
   - **ownValues**: (function [sjs:object::ownValues])
   - **pairsToObject**: (function [sjs:object::pairsToObject])
   - **propertyPairs**: (function [sjs:object::propertyPairs])
   - **setPath**: (function [sjs:object::setPath])
   - **tap**: (function [sjs:object::tap])
   - **values**: (function [sjs:object::values])
  
  
  ### Symbols from the [sjs:quasi](#sjs%3Aquasi) module:
  
   - **isQuasi**: (function [sjs:quasi::isQuasi])
   - **joinQuasis**: (function [sjs:quasi::joinQuasis])
   - **mapQuasi**: (function [sjs:quasi::mapQuasi])
   - **Quasi**: (class [sjs:quasi::Quasi])
   - **toQuasi**: (function [sjs:quasi::toQuasi])
  
  
  ### Symbols from the [sjs:sequence](#sjs%3Asequence) module:
  
   - **all**: (function [sjs:sequence::all])
   - **all.par**: (function [sjs:sequence::all.par])
   - **any**: (function [sjs:sequence::any])
   - **any.par**: (function [sjs:sequence::any.par])
   - **at**: (function [sjs:sequence::at])
   - **buffer**: (function [sjs:sequence::buffer])
   - **combine**: (function [sjs:sequence::combine])
   - **concat**: (function [sjs:sequence::concat])
   - **consume**: (function [sjs:sequence::consume])
   - **count**: (function [sjs:sequence::count])
   - **each**: (function [sjs:sequence::each])
   - **each.par**: (function [sjs:sequence::each.par])
   - **fib**: (function [sjs:sequence::fib])
   - **filter**: (function [sjs:sequence::filter])
   - **filter.par**: (function [sjs:sequence::filter.par])
   - **find**: (function [sjs:sequence::find])
   - **find.par**: (function [sjs:sequence::find.par])
   - **first**: (function [sjs:sequence::first])
   - **generate**: (function [sjs:sequence::generate])
   - **groupBy**: (function [sjs:sequence::groupBy])
   - **hasElem**: (function [sjs:sequence::hasElem])
   - **indexed**: (function [sjs:sequence::indexed])
   - **integers**: (function [sjs:sequence::integers])
   - **intersperse**: (function [sjs:sequence::intersperse])
   - **isSequence**: (function [sjs:sequence::isSequence])
   - **isStream**: (function [sjs:sequence::isStream])
   - **join**: (function [sjs:sequence::join])
   - **map**: (function [sjs:sequence::map])
   - **map.par**: (function [sjs:sequence::map.par])
   - **pack**: (function [sjs:sequence::pack])
   - **partition**: (function [sjs:sequence::partition])
   - **reduce**: (function [sjs:sequence::reduce])
   - **reduce1**: (function [sjs:sequence::reduce1])
   - **reverse**: (function [sjs:sequence::reverse])
   - **skip**: (function [sjs:sequence::skip])
   - **skipWhile**: (function [sjs:sequence::skipWhile])
   - **slice**: (function [sjs:sequence::slice])
   - **sort**: (function [sjs:sequence::sort])
   - **sortBy**: (function [sjs:sequence::sortBy])
   - **Stream**: (class [sjs:sequence::Stream])
   - **take**: (function [sjs:sequence::take])
   - **takeWhile**: (function [sjs:sequence::takeWhile])
   - **toArray**: (function [sjs:sequence::toArray])
   - **toStream**: (function [sjs:sequence::toStream])
   - **transform**: (function [sjs:sequence::transform])
   - **transform.par**: (function [sjs:sequence::transform.par])
   - **transform.par.unordered**: (function [sjs:sequence::transform.par.unordered])
   - **unpack**: (function [sjs:sequence::unpack])
   - **zip**: (function [sjs:sequence::zip])
   - **zipLongest**: (function [sjs:sequence::zipLongest])
  
  
  ### Symbols from the [sjs:string](#sjs%3Astring) module:
  
   - **base64ToArrayBuffer**: (function [sjs:string::base64ToArrayBuffer])
   - **base64ToOctets**: (function [sjs:string::base64ToOctets])
   - **capitalize**: (function [sjs:string::capitalize])
   - **contains**: (function [sjs:string::contains])
   - **endsWith**: (function [sjs:string::endsWith])
   - **isString**: (function [sjs:string::isString])
   - **lstrip**: (function [sjs:string::lstrip])
   - **octetsToBase64**: (function [sjs:string::octetsToBase64])
   - **padBoth**: (function [sjs:string::padBoth])
   - **padLeft**: (function [sjs:string::padLeft])
   - **padRight**: (function [sjs:string::padRight])
   - **rsplit**: (function [sjs:string::rsplit])
   - **rstrip**: (function [sjs:string::rstrip])
   - **sanitize**: (function [sjs:string::sanitize])
   - **split**: (function [sjs:string::split])
   - **startsWith**: (function [sjs:string::startsWith])
   - **strip**: (function [sjs:string::strip])
   - **supplant**: (function [sjs:string::supplant])
   - **unindent**: (function [sjs:string::unindent])
   - **utf16ToUtf8**: (function [sjs:string::utf16ToUtf8])
   - **utf8ToUtf16**: (function [sjs:string::utf8ToUtf16])
  
  
  ### Symbols from the [sjs:sys](#sjs%3Asys) module:
  
   - **eval**: (function [sjs:sys::eval])
   - **argv**: (function [sjs:sys::argv])
  
  
  ### Symbols from the [sjs:xbrowser/dom](#sjs%3Axbrowser%2Fdom) module:
  *(when in the xbrowser environment)*
  
   - **eventTarget**: (function [sjs:xbrowser/dom::eventTarget])
   - **preventDefault**: (function [sjs:xbrowser/dom::preventDefault])
   - **stopEvent**: (function [sjs:xbrowser/dom::stopEvent])

*/
