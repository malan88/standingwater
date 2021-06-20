const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const parent = getNode(node.parent);
    let collection = parent.sourceInstanceName;
    const slug = createFilePath({ node, getNode, basePath: `blog` });
    if (collection === "posts") {
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })
    }
    createNodeField({
      node,
      name: 'collection',
      value: collection,
    });
  }
};
exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMarkdownRemark( filter: {fields: {collection: {eq: "posts"}}}) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  data.allMarkdownRemark.edges.forEach(edge => {
    const slug = edge.node.fields.slug
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/post.js`),
      context: { slug: slug },
    })
  })
}
