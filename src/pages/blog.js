import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const Body = styled.div`
`
const Box = styled.div`
  border-color: ${(props) => props.theme.colors.Charcoal};
  box-shadow: 3px 3px 3px ${(props) => props.theme.colors.Emerald};
  border-radius: 20px;
  border-style: solid;
  border-width: 2px;
  padding: 1rem 3rem;
  margin: 4rem auto;
  transition: 0.25s ease-in-out;
  h2 {
    margin: 1rem 0;
  }
  &:hover {
    color: ${(props) => props.theme.colors.Sienna};
    background-color: ${(props) => props.theme.colors.Amber}0F;
  }
`;
const Title = styled.h2`
  font-family: ${(props) => props.theme.fonts.Heading};
`
const NakedLink = styled(Link)`
  color: black;
`
const Published = styled.h3`
`


const Blurb = (props) => {
  return (
    <NakedLink to={props.slug}>
      <Box>
        <Title>{props.title}</Title>
        <Published>{props.date}</Published>
        <p>{props.excerpt}</p>
      </Box>
    </NakedLink>
  )
}

const BlogPage = ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <Body>
        <h2>{data.allMarkdownRemark.totalCount} Posts</h2>
        {data.allMarkdownRemark.edges.map(({node}) => (
          <Blurb
            key={node.id}
            title={node.frontmatter.title}
            date={node.frontmatter.date}
            excerpt={node.excerpt}
            slug={node.fields.slug}
          />
        ))}
      </Body>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: {fields: {collection: {eq: "posts"}}},
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt(pruneLength: 400)
        }
      }
    }
  }
`;

export default BlogPage
