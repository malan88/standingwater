import React from "react";
import Layout from "../components/layout";
import { Link, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";

const BigText = styled.div`
  font-family: ${(props) => props.theme.fonts.Header};
  font-size: 4rem;
  margin: 3rem auto;
  margin-bottom: 10rem;
  line-height: 4rem;
  p {
    margin: 4rem 0;
  }
`;

const HeroPanel = () => {
  return (
    <BigText>
      <p>
        <span role="img" ariaLabel="wave">
          {" "}
          👋{" "}
        </span>{" "}
        Hi,
      </p>
      <p>
        {"I'm"} <strong>Michael Sendker</strong>, and this is{" "}
        <strong>Standingwater</strong>.
      </p>
      <p>
        Really {"it's"} just me. <strong>Standingwater</strong> is me.
      </p>
      <p>
        {"I'm"} a software developer obsessed with learning new things. And
        Standingwater is my one-man agency. My{" "}
        <Link to="/projects">projects page</Link> showcases my work, and my{" "}
        <Link to="/blog">blog page</Link> showcases my thoughts.
      </p>
    </BigText>
  );
};

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <div style={{ height: 1 }} />
      <HeroPanel />

      <GatsbyImage
        image={data.hero.childImageSharp.gatsbyImageData}
        alt="Palmettos"
        layout="fullWidth"
      />
    </Layout>
  );
};

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "images/palmettos.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`;

export default IndexPage;
