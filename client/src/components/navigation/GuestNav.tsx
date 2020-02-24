import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const StyledMenu = styled(Menu)`
 display: flex;
 justify-content: flex-end;
`;

interface location {
 pathname: string;
 search: string;
 hash: string;
 state: any;
}

interface Props {
 location: location;
}

const GuestNav: React.FC<Props> = ({ location }) => {
 return (
  <StyledMenu selectedKeys={[location.pathname]} mode="horizontal">
   <Menu.Item key="/login">
    <NavLink to="/login">
     <Icon type="login" />
     Zaloguj
    </NavLink>
   </Menu.Item>
   <Menu.Item key="/register">
    <NavLink to="/register">
     <Icon type="user-add" />
     Zarejestruj
    </NavLink>
   </Menu.Item>
  </StyledMenu>
 );
};

export default GuestNav;
