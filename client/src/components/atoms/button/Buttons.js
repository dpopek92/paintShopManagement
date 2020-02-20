import styled from "styled-components";

export const SmallButton = styled.button`
 display: block;
 border-radius: 5px;
 border: none;
 background-color: ${({ theme }) => theme.blowInfo};
 font-size: 14px;
 padding: 3px 5px;
 color: white;
 &:disabled {
  opacity: 0.5;
  &:hover {
   background-color: ${({ theme }) => theme.blowInfo};
  }
 }
 &:hover {
  background-color: ${({ theme }) => theme.blowInfoLight};
 }
`;
