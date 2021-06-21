import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import HeronRaw from '../assets/svg/heron.svg'

const Bar = styled.div`
`;

const Heron = styled(HeronRaw)`
  float: right;
`;

const Nav = styled.nav`
  float: left;
  display: flex;
  align-items: center;
`;

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
  &.active {
    color: ${(props) => props.theme.colors.Emerald};
  }
`;
const Header = () => {
  return (
    <Bar>
      <Nav>
        <NavLink activeClassName="active" to="/">home</NavLink>
        <NavLink activeClassName="active" to="/projects">projects</NavLink>
        <NavLink activeClassName="active" to="/blog">blog</NavLink>
      </Nav>
      <div style={{ float: "right" }}>
        <span style={{ verticalAlign: -70, marginRight: -50 }}>Standingwater</span>
        <Heron />
      </div>
    </Bar>

  )
}

export default Header;
