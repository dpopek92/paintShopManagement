import React from 'react';
import styled from 'styled-components';

const StyledH1 = styled.h1`
 color: ${({ theme }) => theme.primary};
 letter-spacing: 5px;
`;
const StyledH2 = styled.h2`
 color: ${({ theme }) => theme.secondary};
 font-size: 28px;
 letter-spacing: 3px;
`;
const StyledH3 = styled.h3`
 color: ${({ theme }) => theme.tertiary};
 font-size: 22px;
 letter-spacing: 2px;
`;
const StyledH4 = styled.h4`
 font-size: 18px;
 letter-spacing: 1px;
 font-weight: bold;
`;

type Header = {
 title: string;
 type: 'h1' | 'h2' | 'h3' | 'h4';
};

const Header = ({ title, type }: Header) => {
 if (type === 'h1') return <StyledH1>{title}</StyledH1>;
 if (type === 'h2') return <StyledH2>{title}</StyledH2>;
 if (type === 'h3') return <StyledH3>{title}</StyledH3>;
 if (type === 'h4') return <StyledH4>{title}</StyledH4>;
 return null;
};

export default Header;
