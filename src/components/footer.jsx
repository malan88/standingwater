import React from "react";
import styled from "styled-components";
import {
  faGithub,
  faStackOverflow,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { breakpoints } from "../global/breakpoints";

const links = {
  GitHub: [faGithub, "https://github.com/mas-4"],
  StackOverflow: [faStackOverflow, "https://stackoverflow.com/story/mas4"],
  LinkedIn: [faLinkedin, "https://www.linkedin.com/in/michael-sendker"],
  Résumé: [
    faFilePdf,
    "https://raw.githubusercontent.com/mas-4/resume/master/main.pdf",
  ],
};

const Width = styled.div`
  width: 40%;
  margin: 5rem auto;
  ${breakpoints.vp12} {
    width: 70%;
  }
  ${breakpoints.vp4} {
    width: 90%;
  }
  ${breakpoints.vp3} {
    width: 100%;
  }
`;

const Bar = styled(Width)`
  display: flex;
  justify-content: space-between;
`;
const Icon = styled(FontAwesomeIcon)``;

const Footer = () => {
  return (
    <footer>
      <Bar>
        {Object.keys(links).map((key) => (
          <a key={key} href={links[key][1]}>
            <Icon title={key} icon={links[key][0]} size="2x" />
          </a>
        ))}
      </Bar>
      <Width>
        © {new Date().getFullYear()} Michael Sendker,{" "}
        <a href="https://standingwater.io">standingwater.io</a>, built with{" "}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </Width>
    </footer>
  );
};

export default Footer;
