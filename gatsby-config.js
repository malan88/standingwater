module.exports = {
  siteMetadata: {
    title: "Standingwater",
    siteUrl: "https://standingwater.io",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1000,
              withWebp: true,
              showCaptions: true,
              quality: 80,
            },
          },
          "gatsby-remark-emoji",
        ],
      }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-fontawesome-css",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "./src/markdown/posts/",
      },
      __key: "posts",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "projects",
        path: "./src/markdown/projects/",
      },
      __key: "projects",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "current",
        path: "./src/markdown/current/",
      },
      __key: "current",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "hobbies",
        path: "./src/markdown/hobbies/",
      },
      __key: "hobbies",
    },
  ],
};
