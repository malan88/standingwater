import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { breakpoints } from "../global/breakpoints";

import HeronRaw from '../assets/svg/heron.svg'

const Bar = styled.div`
`;


const Nav = styled.nav`
  float: left;
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  margin: 1rem;
  ${breakpoints.vp4} {
    margin: 0.5rem;
  }
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
const LogoSpan = styled.span`
  vertical-align: -70px;
  margin-right: -50px;
  ${breakpoints.vp4} {
    display: none;
  }
`
const Heron = styled(HeronRaw)`
  float: right;
  ${breakpoints.vp4} {
    width: 50px;
    height: 50px;
    margin-top: 0.3rem;
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
        <LogoSpan>Standingwater</LogoSpan>
        <Heron />
      </div>
    </Bar>

  )
}

export default Header;
