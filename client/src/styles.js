import { css, createGlobalStyle } from 'styled-components';

// *** Global styles ***
let GlobalStyle;
// code block and 'styled' variable below  is hack for syntax
{
  const styled = createGlobalStyle;
  GlobalStyle = styled`
${
    '' /* height: 100% below is not necessary, but if not specyfy
main container height will have problems
can be deleted if in Page height replaced to 100vh instead of 100%
(but on mobiles footer seen not well because of browser panel in the top) */
  }
html,
body,
#root {
  height: 100%;
}

body {
  margin: 0;

  font-family: 'Verdana', sans-serif;
  line-height: 1.375;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

ol,
ul,
dl {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
a,
button,
span,
label {
  overflow: hidden;
  text-overflow: ellipsis;
}
`;
}

// *** Mixins ***

const visuallyHidden = css`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;

const mixins = { visuallyHidden };

// *** Exports ***
export { GlobalStyle, mixins };
