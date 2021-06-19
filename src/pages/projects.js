import React from 'react';
import Layout from '../components/layout'
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import order from '../assets/projects/sort';

const Image = styled(GatsbyImage)`
  margin: 0 auto;
`
const Text = styled.div`
  width: 85%;
  margin: 2rem auto;
`

const Box = styled.div`
  font-family: ${(props) => props.theme.fonts.Text};
  border-color: ${(props) => props.theme.colors.Charcoal};
  box-shadow: 3px 3px 3px ${(props) => props.theme.colors.Emerald};
  border-radius: 20px;
  border-style: solid;
  border-width: 2px;
  padding: 3rem 0;
  width: 70%;
  margin: 4rem auto;
  h1 {
    margin: 1rem;
  }
`

const Project = (props) => {
  return (
    <div>
      <Box>
        {
          props.image &&
            <a href={props.url}>
              <Image
                alt={props.title}
                image={props.image}
                style={{ borderRadius: 20, overflow: "hidden" }}
              />
            </a>
        }
        <Text>
          <h1><a href={props.url}>{props.title}</a></h1>
          <div dangerouslySetInnerHTML={{__html: props.body}} />
        </Text>
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
                childImageSharp { gatsbyImageData(layout: FIXED, width: 600, height: 200, quality: 90) }
              }
            }
          }
        }
      }
    }
  `)
  const nodes = data.allMarkdownRemark.edges;
  // sort nodes based on order
  nodes.sort((a,b) => {
    return order.indexOf(a.node.frontmatter.short) - order.indexOf(b.node.frontmatter.short);
  });
  // remove nodes not in order
  for (let i = 0; i < nodes.length; i++) {
    if (!order.includes(nodes[i].node.frontmatter.short)) {
      nodes.splice(i,1);
    }
  }
  return (
    <Layout>
      <main>
        {nodes.map(
          ({node}) => (
            <Project
              key={node.id}
              image={node.frontmatter.featureImage != null ? node.frontmatter.featureImage.childImageSharp.gatsbyImageData : null}
              title={node.frontmatter.title}
              body={node.html}
              url={node.frontmatter.url}
            />
          )
        )}
      </main>
    </Layout>
  )
}

export default ProjectsPage
