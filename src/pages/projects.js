import React from 'react';
import Layout from '../components/layout'
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import order from '../assets/projects/sort';
import { faMicrochip, faRobot, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const categories = {
  automation: faRobot,
  web: faGlobe,
  hardware: faMicrochip
}

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
    margin: 1rem 0;
  }
`
const Pill = styled.button`
  border-radius: 50px;
  background-color: ${(props) => props.theme.colors.Amber};
  border: none;
  margin: 0.25rem;
  padding: 0.25rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.Sienna};
    transition: background-color 0.35s ease-out;
  }
  &.active {
    background-color: ${(props) => props.theme.colors.Green};
  }
`
const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-family: ${(props) => props.theme.fonts.Text};
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
          {props.tags.map((item, i) => (
            <Pill key={item + props.title}>{item}</Pill>
          ))}
          <h1><a href={props.url}><FontAwesomeIcon icon={categories[props.category]}/> {props.title}</a></h1>
          <div dangerouslySetInnerHTML={{__html: props.body}} />
        </Text>
      </Box>
    </div>
  )
}

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    const nodes = props.data.allMarkdownRemark.edges;

    // sort nodes based on order
    nodes.sort((a,b) => { return order.indexOf(a.node.frontmatter.short) - order.indexOf(b.node.frontmatter.short); });

    // remove nodes not in order and add all tags
    const tags = new Set();
    for (let i = 0; i < nodes.length; i++) {
      if (!order.includes(nodes[i].node.frontmatter.short)) nodes.splice(i,1);
    }
    nodes.forEach(({node}) => node.frontmatter.tags.forEach((tag) => tags.add(tag)));
    this.nodes = nodes;
    this.state = {
      visible: nodes,
      selectedTags: [],
      selectedCategories: [],
    };
    this.tags = [...tags];
    this.tags.sort();
  }

  clickTagHandler = (tag) => {
    const sel = this.state.selectedTags.slice();
    sel.push(tag);
    this.setState({selectedTags: sel}, () => this.filterTags());
  }

  filterTags = () => {
    const visible = this.nodes.slice();
    const sel = this.state.selectedTags.slice();
    const newvisible = [];
    visible.forEach((node) => {
      for (let tag of node.node.frontmatter.tags) {
        if (sel.includes(tag)) {
          newvisible.push(node);
          break;
        }
      }
    });
    this.setState({visible: newvisible})
  }

  render() {
    return (
      <Layout>
        <main>
          <Tags>
            {this.tags.map((tag) => (
              <Pill
                className={this.state.selectedTags.includes(tag) ? "active" : ""}
                onClick={() => this.clickTagHandler(tag)}
                key={tag}>
                {tag}
              </Pill>
            ))}
          </Tags>
          {this.state.visible.map(
            ({node}) => (
              <Project
                key={node.id}
                image={node.frontmatter.featureImage != null ? node.frontmatter.featureImage.childImageSharp.gatsbyImageData : null}
                title={node.frontmatter.title}
                body={node.html}
                url={node.frontmatter.url}
                category={node.frontmatter.category}
                tags={node.frontmatter.tags}
                activeTags={this.state.selectedTags}
              />
            )
          )}
        </main>
      </Layout>
    )
  }
}

export const query = graphql`
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
            category
            tags
            featureImage {
              childImageSharp { gatsbyImageData(layout: FIXED, width: 600, height: 200, quality: 90) }
            }
          }
        }
      }
    }
  }
`;

export default ProjectPage;
