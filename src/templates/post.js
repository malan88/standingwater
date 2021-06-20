import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import styled from 'styled-components';

const Body = styled.div`
`
const Title = styled.h1`
  font-size: 4rem;
  margin: 1rem auto;
  width: fit-content;
  text-align: center;
`
const Published = styled.h2`
  font-size: 3rem;
  margin: 1rem auto;
  width: fit-content;
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
