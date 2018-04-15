import React from 'react';
import StudyLogList from '../../components/StudyLogList';

import './style.scss';


const StudyLog = ({ data, pathContext: { page } }) => {
  const {
    allContentfulStudylog: {
      edges: studyLogList
    }
  } = data;

  const firstItem = studyLogList[0];
  const lastItem = studyLogList[studyLogList.length - 1];
  const previousPage = firstItem.previous !== null ? (page - 1) : null;
  const nextPage = lastItem.next !== null ? (page + 1) : null;

  return (
    <div className="studylog">
      {(previousPage === null) && (
        <div className="studylog__top">
          <p>
            This is my study activity day by day.
            It's about articles and topics I'd like to study,
            as well as the ones I already have. 😎
          </p>
        </div>
      )}

      <div className="studylog__list">
        <StudyLogList
          previousPage={previousPage}
          nextPage={nextPage}
          list={studyLogList}
        />
      </div>

      {(nextPage === null) && (
        <p className="studylog__bottom">
          That's all.<br />
          See ya later 👋
        </p>
      )}
    </div>
  );
};

export default StudyLog;

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
