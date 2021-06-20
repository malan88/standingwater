import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const IndexPage = ({ data }) => {
  return (
    <div style={{ display: "grid" }}>
      <GatsbyImage
        image={data.hero.childImageSharp.gatsbyImageData}
        alt="Palmettos"
        layout="fullWidth"
        style={{ gridArea: "1/1" }}
      />
      <Layout
        style={{ gridArea: "1/1", position: "relative", placeItems: "center", display: "grid" }}
      >
        Test
      </Layout>
    </div>
  )
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
