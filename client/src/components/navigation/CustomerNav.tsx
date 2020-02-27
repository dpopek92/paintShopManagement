import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

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
 logoutUser: () => void;
}

const CustomerNav: React.FC<Props> = ({ location, logoutUser }) => {
 return (
  <StyledMenu selectedKeys={[location.pathname]} mode="horizontal">
   <Menu.Item key="/">
    <NavLink to="/">Strona główna</NavLink>
   </Menu.Item>

   <SubMenu
    title={
     <span className="submenu-title-wrapper">
      Katalog
      <Icon type="caret-down" />
     </span>
    }
   >
    <Menu.Item key="/catalog/colors">
     <NavLink to="/catalog/colors">Kolory</NavLink>
    </Menu.Item>
    <Menu.Item key="/catalog/handles">
     <NavLink to="/catalog/handles">Uchwyty</NavLink>
    </Menu.Item>
    <Menu.Item key="/catalog/millings">
     <NavLink to="/catalog/millings">Fronty</NavLink>
    </Menu.Item>
    <Menu.Item key="/catalog/glasscases">
     <NavLink to="/catalog/glasscases">Witryny</NavLink>
    </Menu.Item>
    <Menu.Item key="/catalog/veneers">
     <NavLink to="/catalog/veneers">Forniry</NavLink>
    </Menu.Item>
   </SubMenu>

   <Menu.Item key="/prices">
    <NavLink to="/prices">Cennik</NavLink>
   </Menu.Item>

   <Menu.Item key="/contact">
    <NavLink to="/contact">Kontakt</NavLink>
   </Menu.Item>

   <Menu.Item key="/manual">
    <NavLink to="/manual">Jak zamawiać</NavLink>
   </Menu.Item>

   <SubMenu
    title={
     <span className="submenu-title-wrapper">
      Konto
      <Icon type="caret-down" />
     </span>
    }
   >
    <Menu.Item key="/account">
     <NavLink to="/account">Moje dane</NavLink>
    </Menu.Item>
    <Menu.Item onClick={logoutUser}>Wyloguj</Menu.Item>
   </SubMenu>
  </StyledMenu>
 );
};

export default CustomerNav;
