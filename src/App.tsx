import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme, darkTheme } from './theme';
import Router from "./Router";
import { ReactQueryDevtools } from 'react-query/devtools'
import { useState } from "react";


const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
}
a {
  text-decoration:none;
  color: inherit;
}
`;

const ToggleContainer = styled.div`
  position: relative;
  margin-top: 1rem;
  margin-left: 1rem;
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233,233,234);}
  > .toggle--checked {
    background-color: rgb(0,200,102);
    transition : 0.5s
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s
  } >.toggle--checked {
    left: 27px;
    transition : 0.5s
  }
`;

const Desc = styled.div`
`;

function App() {
  const [initTheme, setInitTheme] = useState(theme)
  const [isOn, setisOn] = useState(false);

  const toggleHandler = () => {
    setisOn(!isOn)
    setInitTheme(initTheme === theme ? darkTheme : theme)
  };
  return (
    <ThemeProvider theme={initTheme}>
       <>
      <ToggleContainer
        onClick={toggleHandler}
      >
        <div className={`toggle-container ${isOn ? "toggle--checked" : null}`}/>
        <div className={`toggle-circle ${isOn ? "toggle--checked" : null}`}/>
      </ToggleContainer>
    </>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>

  )
}
export default App


