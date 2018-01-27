import React from 'react'
import Link from 'gatsby-link'

import StudyLogCard from '../components/StudyLogCard'

function normaliseDate(utcDate) {
  const date = new Date(utcDate);

  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);

  return date;
}

const StudyLogPage = ({ data, pathContext: { page } }) => {
  const {
    allContentfulStudylog: {
      edges: studyLogList
    }
  } = data;

  let lastUpdatedAt = {};
  
  const firstItem = studyLogList[0];
  const lastItem = studyLogList[studyLogList.length - 1];
  const previousPage = firstItem.previous !== null ? (page - 1) : null;
  const nextPage = lastItem.next !== null ? (page + 1) : null;

  return (
    <div>
      {(page === 1) && (
        <p style={{
          marginTop: '50px',
          textAlign: 'center'
        }}>
          This is my study activity day by day.<br />
          It's about articles and topics I'd like to study,<br />
          as well as the ones I read and learn about.
        </p>
      )}

      {(previousPage !== null) && (
        <p>
          <a href={`/${previousPage === 1 ? '' : previousPage}`}>&lt;- Newer</a>
        </p>
      )}

      {studyLogList.map(({ node }) => {
        let dateHeading = null;
        const normalisedUpdatedAt = normaliseDate(node.updatedAt);

        if (normalisedUpdatedAt.toString() !== lastUpdatedAt.toString()) {
          lastUpdatedAt = normalisedUpdatedAt;
          dateHeading = (
            <h2 key={lastUpdatedAt.toString()} style={{
              textAlign: 'center',
              marginTop: '100px',
              marginBottom: '100px'
            }}>
              {lastUpdatedAt.toGMTString()}
            </h2>
          );
        }

        return [
          dateHeading,
          <StudyLogCard key={node.id} node={node} />
        ];
      })}

      {(nextPage !== null) && (
        <p>
          <a href={`/${nextPage}`}>Older -></a>
        </p>
      )}

      {(nextPage === null) && (
        <p style={{
          marginTop: '50px',
          textAlign: 'center'
        }}>
          That's all.<br />
          See ya later 👋
        </p>
      )}
    </div>
  );
};

export default StudyLogPage;

export const query = graphql`
query IndexQuery($skip: Int!, $limit: Int!) {
 allContentfulStudylog(
   skip: $skip,
   limit: $limit,
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
       updatedAt,
       childLinkInfo {
         author,
         publisher,
         image {
           width
           height
           type
           url
         },
         date,
         description,
         title
       }
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