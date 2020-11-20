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

export const populate = async function (setFistToFive) {
  fetch("/api/user/adminReveal")
    .then(function (res) {
      return res.json();
    })
    .then(async function (resJSON) {
      // we are sending back only the name and the choices for each nonAdmin person here
      // console.log(resJSON);

      // This is the final array that will have every single user's name and choices
      const allUserChoicesAndNumbers = [];
      let counter = 0;
      console.log(resJSON);
      // console.log(resJSON[0].fistToFive[0]);
      console.log(resJSON.length);

      for (let i = 0; i < resJSON.length; i++) {
        console.log(i);

        const nameAndChoices = [];
        nameAndChoices.push(resJSON[i].name);

        for (let j = 0; j < resJSON[i].fistToFive.length; j++) {
          const id = resJSON[i].fistToFive[j];
          console.log(id);
          const test = await fetch(`/api/fistToFive/${id}`)
            .then(function (response2) {
              return response2.json();
            })
            .then(function (resJSON2) {
              return resJSON2;
            });

          console.log(test);
          const numberAndDate = `${test[0].number}, ${test[0].dateKey}`;
          nameAndChoices.push(numberAndDate);
        }
        allUserChoicesAndNumbers.push(nameAndChoices);
      }

      console.log(allUserChoicesAndNumbers);
      return setFistToFive({ updateState: allUserChoicesAndNumbers });

      // console.log(resJSON[0].fistToFive[0]);

      // for (let i = 0; i < resJSON.length; i++) {
      //   const nameAndChoices = [];
      //   nameAndChoices.push(resJSON[i].name);

      //     console.log(resJSON[i].fistToFive[0]);

      // for (let j = 0; j < resJSON[i].fistToFive.length; j++) {
      //   console.log(resJSON[i]);
      //   console.log(resJSON[i].fistToFive[j]);

      //   const fetching = await fetch(`/api/fistToFive/${resJSON[i].fistToFive[j]}`)
      //     .then(function (response) {
      //       return response.json();
      //     })
      //     .then(function (responseJSON) {
      //       // Literally like malding because I spent the whole day on this issue. Anyways, the solve is to put a counter and use that counter to keep track of the index of the responseJSON because it for some reason, outputs all the of the promises rather than just the ones that should be in the forloop, which I don't get, but this is the solve for right now.

      //       // This is throwing a soft error at me, but I'm not sure how else to solve the issue;
      //       const numberAndDate = `${responseJSON[counter].number}, ${responseJSON[counter].dateKey}`;
      //       counter++;
      //       return numberAndDate;
      //     });
      //     console.log(fetching);
      //   nameAndChoices.push(fetching);
      //   console.log(nameAndChoices);
      // }

      // console.log(allUserChoicesAndNumbers);

      // Promise.all(nameAndChoices).then(function (resolve) {
      //   console.log(resolve);
      //   // I need this if statement here because I was getting just one name results for some reason
      //   // if (resolve.length === 1) {
      //   //   return;
      //   // } else {
      //   //   allUserChoicesAndNumbers.push(resolve);
      //   //   return setFistToFive({ updateState: allUserChoicesAndNumbers });
      //   // }
      // });
      // }
    })
    .catch(function (err) {
      console.log(err);
    });
};
