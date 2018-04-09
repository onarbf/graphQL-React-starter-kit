import React from 'react';
import { Query, Mutation } from "react-apollo";
import gpl from 'graphql-tag';
import queries from '../utils/queries';



export default (props)=>{
  return (
    <div>
        works
    </div>
  )
}

// <Query query={queries.query.getUsers}>
//   {(res)=>{
//       if (res.loading) return "loading";
//       if (res.error) {
//         console.log('res.error',res.error);
//         return res.error.message
//       };
//
//       return (
//         <div>
//           {res.data.getUsers.map((user,i)=>(
//             <div key={i}>{user.email}</div>
//           ))}
//         </div>
//       )
//   }}
// </Query>
