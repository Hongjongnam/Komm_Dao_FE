import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* 수평 스크롤바 제거 */
  }

  body {
    background-color: #ffffff;
    font-size: 14px;
    @media (max-width: 768px) {
      font-size: 12px;
    }
    @media (max-width: 480px) {
      font-size: 10px;
    }
  }

  :root {
    --text-size-primary: 14px;
    --text-size-medium: 16px;
    --text-size-large: 26px;
    --main-white-color: #FFF;
    --main-black-color: #000;
    --main-card-color: #F8F8FA;
    --main-btn-color: #7C4DFF;
    --main-btn-text-color: #875CFF;
    --main-btn-background-color: #E3D9FF;
    --main-btn-disabled-bg: #d9d9d9;
    --status-card-disabled-bg: #d5d5d5;
    --status-card-disabled-color: #555;

    --main-vote-btn-color: #F8F5FF;
    --main-vote-active-color: #CCB7FF;

    --main-border-color: #F2EEFF;
    --sub-border-color: #F2EEFF;

    @media (max-width: 768px) {
      --text-size-primary: 12px;
      --text-size-medium: 14px;
      --text-size-large: 22px;
    }

    @media (max-width: 480px) {
      --text-size-primary: 10px;
      --text-size-medium: 12px;
      --text-size-large: 18px;
    }
  }

  /* reset.css */
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;

    @media (max-width: 768px) {
      font-size: 90%;
    }

    @media (max-width: 480px) {
      font-size: 80%;
    }
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* a tag reset*/
  a {
    color: initial;
    text-decoration: none;
    outline: none;
  }

  a:hover,
  a:active {
    text-decoration: none;
    color: initial;
    background-color: initial;
  }

  /* button tag reset*/
  button {
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
  }

  input {
    outline: none;
  }
`;

export default GlobalStyle;
