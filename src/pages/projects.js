import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";
import order from "../markdown/projects/sort";
import { breakpoints } from "../global/breakpoints";
import { faAngleDoubleUp, faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import categories from '../global/categories'

const Body = styled.div`
  font-size: 1.2rem;
`;
const IconFrame = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  color: ${(props) => props.theme.colors.Green};
  cursor: pointer;
  transition: color 0.35s ease-out;
  &:hover {
    color: ${(props) => props.theme.colors.Sienna};
  }
  &.active {
    color: ${(props) => props.theme.colors.Blue};
  }
  ${breakpoints.vp7} {
    margin: 1rem;
  }
`;
const ImageWrapper = styled.div`
  width: 800px;
  margin: 0 auto;
  ${breakpoints.vp12} { width: 500px; }
  ${breakpoints.vp4} { width: 320px; }
  ${breakpoints.vp3} { width: 280px; }
`;
const Text = styled.div`
  width: 85%;
  margin: 2rem auto;
  ${breakpoints.vp3} {
    margin: 1rem auto;
    width: 90%;
    font-size: 1.2rem;
  }
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
  ${breakpoints.vp4} {
    h1 { font-size: 2rem; }
  }
  ${breakpoints.vp3} {
    h1 { font-size: 1.5rem; }
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
  ${breakpoints.vp12} {
    font-size: 1rem;
  }
`;
const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Project = (props) => {
  return (
    <Box id={props.id}>
      {props.image && (
        <a href={props.url}>
          <ImageWrapper>
            <GatsbyImage
              alt={props.title}
              image={props.image}
              style={{ borderRadius: 20, overflow: "hidden" }}
            />
          </ImageWrapper>
        </a>
      )}
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
        <h1>
          <a href={props.url}>
            <FontAwesomeIcon icon={categories[props.category]} /> {props.title}
          </a>
        </h1>
        <div dangerouslySetInnerHTML={{ __html: props.body }} />
      </Text>
    </Box>
  );
};

const SideBarContainer = styled.div`
  position: fixed;
  left: 2rem;
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  font-family: ${(props) => props.theme.fonts.Title};
  ${breakpoints.vp10} {
    display: none;
  }
`;
const SidebarLink = styled.a`
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;
const CategoryIcon = styled(FontAwesomeIcon)``;
const Icon = styled(FontAwesomeIcon)`
  margin: 1rem auto;
  width: fit-content;
  color: ${(props) => props.theme.colors.Blue};
  transition: 0.25s ease-in-out;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.Sienna};
  }
`;

const SideBar = ({ visible }) => {
  const toBottom = () => {
    window.scroll(0, document.body.scrollHeight);
  };
  const toTop = () => {
    window.scroll(0, 0);
  };
  return (
    <SideBarContainer>
      <Icon
        size="2x"
        onClick={() => toTop()}
        icon={faAngleDoubleUp}
        title="Scroll to top"
      />
      {visible.map(({ node, i }) => (
        <SidebarLink key={i} href={`#${node.frontmatter.title}`}>
          {node.frontmatter.title}
        </SidebarLink>
      ))}
      <Icon
        size="2x"
        onClick={() => toBottom()}
        icon={faAngleDoubleDown}
        title="Scroll to bottom"
      />
    </SideBarContainer>
  );
};

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    const nodes = props.data.allMarkdownRemark.edges;

    // sort nodes based on order
    nodes.sort((a, b) => {
      return (
        order.indexOf(a.node.frontmatter.short) -
        order.indexOf(b.node.frontmatter.short)
      );
    });

    // remove nodes not in order and add all tags
    for (let i = 0; i < nodes.length; i++)
      if (!order.includes(nodes[i].node.frontmatter.short)) nodes.splice(i, 1);

    // create tag list and category tree map
    const tags = new Set();
    const categoryTagMap = {};
    Object.keys(categories).forEach((cat) => (categoryTagMap[cat] = [])); // initialize map
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i].node;
      node.frontmatter.tags.forEach((tag) => {
        tags.add(tag);
        if (!categoryTagMap[node.frontmatter.category].includes(tag))
          categoryTagMap[node.frontmatter.category].push(tag);
      });
    }
    Object.keys(categoryTagMap).forEach((cat) => categoryTagMap[cat].sort()); // sort maps
    this.categoryTagMap = categoryTagMap;
    nodes.forEach(({ node }) =>
      node.frontmatter.tags.forEach((tag) => tags.add(tag))
    );
    this.tags = [...tags];
    this.tags.sort();
    this.nodes = nodes;
    this.state = {
      visible: nodes,
      selectedTags: [],
      selectedCategory: "",
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
    this.setState({ selectedTags: sel }, () => this.filterTags());
  };

  filterTags = () => {
    console.log("filterTags");
    const visible = this.state.visiblePool.slice();
    const sel = this.state.selectedTags.slice();
    let newvisible = [];

    if (sel.length <= 0) newvisible = visible;
    else
      visible.forEach((node) => {
        for (let tag of node.node.frontmatter.tags) {
          if (sel.includes(tag)) {
            newvisible.push(node);
            console.log(node.node.frontmatter.title);
            break;
          }
        }
      });
    this.setState({ visible: newvisible });
  };

  clickCategoryHandler = (category) => {
    if (this.state.selectedCategory === category)
      this.setState(
        {
          selectedCategory: "",
          selectedTags: [],
          visibleTags: this.tags,
        },
        () => this.filterCategory()
      );
    else
      this.setState(
        {
          selectedCategory: category,
          selectedTags: [],
          visibleTags: this.categoryTagMap[category],
        },
        () => this.filterCategory()
      );
  };
  filterCategory = () => {
    const nodes = this.nodes.slice();
    let newvisible = [];
    if (this.state.selectedCategory !== "")
      nodes.forEach((node) => {
        if (node.node.frontmatter.category === this.state.selectedCategory)
          newvisible.push(node);
      });
    else newvisible = this.nodes;
    this.setState({ visible: newvisible, visiblePool: newvisible });
  };

  render() {
    return (
      <Layout>
        <SideBar visible={this.state.visible} />
        <Body>
          <Tags>
            {Object.keys(categories).map((category) => (
              <IconFrame
                className={
                  this.state.selectedCategory === category ? "active" : ""
                }
                onClick={() => this.clickCategoryHandler(category)}
                key={category + "root"}
              >
                <CategoryIcon size="3x" icon={categories[category]} />
                {category}
              </IconFrame>
            ))}
          </Tags>
          <Tags>
            {this.state.visibleTags.map((tag) => (
              <Pill
                className={
                  this.state.selectedTags.includes(tag) ? "active" : ""
                }
                onClick={() => this.clickTagHandler(tag)}
                key={tag}
              >
                {tag}
              </Pill>
            ))}
          </Tags>
          {this.state.visible.map(({ node }) => (
            <Project
              id={node.frontmatter.title}
              key={node.id}
              image={
                node.frontmatter.featureImage != null
                  ? node.frontmatter.featureImage.childImageSharp
                      .gatsbyImageData
                  : null
              }
              title={node.frontmatter.title}
              body={node.html}
              url={node.frontmatter.url}
              category={node.frontmatter.category}
              tags={node.frontmatter.tags}
              selectedTags={this.state.selectedTags}
              clickTagHandler={this.clickTagHandler}
            />
          ))}
        </Body>
      </Layout>
    );
  }
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fields: { collection: { eq: "projects" } } }) {
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
              childImageSharp {
                gatsbyImageData(
                  quality: 90
                )
              }
            }
          }
        }
      }
    }
  }
`;

export default ProjectPage;
