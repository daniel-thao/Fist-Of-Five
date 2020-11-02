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

export const postFistToFive = function (numValue) {};

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
                console.log(responseJSON);
                const numberAndDate = `${responseJSON[j].number}, ${responseJSON[j].date}`
                const justNumber = responseJSON[j].number;
                return numberAndDate;
              })
          );
        }

        Promise.all(nameAndChoices).then(function (resolve) {
          console.log(resolve);
          allUserChoicesAndNumbers.push(resolve);
          return setFistToFive({ updateState: allUserChoicesAndNumbers });
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};
