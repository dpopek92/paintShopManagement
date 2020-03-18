import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,600');
  
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family:  sans-serif;
    color:#3f454d
  }
 .invalid {
   margin-top:1px;
    bottom: 0;
   color: #fa3e54;
   font-size: 12px;
  }
  .tableRow__clicable{
    cursor:pointer;
  }
  hr{
    border: .5px solid #ebebeb
  }
  .ant-form-item{
    margin-bottom:5px;
  }
  .ant-select-selection:focus {
  background-color: #a9e4fc;
}
`;

export default GlobalStyle;
