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
  fetch("/api/fistToFive/", {
    method: "POST",
    body: JSON.stringify({
      number: btn.target.value,
      token : localStorage.jwtToken.substr(7),
      // We have to have stored in this format for future uses because the diff() in day parses in this format
      date: dayJS().format("YYYY-MM-DD"),
      dateKey: dayJS().format("MM-DD-ddd hh:mm:ssa")
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

export const populate = function (setFistToFive) {
  fetch("/api/user/adminReveal")
    .then(function (res) {
      return res.json();
    })
    .then(function (resJSON) {
      // we are sending back only the name and the choices for each nonAdmin person here
      // console.log(resJSON);

      // This is the final array that will have every single user's name and choices
      const allUserChoicesAndNumbers = [];
      let counter = 0;

      for (let i = 0; i < resJSON.length; i++) {
        const nameAndChoices = [];
        nameAndChoices.push(resJSON[i].name);

        for (let j = 0; j < resJSON[i].fistToFive.length; j++) {
          nameAndChoices.push(
            fetch(`/api/fistToFive/${resJSON[i].fistToFive[j]}`)
              .then(function (response) {
                return response.json();
              })
              .then(function (responseJSON) {
                // Literally like malding because I spent the whole day on this issue. Anyways, the solve is to put a counter and use that counter to keep track of the index of the responseJSON because it for some reason, outputs all the of the promises rather than just the ones that should be in the forloop, which I don't get, but this is the solve for right now.

                // This is throwing a soft error at me, but I'm not sure how else to solve the issue;
                const numberAndDate = `${responseJSON[counter].number}, ${responseJSON[counter].dateKey}`;
                counter++;
                return numberAndDate;
              })
          );
        }

        Promise.all(nameAndChoices).then(function (resolve) {
          // I need this if statement here because I was getting just one name results for some reason
          if (resolve.length === 1) {
            return;
          } else {
            allUserChoicesAndNumbers.push(resolve);
            return setFistToFive({ updateState: allUserChoicesAndNumbers });
          }
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};
