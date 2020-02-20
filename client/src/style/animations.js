/* eslint-disable import/prefer-default-export */
import { keyframes } from 'styled-components';

export const BlinkingMessageAnimation = () => {
 return keyframes`
       0%{
           background-color:white;
       }
       50%{
           background-color:red;
           color:white;
       }
       100%{
           background-color:white;
       }
       `;
};
