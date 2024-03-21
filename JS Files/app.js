// this is main array which will store data on form submission
const info = [
  {
    uid: "trID0",
    fname: "Virat Kohli",
    email: "viratkohli@gmail.com",
    DOB: "1990-01-04",
    age: "34",
    gender: "Male",
    hobbies: ["Cricket"],
    country: "INDIA",
    state: "Punjab",
    city: "Mohali",
    date: Date(),
  },
  {
    uid: "trID1",
    fname: "Glen Maxwell",
    email: "glenmaxi@gmail.com",
    DOB: "1984-01-04",
    age: "40",
    gender: "Male",
    hobbies: ["Writing", "Cricket"],
    country: "AUSTRALIA",
    state: "Victoria",
    city: "Sunbury",
    date: Date(),
  },
];

// this function will create table row,table data & also insert the data of our main array
creatingElements(0, info.length);

// this function will create table row,table data & also insert the data of our array as per requirements
function creatingElements(start, end) {
  const tblBody = getElementsByID("tbl-body");

  //this loop will make row and columns according to array data
  for (let i = start; i < end; i++) {
    //this line will create each row of table
    const tblRow = createElements("tr");

    // this both line creating table data for every delete and update buttons
    const delBtnTD = createElements("td");
    const updBtnTD = createElements("td");

    // this is for creating delete buttons
    const deleteBtn = createElements("button");
    setAttributes(deleteBtn, "class", "delBtn");
    setAttributes(deleteBtn, "onclick", `deleteFunction("${info[i].uid}")`);

    // this is for creating edit buttons
    const editBtn = createElements("button");
    setAttributes(editBtn, "class", "updBtn");
    setAttributes(editBtn, "onclick", `updateFunction("${info[i].uid}")`);

    // this is creating text inside of delete & edit Button
    const deleteText = document.createTextNode("Delete");
    const editText = document.createTextNode("Edit");

    // this lines will insert created text in to their buttons
    deleteBtn.appendChild(deleteText);
    editBtn.appendChild(editText);

    // this lines will insert update & delete buttons into their cell
    delBtnTD.appendChild(deleteBtn);
    updBtnTD.appendChild(editBtn);

    //this line will store every object values of our main array
    const infoValues = Object.values(info[i]);

    //this line will insert all array data into their respective cell
    infoValues.forEach((elmnt) => {
      const createTD = createElements("td");

      createTD.innerText = elmnt;

      tblRow.appendChild(createTD);
    });
    //this line will join update & delete button into row
    tblRow.appendChild(delBtnTD);
    tblRow.appendChild(updBtnTD);

    // this line will join each row to main table
    tblBody.appendChild(tblRow);
  }
}

// this is delete function whihc will delete a record on click of delete button
function deleteFunction(selectedUID) {
  // this for loop will delete the record from array
  for (let i = 0; i < info.length; i++) {
    if (info[i].uid == selectedUID) {
      info.splice(i, 1);
    }
  }

  // this line will make table body empty
  const tblBody = getElementsByID("tbl-body");
  tblBody.innerHTML = "";

  // this line will get the value of searchbar
  const searchValue = getElementsByID("search").value;

  // if searchbar is empty, then all records of array will be displayed except deleted record
  if (searchValue == "") {
    creatingElements(0, info.length);
  } else {
    // if searchbar is not empty, then all records of array will be displayed whose fname includes searchbar value
    const searchValue = getElementsByID("search").value;
    for (let i = 0; i < info.length; i++) {
      if (
        info[i].fname.toUpperCase().includes(searchValue.trim().toUpperCase())
      ) {
        creatingElements(i, i + 1);
      }
    }
  }
}

// validation function to validate each fields and make every fields required
function validateForm() {
  // get the data from form and store it in a variable
  const fname = getElementsByID("fname").value;
  const email = getElementsByID("email").value;
  const dob = getElementsByID("dob").value;
  const gender =
    getElementsByID("male").checked || getElementsByID("female").checked;
  const hobbies =
    getElementsByID("travel").checked ||
    getElementsByID("read").checked ||
    getElementsByID("write").checked ||
    getElementsByID("cricket").checked;
  const country = getElementsByID("country").value;
  const state = getElementsByID("state").value;
  const city = getElementsByID("city").value;

  // display and hide errors according to data input of form
  errDisplayHide(fname, "Enter_Name");
  errDisplayHide(email, "Enter_Email");
  errDisplayHide(dob, "Select_DOB");
  errDisplayHide(gender, "Select_Radio");
  errDisplayHide(hobbies, "Check_Checkbox");
  errDisplayHide(country, "Select_Country", "-- Select Country --");
  errDisplayHide(state, "Select_State", "-- Select State --");
  errDisplayHide(city, "Select_City", "-- Select City --");
}

// function to display and hide errors
function errDisplayHide(comparingVariable, ID, comparingString = "") {
  if (comparingVariable == comparingString) {
    getElementsByID(ID).style.display = "block";
  } else {
    getElementsByID(ID).style.display = "none";
  }
}

// function for create element
function createElements(eleName) {
  return document.createElement(eleName);
}

// function for get elements from html based on their id
function getElementsByID(eleName) {
  return document.getElementById(eleName);
}

// funtion to set the attribute of html elements
function setAttributes(variableName, attributeName, attributeValue) {
  return variableName.setAttribute(attributeName, attributeValue);
}
