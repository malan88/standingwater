import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import styled from "styled-components";
import { breakpoints } from "../global/breakpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import categories from '../global/categories';

const Box = styled.div`
  border-color: ${(props) => props.theme.colors.Charcoal};
  box-shadow: 3px 3px 3px ${(props) => props.theme.colors.Emerald};
  border-radius: 20px;
  border-style: solid;
  border-width: 2px;
  padding: 3rem 0;
  margin: 4rem auto;
  h1 { margin: 1rem 0; }
  ${breakpoints.vp3} {
    margin: 2rem auto;
    padding: 1rem 0;
    font-size: 1.2rem;
  }
`;
const Box2 = styled(Box)`
  transition: 0.25s ease-in-out;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.Sienna};
    background-color: ${(props) => props.theme.colors.Amber}0F;
  }
`;
const Text = styled.div`
  width: 85%;
  margin: 2rem auto;
`;
const BoxLink = styled.a`
  color: black;
  hover {
    color: black;
  }
`;

const Pill = styled.button`
  border-radius: 50px;
  background-color: ${(props) => props.theme.colors.Amber};
  border: none;
  margin: 0.25rem;
  padding: 0.25rem 1rem;
  cursor: pointer;
  transition: background-color 0.35s ease-out;
  ${breakpoints.vp3} {
    font-size: 1rem;
  }
`;

const Wrapper = ({ wrapper, condition, children }) =>
  condition ? wrapper(children) : children;

const CurrentH = styled.h1`
  ${breakpoints.vp4} {
    font-size: 2.4rem;
  }
  ${breakpoints.vp3} {
    font-size: 2rem;
  }
`
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
      <p>
        I'm always working on something. I don't know what is about programming,
        but I can never get enough of it. This list, like most of the lists on
        this site, is just triggered from a collection of markdown files.  When
        a side project is completed, I'll move it into '/projects'.
      </p>
      {projects.map(({ node }) => (
        <Project project={node} key={node.id} />
      ))}
    </div>
  );
};

const Hobby = ({ hobby }) => {
  return (
    <Box>
      <Text>
        <CurrentH><span className="wave">{hobby.frontmatter.short}</span> {hobby.frontmatter.title}</CurrentH>
        <div dangerouslySetInnerHTML={{ __html: hobby.html }} />
      </Text>
    </Box>

  )
}

const CurrentHobbies = ({ hobbies }) => {
  return (
    <div>
      <CurrentH>What I'm Enjoying</CurrentH>
      <p>
        I have a lot of varied interests. I won't say I go through hobbies like
        butter, but they change, sometimes frequently.
      </p>
      <p>
        These are the hobbies I'm enjoying right now.
      </p>
      {hobbies.map(({ node }) => (
        <Hobby hobby={node} key={node.id} />
      ))}
    </div>
  )
}


const AboutPage = ({ data }) => {
  const current = data.current.edges;
  const hobbies = data.hobbies.edges;

  return (
    <Layout>
      <CurrentH>About Me!</CurrentH>
      <p>
        This is a bit of an unconventional about page. I'm always finding new
        interesting things to work on or enjoy, so this about page is just two
        sets of lists: what I'm working on and what I'm enjoying.
      </p>
      <p>
        I swear, I'll update these regularly!
      </p>
      <CurrentProjects projects={current} />
      <CurrentHobbies hobbies={hobbies} />
    </Layout>
  )
}

export const query = graphql`
  query {
    current: allMarkdownRemark(
      filter: { fields: { collection: { eq: "current" } } },
      sort: { fields: [frontmatter___title], order: ASC }
    ) {
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
    hobbies: allMarkdownRemark(
      filter: { fields: { collection: { eq: "hobbies" } } },
      sort: { fields: [frontmatter___title], order: ASC }

    ) {
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
