/** @jsxImportSource @emotion/react */
import React from 'react';
import { HeaderContainer, Nav, NavLink } from '../styles/Header.style';


const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add-song">Add Song</NavLink>
        <NavLink to="/stat">Statistics</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
