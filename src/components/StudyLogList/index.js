import React from 'react';
import Link from 'gatsby-link';

import {
  normaliseDate,
  printDateWithoutHours,
} from '../../utils/dates';

import StudyLogCard from '../StudyLogCard';

import './style.scss';


function getDistinctGroupDate(itemDate, currentGroupDate) {
  const normalisedItemDate = normaliseDate(itemDate);

  if (normalisedItemDate.toString() !== currentGroupDate.toString()) {
    return normalisedItemDate;
  }

  return false;
}

function createStudyLogListFragment(list) {
  let currentGroupDate = '';

  return list.map(({ node }) => {
    const card = (<StudyLogCard key={node.id} node={node} />);
    const newGroupDate = getDistinctGroupDate(node.updatedAt, currentGroupDate);

    if (newGroupDate) {
      currentGroupDate = newGroupDate;

      return [
        (
          <h3 className="title" key={currentGroupDate.toString()}>
            {printDateWithoutHours(currentGroupDate)}
          </h3>
        ),
        card,
      ];
    }

    return card;
  });
};

const StudyLogList = ({ list, previousPage, nextPage }) => {
  return (
    <div className="studylog-list">
      {(previousPage !== null) && (
        <p className="studylog-list__newer">
          <a href={`/${previousPage === 1 ? '' : previousPage}`}>&lt;- Newer</a>
        </p>
      )}

      {createStudyLogListFragment(list)}

      {(nextPage !== null) && (
        <p className="studylog-list__older">
          <a href={`/${nextPage}`}>Older -&gt;</a>
        </p>
      )}
    </div>
  );
};

export default StudyLogList;
