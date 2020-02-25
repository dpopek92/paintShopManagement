import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: center;
 flex-wrap: wrap;
`;

const FlexTemplate: React.FC = ({ children }) => {
 return <StyledWrapper>{children}</StyledWrapper>;
};

export default FlexTemplate;
