// get form element from html
const mainForm = getElementsByID("survey-form");
//this variable will make different uid for each user
let uidNum = 2;

// function to store data in array
function storeData() {
  // this variable will check that is there is an error in any of form field it will not store data
  let hasErrors = false;

  // condition to check error
  if (activeError()) {
    hasErrors = true;
  }

  // condition to check error if there is an error in any of form field it will not store data
  if (!hasErrors) {
    // get the values from each fields and store it in variables
    const fname = getElementsByID("fname").value;
    const email = getElementsByID("email").value;
    const dob = getElementsByID("dob").value;
    const age = returnAge(dob);
    const gender = document.querySelector("input[name=gender]:checked").value;
    const hobbies = document.querySelectorAll("input[name=hobbies]:checked");
    const arrHobbies = [];
    hobbies.forEach((e) => {
      arrHobbies.push(e.value);
    });
    const country = getElementsByID("country").value;
    const state = getElementsByID("state").value;
    const city = getElementsByID("city").value;

    // push data into our main array
    info.push({
      uid: `trID${uidNum}`,
      fname: fname,
      email: email,
      DOB: dob,
      age: age,
      gender: gender,
      hobbies: arrHobbies,
      country: country,
      state: state,
      city: city,
      date: Date(),
    });

    //reset the form after successfull data submit
    resetForm();
  }
}

//get the value of searchbar
const searchValue = getElementsByID("search").value;

// this task will perform on submit of form and will store data and update our main array
mainForm.addEventListener("submit", (e) => {
  //this line will reload page without loosing data
  e.preventDefault();
  //condition will check is search bar has data then will dislay data according to condition otherwise will store data only
  if (searchValue == "") {
    //function calling of data store
    storeData();
    // create new row and insert data on additon of new data
    creatingElements(info.length - 1, info.length);
    //increase number for making uid unique
    uidNum++;
  } else {
    //function calling of data store
    storeData();
    //increase number for making uid unique
    uidNum++;
  }
  // condition to check that if current submited data's fname includes searchbar values,
  // then it will display data otherwise only store the data
  if (
    info[info.length - 1].fname
      .toUpperCase()
      .includes(searchValue.toUpperCase())
  ) {
    searchFunction(event);
  }
});

//function to reset the main form
function resetForm() {
  mainForm.reset();
}

// function to return the age calculated based on DOB
function returnAge(formDate) {
  const dob = new Date(`${formDate}`);
  const month_diff = Date.now() - dob.getTime();
  const age_dt = new Date(month_diff);
  const year = age_dt.getUTCFullYear();
  const age = Math.abs(year - 1970);

  return age;
}

//function to return true or false if there is any error or not
function activeError() {
  const hasActiveError =
    getElementsByID("Enter_Name").style.display === "block" ||
    getElementsByID("Enter_Email").style.display === "block" ||
    getElementsByID("Select_DOB").style.display === "block" ||
    getElementsByID("Select_Radio").style.display === "block" ||
    getElementsByID("Check_Checkbox").style.display === "block" ||
    getElementsByID("Select_Country").style.display === "block" ||
    getElementsByID("Select_State").style.display === "block" ||
    getElementsByID("Select_City").style.display === "block";

  return hasActiveError;
}
