//getting clear and search button form search form to make them clickable
const clearBtn = getElementsByID("clearBtn");
const searchBtn = getElementsByID("searchBtn");

// will perform action on click of search button
searchBtn.addEventListener("click", () => {
  // search records from our main array and display
  searchFunction(event);
});

//function to display data onkeyup event
function searchFunction() {
  // array to store searched records
  let arrFound = [];

  // will get the value from search bar
  const searchValue = getElementsByID("search").value;

  // if fname includes search bar values then it will be stored into arrFound named array
  info.forEach((e) => {
    if (e.fname.toUpperCase().includes(searchValue.trim().toUpperCase())) {
      arrFound.push(e);
    }
  });

  // display searched records
  if (arrFound.length > 0) {
    // clear the table body
    const tblBody = getElementsByID("tbl-body");
    tblBody.innerHTML = "";
    //create only searched records and display it
    creatingSearchElements(arrFound);
  }
  //condition will check is there is no records will be found it will shows no data found
  if (arrFound.length == 0) {
    const tblBody = getElementsByID("tbl-body");
    tblBody.innerHTML = "No Data Found";
  }
  //return searched records array
  return arrFound;
}

//will perform action on click of clear search button in search form
clearBtn.addEventListener("click", (e) => {

  //reset the search form
  getElementsByID("search-frm").reset();

  //get table body and clear it
  const tblBody = getElementsByID("tbl-body");
  tblBody.innerHTML = "";

  //display all records of our main array
  creatingElements(0, info.length);

  //select first sort option and make it enabled
  getElementsByID("sort").options[0].selected = true;
  getElementsByID("sort").options[0].disabled = false;
});

// function to sort data based on fname
function sortFunction() {
  //get the searchbar value
  const searchValue = getElementsByID("search").value;
  const sortOption = getElementsByID("sort").value;

  // make sorting first option diabled
  getElementsByID("sort").options[0].disabled = true;

  // if there is no value in search bar main array will be sorted
  if (searchValue == "") {
    //sort our main array in ascending & descending order
    sortOptions(info, sortOption);
    creatingElements(0, info.length);
    // if there is any value in search bar searched recoeds array will be sorted
  } else {
    const getArr = searchFunction(event);
    sortOptions(getArr, sortOption);
    creatingSearchElements(getArr);
  }
}

// this function will create table row,table data & also insert the data of our searched recprds array as per requirements
function creatingSearchElements(arrFound) {
  //get the table body to append all rows
  const tblBody = getElementsByID("tbl-body");

  for (let i = 0; i < arrFound.length; i++) {
    for (let j = 0; j < info.length; j++) {
      // condition to check which record will be display
      if (arrFound[i].uid == info[j].uid) {
        //this line will create each row of table
        const tblRow = createElements("tr");
        // this both line creating table data for every delete and update buttons
        const delBtnTD = createElements("td");
        const updBtnTD = createElements("td");
        // this is for creating delete buttons
        const deleteBtn = createElements("button");
        setAttributes(deleteBtn, "class", "delBtn");
        setAttributes(deleteBtn, "onclick", `deleteFunction("${info[j].uid}")`);
        // this is for creating edit buttons
        const editBtn = createElements("button");
        setAttributes(editBtn, "class", "updBtn");
        setAttributes(editBtn, "onclick", `updateFunction("${info[j].uid}")`);
        // this is creating text inside of delete & edit Button
        const deleteText = document.createTextNode("Delete");
        const editText = document.createTextNode("Edit");
        // this lines will insert created text in to their buttons
        deleteBtn.appendChild(deleteText);
        editBtn.appendChild(editText);
        // this lines will insert update & delete buttons into their cell
        delBtnTD.appendChild(deleteBtn);
        updBtnTD.appendChild(editBtn);
        //this line will store every object values of our searched records array
        const arrFoundValues = Object.values(arrFound[i]);
        //this line will insert all array data into their respective cell
        arrFoundValues.forEach((elmnt) => {
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
  }
}

function sortOptions(arrayName, sortOption) {
  if (sortOption == "ASC") {
    arrayName.sort((a, b) =>
      a.fname.toUpperCase().localeCompare(b.fname.toUpperCase())
    );
  } else {
    arrayName.sort((a, b) =>
      b.fname.toUpperCase().localeCompare(a.fname.toUpperCase())
    );
  }
  const tblBody = getElementsByID("tbl-body");
  tblBody.innerHTML = "";
}
