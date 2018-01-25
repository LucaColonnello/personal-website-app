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
//        node {
//         id,
//         url,
//         studied,
//         createdAt,
//         updatedAt
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
