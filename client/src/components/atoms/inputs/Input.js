import styled from "styled-components";

const StyledInput = styled.input`
 height: 28px;
 width: 100%;
 border-radius: 3px;
 border: 1px solid lightgray;
 &:focus {
  background-color: ${({ theme, focus }) =>
   focus ? theme.blowPrimaryLight : null};
 }
`;

export default StyledInput;
