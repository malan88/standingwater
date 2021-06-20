import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import order from '../assets/projects/sort';
import { faMicrochip, faRobot, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const categories = {
  automation: faRobot,
  web: faGlobe,
  hardware: faMicrochip
}
const Body = styled.div`
  font-size: 1.2rem;
`
const IconFrame = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  color: ${(props) => props.theme.colors.Blue};
  cursor: pointer;
  transition: color 0.35s ease-out;
  &:hover {
    color: ${(props) => props.theme.colors.Sienna};
  }
  &.active {
    color: ${(props) => props.theme.colors.Green};
  }
`;
const Icon = styled(FontAwesomeIcon)`
`;

const Image = styled(GatsbyImage)`
  margin: 0 auto;
`;
const Text = styled.div`
  width: 85%;
  margin: 2rem auto;
`;
const Box = styled.div`
  border-color: ${(props) => props.theme.colors.Charcoal};
  box-shadow: 3px 3px 3px ${(props) => props.theme.colors.Emerald};
  border-radius: 20px;
  border-style: solid;
  border-width: 2px;
  padding: 3rem 0;
  margin: 4rem auto;
  h1 {
    margin: 1rem 0;
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
  &:hover {
    background-color: ${(props) => props.theme.colors.Sienna};
  }
  &.active {
    background-color: ${(props) => props.theme.colors.Green};
  }
`;
const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Project = (props) => {
  return (
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
        {props.tags.map((tag) => (
          <Pill
            key={tag + props.title}
            className={props.selectedTags.includes(tag) ? "active" : ""}
            onClick={() => props.clickTagHandler(tag)}
          >
            {tag}
          </Pill>
        ))}
        <h1><a href={props.url}><FontAwesomeIcon icon={categories[props.category]}/> {props.title}</a></h1>
        <div dangerouslySetInnerHTML={{__html: props.body}} />
      </Text>
    </Box>
  )
}

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    const nodes = props.data.allMarkdownRemark.edges;

    // sort nodes based on order
    nodes.sort((a,b) => { return order.indexOf(a.node.frontmatter.short) - order.indexOf(b.node.frontmatter.short); });

    // remove nodes not in order and add all tags
    for (let i = 0; i < nodes.length; i++)
      if (!order.includes(nodes[i].node.frontmatter.short)) nodes.splice(i,1);

    // create tag list and category tree map
    const tags = new Set();
    const categoryTagMap = {}
    Object.keys(categories).forEach((cat) => categoryTagMap[cat] = []); // initialize map
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i].node;
      node.frontmatter.tags.forEach((tag) => {
        tags.add(tag);
        if (!categoryTagMap[node.frontmatter.category].includes(tag)) categoryTagMap[node.frontmatter.category].push(tag);
      })
    }
    Object.keys(categoryTagMap).forEach((cat) => categoryTagMap[cat].sort()); // sort maps
    this.categoryTagMap = categoryTagMap;
    nodes.forEach(({node}) => node.frontmatter.tags.forEach((tag) => tags.add(tag)));
    this.tags = [...tags];
    this.tags.sort();
    this.nodes = nodes;
    this.state = {
      visible: nodes,
      selectedTags: [],
      selectedCategory: '',
      visibleTags: this.tags,
      visiblePool: nodes,
    };
  }

  clickTagHandler = (tag) => {
    const sel = this.state.selectedTags.slice();
    if (sel.includes(tag)) {
      const index = sel.indexOf(tag);
      if (index > -1) sel.splice(index, 1);
    } else sel.push(tag);
    this.setState({selectedTags: sel}, () => this.filterTags());
  }

  filterTags = () => {
    console.log('filterTags');
    const visible = this.state.visiblePool.slice();
    const sel = this.state.selectedTags.slice();
    let newvisible = [];

    if (sel.length <= 0) newvisible = visible;
    else
      visible.forEach((node) => {
        for (let tag of node.node.frontmatter.tags) {
          if (sel.includes(tag)) {
            newvisible.push(node);
            console.log(node.node.frontmatter.title)
            break;
          }
        }
      });
    this.setState({visible: newvisible})
  }

  clickCategoryHandler = (category) => {
    if (this.state.selectedCategory===category)
      this.setState({
        selectedCategory: "",
        selectedTags:[],
        visibleTags: this.tags
      }, () => this.filterCategory());
    else
      this.setState({
        selectedCategory: category,
        selectedTags: [],
        visibleTags: this.categoryTagMap[category]
      }, () => this.filterCategory());
  }
  filterCategory = () => {
    const nodes = this.nodes.slice();
    let newvisible = [];
    if (this.state.selectedCategory !== "")
      nodes.forEach((node) => {
        if (node.node.frontmatter.category === this.state.selectedCategory) newvisible.push(node);
      })
    else newvisible = this.nodes;
    this.setState({visible: newvisible, visiblePool: newvisible});
  }


  render() {
    return (
      <Layout>
        <Body>
        <Tags>
          {Object.keys(categories).map((category) => (
            <IconFrame
              className={this.state.selectedCategory === category ? "active" : ""}
              onClick={() => this.clickCategoryHandler(category)}
              key={category + "root"}
            >
              <Icon size="3x"icon={categories[category]} />
              {category}
            </IconFrame>
          ))}
        </Tags>
        <Tags>
          {this.state.visibleTags.map((tag) => (
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
              selectedTags={this.state.selectedTags}
              clickTagHandler={this.clickTagHandler}
            />
          )
        )}
        </Body>
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
