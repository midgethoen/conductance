var { scope, scale, darken, add } = require('../../css');

exports.css = function(vars, mixins) {
  vars = vars || require('../variables').defaultLookAndFeel;
  mixins = mixins || require('../mixins').Mixins(vars);

  var rv = "\
/* Inline and block code styles */
code,
pre {
  padding: 0 3px 2px;
  #{mixins.font.family.monospace()}
  font-size: #{add(vars.baseFontSize(), -2)};
  color: #{vars.grayDark() };
  #{mixins.border_radius('3px')}
}

/* Inline code */
code {
  padding: 2px 4px;
  color: #d14;
  background-color: #f7f7f9;
  border: 1px solid #e1e1e8;
  white-space: nowrap;
}

/* Blocks of code */
pre {
  display: block;
  padding: #{scale(add(vars.baseLineHeight(), -1), 1/2)};
  margin: 0 0 #{scale(vars.baseLineHeight(), 1/2)};
  font-size: #{vars.baseFontSize() .. add (-1)}; /* 14px to 13px */
  line-height: #{vars.baseLineHeight()};
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre;
  white-space: pre-wrap;
  background-color: #f5f5f5;
  border: 1px solid #ccc; /* fallback for IE7-8 */
  border: 1px solid rgba(0,0,0,.15);
  #{mixins.border_radius(vars.baseBorderRadius())}
}

  /* Make prettyprint styles more spaced out for readability */
pre.prettyprint {
    margin-bottom: #{vars.baseLineHeight()};
}

  /* Account for some code outputs that place code tags in pre tags */
pre code {
    padding: 0;
    color: inherit;
    white-space: pre;
    white-space: pre-wrap;
    background-color: transparent;
    border: 0;
}


/* Enable scrollable blocks of code */
.pre-scrollable {
  max-height: 340px;
  overflow-y: scroll;
}
";

  return rv;
};