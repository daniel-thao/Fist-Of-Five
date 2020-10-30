// import React, { useContext } from "react";

// // SOOO INstead of doing global axios mimic with Fetch, I'm going to just use the local storage to handle this.
// // the jwt Token is gonig to be encrypted, so we need to decrypt it
// import { decode } from "jsonwebtoken";
// import jwt_decode from "jwt-decode";

// // We also want to check the one in the local storage to the user that is logged in -- honestly i probs all cases, this is always going to be true, but we are gonig to do it anyways --> YAY redundancy
// import { AuthContext } from "../routes/authentication/userAuth";

// export default function setAuthFetchOptions(token) {
//   const { user } = useContext(AuthContext);

//   const decodedToken = jwt_decode(localStorage.jwtToken);
//   if (user === decodedToken) {
//     console.log("Hi");
//   }
// }

// // ========================================================================

// // This is the Axios version of adding the Auth header to all requests (only works if you use axios for all requests); This also makes for less code in the final product, but I dont show it since I will be using fetch
// // import axios from "axios";

// // export default setAuthToken = token => {
// //   if (token) {
// //     // Apply authorization token to every request if logged in
// //     axios.defaults.headers.common["Authorization"] = token;
// //   } else {
// //     // Delete auth header
// //     delete axios.defaults.headers.common["Authorization"];
// //   }
// // };

// // ========================================================================
