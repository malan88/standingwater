import React from 'react';
import Layout from '../components/layout'
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const Image = styled(GatsbyImage)`
  margin: 0 auto;
`
const Box = styled.div`
  font-family: ${(props) => props.theme.fonts.Text};
  border-color: ${(props) => props.theme.colors.Emerald};
  border-radius: 20px;
  border-style: solid;
  border-width: 1px;
  padding: 1rem;
  margin: 1rem;
`

const Project = (props) => {
  return (
    <div>
      <Box>
        {
          props.image &&
            <Image
              alt={props.title}
              image={props.image}
              style={{ borderRadius: 20, overflow: "hidden" }}
            />
        }
        <h1>{props.title}</h1>
        <div dangerouslySetInnerHTML={{__html: props.body}} />
      </Box>
    </div>
  )
}

const ProjectsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: {fields: {collection: {eq: "projects"}}}) {
        edges {
          node {
            id
            html
            frontmatter {
              title
              short
              url
              featureImage {
                childImageSharp {
                  gatsbyImageData(layout: FIXED, width: 600, height: 200, quality: 90)
                }
              }
            }
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <main>
        {data.allMarkdownRemark.edges.map(
          ({node}) => (
            <Project
              key={node.id}
              image={node.frontmatter.featureImage != null ? node.frontmatter.featureImage.childImageSharp.gatsbyImageData : null}
              title={node.frontmatter.title}
              body={node.html}
            />
          )
        )}
      </main>
    </Layout>
  )
}

export default ProjectsPage
