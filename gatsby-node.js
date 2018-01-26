const request = require('request-promise-native');
const crypto = require('crypto');

// const allStudyLogQuery = (skip = 0, limit = 20) => `
// {
//   allContentfulStudylog(
//     skip: ${skip},
//     limit: ${limit},
//     sort: {
//       fields: [updatedAt],
//       order: DESC
//     }
//   ) {
//     edges	{
//       node {
//         id,
//         url,
//         studied,
//         createdAt,
//         updatedAt,
//         studied,
//         childLinkInfo {
//           author,
//           publisher,
//           image {
//             width
//             height
//             type
//             url
//           },
//           date,
//           description,
//           title
//         }
//       },
//       previous {
//         id
//       },
//       next {
//         id
//       }
//     }
//   }
// }
// `;

// exports.createPages = ({ graphql, boundActionCreators }) => {
//   const { createPage } = boundActionCreators;

//   return new Promise((resolve, reject) => {
//     graphql(allStudyLogQuery(0, 10))
//       .then(result => {
//         if (result.errors) {
//           reject(result.errors)
//         }


//       });
//   });
// };

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