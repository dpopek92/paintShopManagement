/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  text-align: center;
  margin-top: 60px;
  padding-bottom: 5px;

  p {
    font-size: 11px;
    margin: 0;

    &:last-child {
      font-size: 9px;
    }
  }

  a {
    color: black;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
const StyledStrong = styled.strong`
  color: ${({ theme }) => theme.blowGreen};
`;

const Footer = () => {
  return (
    <StyledWrapper>
      <footer>
        <p>
          Copyright © 2010 Meble Blow. Wszelkie prawa zastrzeżone.{' '}
          <span>
            <StyledStrong>OrderManagementSystem</StyledStrong>
          </span>{' '}
          created by{' '}
          <strong>
            {' '}
            <a href="http://www.damianpopek.pl">Damian Popek</a>
          </strong>
        </p>
      </footer>
    </StyledWrapper>
  );
};

export default Footer;
