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

const AdminNav: React.FC<Props> = ({ location, logoutUser }) => {
 return (
  <StyledMenu selectedKeys={[location.pathname]} mode="horizontal">
   <Menu.Item key="/">
    <NavLink to="/">Strona główna</NavLink>
   </Menu.Item>

   <SubMenu
    title={
     <span className="submenu-title-wrapper">
      Produkcja
      <Icon type="caret-down" />
     </span>
    }
   >
    <Menu.Item key="/production">
     <NavLink to="/production">Podgląd</NavLink>
    </Menu.Item>

    <Menu.Item key="/timetable">
     <NavLink to="/timetable">Planowanie</NavLink>
    </Menu.Item>

    <Menu.Item key="/paints">
     <NavLink to="/paints">Lakiery</NavLink>
    </Menu.Item>
   </SubMenu>
   <SubMenu
    title={
     <span className="submenu-title-wrapper">
      Statystyki
      <Icon type="caret-down" />
     </span>
    }
   >
    <Menu.Item key="/statistics/production">
     <NavLink to="/statistics/production">Produkcji</NavLink>
    </Menu.Item>
    <Menu.Item key="/statistics/employees">
     <NavLink to="/statistics/employees">Pracowników</NavLink>
    </Menu.Item>
    <Menu.Item key="/statistics/customers">
     <NavLink to="/statistics/customers">Klientów</NavLink>
    </Menu.Item>
   </SubMenu>

   <Menu.Item key="/customers">
    <NavLink to="/customers">Klienci</NavLink>
   </Menu.Item>

   <Menu.Item key="/employees">
    <NavLink to="/employees">Pracownicy</NavLink>
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

   <Menu.Item key="/manual">
    <NavLink to="/manual">Jak zamawiać</NavLink>
   </Menu.Item>

   <Menu.Item key="/settings">
    <NavLink to="/settings">Ustawienia</NavLink>
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

export default AdminNav;
