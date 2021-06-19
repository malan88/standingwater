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
