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

/*


=============================================================================


*/

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

/*


=============================================================================


*/

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
        nameAndChoices.push(resJSON[i].email);

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

          // This is just in case the deleteing process messes up, still testing it
          let numberAndDate = "";
          if (test[0] === undefined || test[0] === null) {
            numberAndDate = "";
          } else {
            numberAndDate = `${test[0].number}, ${test[0].dateKey}`;
          }

          // push the selected data to the instanced array established in the scope above
          nameAndChoices.push(numberAndDate);
        }
        // Once the second forloop is done running, push that instanced array into the final array that will contain all the users and their choices
        allUserChoicesAndNumbers.push(nameAndChoices);
        // console.log(allUserChoicesAndNumbers);
      }

      // console.log(allUserChoicesAndNumbers);
      return setFistToFive({ updateState: allUserChoicesAndNumbers });
    })
    .catch(function (err) {
      console.log(err);
    });
};

/*


=============================================================================


*/

// This is the process of the resetting the choices of the user you've selected
export const resetUserChoices = async function (hardResetChoicesState) {
  // Just letting you know that you've started the thing
  console.log("hard reseting the choice Arr");

  // Put this promise in a variable because we use it later
  const firstCall = await fetch("/api/user/findOneUser", {
    method: "POST",
    // passing in the input value with the property of email
    body: JSON.stringify({ email: hardResetChoicesState }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    // This returns the whole userData
    .then((resJSON) => resJSON);

  // Once we've made the first call, start a forloop, to loop through all the choices chosen by that particular user wihtin the fistToFive array
  for (let i = 0; i < firstCall[0].fistToFive.length; i++) {
    // set a instanced variable to each array index
    const choiceId = firstCall[0].fistToFive[i];

    // then do another promise call to the fistToFive Collection to delete said choice
    await fetch("/api/user/deleteOneChoice", {
      method: "DELETE",
      // passing in the id of the choice as the id property
      body: JSON.stringify({ id: choiceId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      // This hopefully returns a 200 response in which case it worked
      .then((resJSON) => resJSON);
  }

  // Then finally after all the choices have been deleted from it's respective Collection, make this last call to clear update the user's fistToFive array value --> this is because deleting the reference data that one collection references, doesn't automatically delete old reference data in the other collection
  await fetch("/api/user/updateUserChoiceArr", {
    method: "PUT",
    // We pass in an id property with the id of the first call in order to find that user
    // We also pass in an empty array in an arr property as the updated value for the fistToFive property
    body: JSON.stringify({ id: firstCall[0]._id, arr: [] }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    // This hopefully returns a 200 resposne in which case it worked
    .then((resJSON) => resJSON);

  // Finally, we just say that you reset the choices of someone, even though there's nothing to really give this statment an immediate alibi besides the data being erased from the front end
  console.log("You Hard reset the choice Arr of Someone");
};

/*


=============================================================================


*/

// This function is for deleting the user
export const deleteUser = async function (hardResetChoicesState) {
  // Say something to give a heads up
  console.log("deleting");

  // We make this first call to get the user data based on the email
  const firstCall = await fetch("/api/user/findOneUser", {
    method: "POST",
    body: JSON.stringify({ email: hardResetChoicesState }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    // returns the whole user data
    .then((resJSON) => resJSON);

  // This if statment is here to check if the first index is not empty
  if (firstCall[0].fistToFive[0] === undefined || firstCall[0].fistToFive[0] === null) {
    // if the first index of the array is not empty, then run this second promise call to delete the user based off of the email
    await fetch("/api/user/deleteOneUser", {
      method: "DELETE",
      body: JSON.stringify({ email: hardResetChoicesState }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      // hopefully this returns a 200 response, in which case it worked, but there is no visible indication that it did work
      .then((resJSON) => resJSON);

    // This is said visible indication
    console.log("You deleted Someone");
  } else {
    // otherwise, leave a convoluded answer for whoever is using the app
    console.log("tis not empty. go empty it");
  }
};

/*


=============================================================================


*/

export const resetOneChoice = async function (softDeleteChoiceState) {
  console.log(softDeleteChoiceState);

  // I need to do this first to get the whole array of the fistToFive value in order to compare it to the data in the state
  const firstCall = await fetch("/api/user/findOneUser", {
    method: "POST",
    // passing in the input value with the property of email
    body: JSON.stringify({ email: softDeleteChoiceState.email }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    // This returns the whole userData
    .then((resJSON) => resJSON)
    .catch((err) => err);

  // We get really nested here -->
  // But we have a loop to loop through all the chocies within the fistToFive Array
  for (let i = 0; i < firstCall[0].fistToFive.length; i++) {
    // We create an instanced promise call to the FOF Collection to find an exact choice and extract it's data via finding it from the Id
    const secondCall = await fetch("/api/fistToFive/findOneChoice", {
      method: "POST",
      // passing in the input value with the property of email
      body: JSON.stringify({ id: firstCall[0].fistToFive[i] }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resJSON) => resJSON)
      .catch((err) => err);

    /*
    Then we have som nested if statements
    This first if statement we are comparing the data from our state to our data in the Collection
    */
    if (
      parseInt(softDeleteChoiceState.choice) === secondCall[0].number &&
      softDeleteChoiceState.dateKey === secondCall[0].dateKey
    ) {
      // If all the data matches, then we make a third call to delete that choice from the FOF collection, however, it doesn't update the FOF array of the user in the User Collection
      console.log("this should happen only once");

      await fetch("/api/fistToFive/deleteOneChoice", {
        method: "DELETE",
        // passing in the id of the choice as the id property
        body: JSON.stringify({ id: secondCall[0]._id }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        // This hopefully returns a 200 response in which case it worked
        .then((resJSON) => resJSON);

      /*
      Since the User Collection doesn't automatically update the user's FOF Collection refrence in the user's fistToFive array, we have to make this fourth call
      
      So, utilizing the for loop from above([i]), we still traverse through the FOF array property of the user and if the id of the choice from the second call that was to be deleted within the third call matches the id reference in the user's FOF array, we take it out of the the instanced array here, cause we haven't changed the collection data yet
      */
      if (secondCall[0]._id === firstCall[0].fistToFive[i]) {
        console.log(firstCall[0].fistToFive.indexOf(secondCall[0]._id));

        firstCall[0].fistToFive.splice(firstCall[0].fistToFive.indexOf(secondCall[0]._id), 1);

        // However, at this moment, we do change the collection with the new instanced array from our firstCall
        await fetch("/api/user/updateUserChoiceArr", {
          method: "PUT",
          // We pass in an id property with the id of the first call in order to find that user
          // We also pass in an empty array in an arr property as the updated value for the fistToFive property
          body: JSON.stringify({ id: firstCall[0]._id, arr: firstCall[0].fistToFive }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          // This hopefully returns a 200 resposne in which case it worked
          .then((resJSON) => resJSON);

        console.log(firstCall[0].fistToFive);
      }
    }
  }
};
