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
  /* .nav-tabs{
    .nav-item{
    color: #73a52e;
    font-weight: 400;
    letter-spacing:3px;
    padding: 10px 40px;
    }
  } */
  /* table{ */
    /* th, td{
      vertical-align: middle !important;
      text-align: center;
      padding: 2px !important;
    } */
  /* } */
  /* .elementNotIncludedToPrice{
     background-color: rgba(177, 207, 241, 0.8);
  }
  .elementToLong{
    background-color: rgba(255, 153, 0, 0.5);
  }
  .elementLost{
    background-color: rgba(231, 188, 186, 0.8);
  }
  .elementToCorrect{
    background-color: rgba(204, 247, 179, 0.8);
  }
  span, h1 {
   &.Surówka {
    color: #ffbd40;
   }
   &.Podkład {
    color: #f5f5f5;
    text-shadow: 1px 1px 3px rgb(75, 75, 75);
   }
   &.Szlifiernia {
    color: #33cec3
   }
   &.Lakiernia {
    color: #a4cfff
   }
   &.Polernia {
    color: #fa3e54
   }
   &.Pakowanie {
    color: #85eb6a
   }
   &.Zakończone {
    color: #e165b9
   }
  }

  option, tr {
   
   &.Surówka {
    
    background-color: #ffbd40;
   }
   &.Podkład {
    
    background-color: #f5f5f5;
   }
   &.Szlifiernia {
    
    background-color: #33cec3
   }
   &.Lakiernia {
    
    background-color: #a4cfff
   }
   &.Polernia {
    
    background-color: #fa3e54
   }
   &.Pakowanie {
    
    background-color: #85eb6a
   }
   &.Zakończone {
    
    background-color: #e165b9
   }
  } */
`;

export default GlobalStyle;
