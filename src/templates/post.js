import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import styled from 'styled-components';
import { breakpoints } from "../global/breakpoints";

const Body = styled.div`
  ${breakpoints.vp7} {
    code {
      font-size: 1rem;
      line-height: 0.5rem !important;
    }
  }
  ${breakpoints.vp3} { font-size: 1.2rem; }
`;
const Title = styled.h1`
  font-size: 4rem;
  margin: 1rem auto;
  text-align: center;
  overflow-wrap: break-word;
  width: 80%;
  ${breakpoints.vp7} { font-size: 3rem; }
  ${breakpoints.vp3} { font-size: 2rem; }
`
const Published = styled.h2`
  font-size: 3rem;
  margin: 1rem auto;
  width: fit-content;
  ${breakpoints.vp7} { font-size: 2rem; }
  ${breakpoints.vp3} { font-size: 1rem; }
`

const Post = ({data}) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <Title>{post.frontmatter.title}</Title>
      <Published>{post.frontmatter.date}</Published>
      <Body dangerouslySetInnerHTML={{__html: post.html}} />
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
`
export default Post;
