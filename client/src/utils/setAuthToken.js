const body = JSON.stringify({ number: 1 });
const defaultHeader = { "Content-Type": "application/json" };
const token = "adsadas";
// setAuthToken("POST", body, defaultHeader)

// ========================================================================

// This is the Axios version of adding the Auth header to all requests (only works if you use axios for all requests); This also makes for less code in the final product, but I dont show it since I will be using fetch
// import axios from "axios";

// export default setAuthToken = token => {
//   if (token) {
//     // Apply authorization token to every request if logged in
//     axios.defaults.headers.common["Authorization"] = token;
//   } else {
//     // Delete auth header
//     delete axios.defaults.headers.common["Authorization"];
//   }
// };

// ========================================================================

export default function setAuthToken(token) {
  
}

// ========================================================================

// // This is the Fetch version of how I would go about crafting a dynamically changing request
// export default function setAuthToken(method, body, headers, jwtToken) {
//   const fetchOptions = {};
//   // make a new property called method and set that to the argument method --> repeat
//   fetchOptions.method = method;
//   fetchOptions.body = body;

//   if (jwtToken) {
//     // set a new property called Authorization = to your jwt token
//     headers.Authorization = jwtToken;
//     fetchOptions.headers = headers;
//     // console.log(fetchOptions);

//     return fetchOptions;
//   } else {
//     fetchOptions.headers = headers;
//     // console.log(fetchOptions);

//     return fetchOptions;
//   }
// }
