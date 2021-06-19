import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Nav = styled.nav`
display: flex;
align-items: center;
`

const NavLink = styled(Link)`
  margin: 1rem;
  color: black;
  font-size: 1.75rem;
  font-family: ${(props) => props.theme.fonts.Nav};
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.Blue};
    transition: color 0.25s ease-in;
  }
`;
const Header = () => {
  return (
    <Nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="#">Projects</NavLink>
      <NavLink to="#">Blog</NavLink>
    </Nav>

  )
}

export default Header;
