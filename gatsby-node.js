const request = require('request-promise-native');
const crypto = require('crypto');
const path = require('path');

// required by gatsby when
// the OS is not giving a UNIX path for files
const slash = require('slash');

const maxNumberOfItems = 1500;
const itemsPerPage = 20;
const maxNumberOfPages = Math.ceil(maxNumberOfItems / itemsPerPage);

const allStudyLogQuery = (skip = 0, limit = maxNumberOfItems) => `
{
  allContentfulStudylog(
    skip: ${skip},
    limit: ${limit},
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

function forEachPage(dataSet = [], handler = () => {}) {
  let data = dataSet;
  let page = 0;

  while (page <= maxNumberOfPages && data.length) {
    const pick = data.slice(0, itemsPerPage);
    data = data.slice(itemsPerPage);
    page++;

    // page is + 1 since the first page is the index
    handler(pick, page);
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => (
    graphql(allStudyLogQuery())
      .then(({
        errors,
        data
      }) => {
        if (errors) {
          reject(errors)
        }

        const studyLogTemplate = path.resolve(`./src/templates/study-log.js`)

        console.log(`⚡️  Creating ${data.allContentfulStudylog.edges.length} page`);

        forEachPage(data.allContentfulStudylog.edges, (items, page) => {
          const pagePath = page === 1 ? '/' : `/${page}`;
          const skip = itemsPerPage * (page - 1);
          const limit = itemsPerPage;

          console.log(`⚡️  --- Creating page ${page   // ↩︎
          } with path '${pagePath}', skip ${skip} and limit ${limit}`);

          createPage({
            path: pagePath,
            component: slash(studyLogTemplate),
            context: {
              skip,
              limit,
              page
            },
          });
        });

        resolve();
      })
  ));
};

exports.onCreateNode = async ({ node, boundActionCreators, getNode }) => {
  const {
    createNode,
    createParentChildLink
  } = boundActionCreators;
  
  if (node.internal.type !== 'ContentfulStudylog') {
    return;
  }

  // fetch microlink info 
  const info = await request({
    uri: `https://api.microlink.io?url=${node.url}`,
    json: true
  });
    
  if (info.status !== 'success') {
    return;
  }

  const JSONStringified = JSON.stringify(info.data);
  const linkInfoNode = {
    id: `${node.id} >> linkInfo`,
    parent: node.id,
    children: [],
    internal: {
      type: 'linkInfo',
      content: JSONStringified,
      contentDigest: (
        crypto
          .createHash(`md5`)
          .update(JSONStringified)
          .digest(`hex`)
      )
    },

    ...info.data
  };

  createNode(linkInfoNode);
  createParentChildLink({ parent: node, child: linkInfoNode })
};
