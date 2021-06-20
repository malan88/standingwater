import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const HeroPanel = () => {

}

const IndexPage = ({ data }) => {
  return (
    <Layout>

      <GatsbyImage
        image={data.hero.childImageSharp.gatsbyImageData}
        alt="Palmettos"
        layout="fullWidth"
      />
    </Layout>
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
