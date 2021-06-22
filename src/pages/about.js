import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import styled from "styled-components";
import { breakpoints } from "../global/breakpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faDatabase,
  faFilePdf,
  faLayerGroup,
  faServer,
  faDesktop,
  faMicrochip,
  faTerminal,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";

const Project = ({ project }) => {
  const url = project.frontmatter.url;
  const Container = url == null ? Box : Box2;
  return (
    <Wrapper
      condition={url != null}
      wrapper={(children) => <BoxLink href={url}>{children}</BoxLink>}
    >
      <Container>
        <Text>
          <CurrentH>
            <FontAwesomeIcon icon={categories[project.frontmatter.category]} />{" "}
            {project.frontmatter.title}
          </CurrentH>
          {project.frontmatter.tags.map((tag) => (
            <Pill key={project.id + tag}>{tag}</Pill>
          ))}
          <div dangerouslySetInnerHTML={{ __html: project.html }} />
        </Text>
      </Container>
    </Wrapper>
  );
};

const CurrentProjects = ({ projects }) => {
  return (
    <div>
      <CurrentH>What I'm Working On</CurrentH>
      {projects.map(({ node }) => (
        <Project project={node} key={node.id} />
      ))}
    </div>
  );
};


const AboutPage = ({ data }) => {
  const current = data.current.edges;
  const hobbies = data.hobbies.edges;
  console.log(current);
  console.log(hobbies);

  return (
    <Layout>
      {current.map(({node}) => (
        <div>
          {node.frontmatter.title}
        </div>
      ))}
      {hobbies.map(({node}) => (
        <div>
          {node.frontmatter.title}
        </div>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    current: allMarkdownRemark(filter: { fields: { collection: { eq: "current" } } }) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            short
            url
            category
            tags
          }
        }
      }
    }
    hobbies: allMarkdownRemark(filter: { fields: { collection: { eq: "hobbies" } } }) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            short
          }
        }
      }
    }
  }
`;

export default AboutPage;
