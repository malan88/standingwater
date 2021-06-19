import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const NavLink = styled(Link)`

`
const Header = () => {
  return (
    <nav>
      <NavLink to="#">Home</NavLink>
      <NavLink to="#">About</NavLink>
      <NavLink to="#">Skills</NavLink>
      <NavLink to="#">Projects</NavLink>
      <NavLink to="#">Blog</NavLink>
      <NavLink to="#">Contact</NavLink>
    </nav>

  )
}

export default Header;
