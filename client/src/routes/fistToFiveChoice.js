// import Dayjs so we can date check and delete very old data in the future
import dayJS from "dayjs";

export const getFistToFive = function (numValue) {
  console.log(numValue);
  fetch("/api/fistToFive")
    .then(function (response) {
      return response.json();
    })
    .then(function (responseJSON) {
      console.log(responseJSON);
    });
};

export const postFistToFive = function (btn) {
  console.log(dayJS().format("MM-DD-ddd hh:mm:ssa"));
  fetch("/api/fistToFive/", {
    method: "POST",
    body: JSON.stringify({
      number: btn.target.value,
      token: localStorage.jwtToken.substr(7),
      // We have to have stored in this format for future uses because the diff() in day parses in this format
      date: dayJS().format("YYYY-MM-DD"),
      dateKey: dayJS().format("MM-DD-ddd hh:mm:ssa"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (resJSON) {
      console.log(resJSON);
    })
    .catch(function (err) {
      console.log(err);
    });
};

// Time to explain for myself too lol --> this is the populating funtion for the admins
export const populate = async function (setFistToFive) {
  // first fetch call to the this route that will get all the users that are not admins --> check the route (from here) --> ../../routes/api/user.js
  fetch("/api/user/adminReveal")
    .then(function (res) {
      return res.json();
    })
    .then(async function (resJSON) {
      // console.log(resJSON);

      // This is the final array that will have every single user's name and choices in seperate arrays
      const allUserChoicesAndNumbers = [];

      // This 1st For loop is here to traverse through the users
      for (let i = 0; i < resJSON.length; i++) {
        // Create an instanced array that will only contain each individual's data
        const nameAndChoices = [];
        // Push in their name to clarify who the data lives with
        nameAndChoices.push(resJSON[i].name);

        // This 2nd For Loop is here to traverse through all their choices that they have chosen though out their life span
        for (let j = 0; j < resJSON[i].fistToFive.length; j++) {
          // this step not totally necessary
          const id = resJSON[i].fistToFive[j];

          // This only works in async functions, but the await allows the code to be read synchronously
          // This is the 2nd fetch request to grab the information from the other collection in the db --> the outcome of this variable is resJSON2
          const test = await fetch(`/api/fistToFive/${id}`)
            .then(function (response2) {
              return response2.json();
            })
            .then(function (resJSON2) {
              return resJSON2;
            });

          // This code below this only runs once the other fetch request is finished
          // console.log(test);

          // This variable is also not technically necessary, but we're here
          const numberAndDate = `${test[0].number}, ${test[0].dateKey}`;

          // push the selected data to the instanced array established in the scope above
          nameAndChoices.push(numberAndDate);
        }
        // Once the second forloop is done running, push that instanced array into the final array that will contain all the users and their choices
        allUserChoicesAndNumbers.push(nameAndChoices);
      }

      // console.log(allUserChoicesAndNumbers);
      return setFistToFive({ updateState: allUserChoicesAndNumbers });
    })
    .catch(function (err) {
      console.log(err);
    });
};
