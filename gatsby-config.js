require('dotenv-safe').load({
  allowEmptyValues: true
});

const autoprefixer = require('autoprefixer');

module.exports = {
  siteMetadata: {
    title: 'Luca Colonnello - Full Stack Developer',
    description: 'Luca Colonnello, Full Stack Developer using ES React.js Redux GraphQL and Node.js',
    keywords: 'full stack developer, luca colonnello, javascript, study log'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      }
    },
    {
      resolve: `gatsby-plugin-postcss-sass`,
      options: {
        postCssPlugins: [
          autoprefixer(),
        ]
      },
    },
  ],
};
