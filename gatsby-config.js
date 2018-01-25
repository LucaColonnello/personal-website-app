require('dotenv-safe').load({
  allowEmptyValues: true
});

module.exports = {
  siteMetadata: {
    title: '@LucaColonnello',
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      }
    },
    'gatsby-plugin-react-helmet'
  ],
};
