import React from 'react'
import Link from 'gatsby-link'

const StudyLogCard = ({ node }) => {
  const {
    id,
    url,
    studied,
    createdAt,
    updatedAt,
    childLinkInfo: {
      author,
      publisher,
      image,
      date,
      description,
      title
    }
  } = node;

  const {
    width: imageWidth,
    height: imageHeight,
    type: imageType,
    url: imageSrc
  } = image || {};

  return (
    <div
      style={{
        marginBottom: '60px',
        borderBottom: '2px solid #333'
      }}
    >
      <h3>
        <a href={url}>{title}</a>
      </h3>

      {imageSrc && (
        <img
          src={`http://images.weserv.nl/?url=${
            imageSrc.replace(/https?\:\/\//g, '')
          }&w=300&h=300&t=square&a=center`}
        />
      )}

      <p>{description}</p>

      <p>
        By <i>{author}</i>, <i>{publisher}</i> <br />
        <strong>{date}</strong>
      </p>

      <p>Added to the study log: {createdAt}</p>
    </div>
  );
};

export default StudyLogCard
