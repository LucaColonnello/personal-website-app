import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => {
  console.log('WTH!!! 😱', data);
  return (
    <div>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Link to="/page-2">Go to page 2</Link>
    </div>
  );
}

export default IndexPage

export const query = graphql`
query IndexQuery {
  allContentfulStudylog(
    skip: 0,
    limit: 20,
    sort: {
      fields: [updatedAt],
      order: DESC
    }
  ) {
    edges	{
       node {
        id,
        url,
        studied,
        createdAt,
        updatedAt
      },
      previous {
        id
      },
      next {
        id
      }
    }
  }
}
`;