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

@ = require('mho:surface');
exports.Countdown = function(seconds) {
  return @Element('span', seconds) .. @Mechanism(function(node) {
    while (seconds > 0) {
      hold(1000);
      node.textContent = --seconds;
    }
  });
}

