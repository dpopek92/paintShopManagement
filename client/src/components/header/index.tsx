import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
 color: ${({ theme }) => theme.primary};
 letter-spacing: 5px;
`;

type Header = {
 title: string;
};

const Header = ({ title }: Header) => {
 return <StyledTitle>{title}</StyledTitle>;
};

export default Header;
