/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { space, color, typography, layout, system } from 'styled-system';

// Add custom system functions if needed
const border = system({
  border: {
    property: 'border',
    scale: 'borders',
  },
});

// Styled component for the Header container
const HeaderContainer = styled('header')(
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: '#282c34',
    paddingBottom: '16px',
    paddingTop: '16px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 768px)': {
      paddingBottom: '12px',
      paddingTop: '12px'
    },
  },
  space,
  color,
  typography,
  layout,
  border
);

// Styled component for the navigation menu
const Nav = styled('nav')(
  {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  space,
  color,
  typography,
  layout
);

// Styled component for the navigation links
const NavLink = styled(Link)(
  {
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '18px',
    margin: '0 12px',
    '@media (max-width: 768px)': {
      fontSize: '16px',
      margin: '8px 0',
    },
    '&:hover': {
      color: '#61dafb',
    },
  },
  space,
  color,
  typography
);

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
