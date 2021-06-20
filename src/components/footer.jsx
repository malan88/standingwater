import React from 'react';
import styled from 'styled-components';
import {
  faGithub,
  faStackOverflow,
  faHackerrank,
  faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const links = {
  "GitHub": [faGithub, "https://github.com/malan88"],
  "StackOverflow": [faStackOverflow, "https://stackoverflow.com/story/malan88"],
  "HackerRank": [faHackerrank, "https://www.hackerrank.com/mas88?hr_r=1"],
  "LinkedIn": [faLinkedin, "https://www.linkedin.com/michael-sendker"],
  "Résumé": [faFilePdf, "https://raw.githubusercontent.com/malan88/resume/master/main.pdf"],
}

const Bar = styled.div`
  display: flex;
  width: 30%;
  margin: 5rem auto;
  justify-content: space-between;
`;
const Icon = styled(FontAwesomeIcon)`
`

const Footer = () => {
  return (
    <Bar>
      {Object.keys(links).map((key) => (
        <a href={links[key][1]}>
          <Icon title={key} icon={links[key][0]} size="2x" />
        </a>
      ))}
    </Bar>
  )
}

export default Footer;
