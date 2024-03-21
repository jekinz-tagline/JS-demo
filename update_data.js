// this function will hit when edit button clicked and will update the data of submitted data
function updateFunction(selectedUID) {
  info.forEach((e) => {
    // condition will check wether uid is same or not, if same then will enter in to block and perform action given below
    if (selectedUID == e.uid) {
      // create upate button and get other buttons based on their id & class
      const updateBtn = createElements("button");
      const deleteBtn = document.getElementsByClassName("delBtn");
      const editBtn = document.getElementsByClassName("updBtn");
      const submitBtn = getElementsByID("btn");
      const cancelBtn = getElementsByID("cnclBtn");

      // diable searchbar and their buttons & sorting option
      getElementsByID("search").disabled = true;
      getElementsByID("sort").disabled = true;
      getElementsByID("searchBtn").disabled = true;
      getElementsByID("clearBtn").disabled = true;

      // set attribute of update function to perform the update action
      setAttributes(updateBtn, "type", "button");
      updateBtn.innerText = "Update";
      updateBtn.style =
        "background-color: lightskyblue; position: relative; left: 40%; font-size: 15px;";

      // this loop will disable all edit and delete buttons
      for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].disabled = true;
        editBtn[i].disabled = true;
      }

      // submit button will be hide and update button will take place of submit button
      displayBtns(submitBtn, "none");
      submitBtn.after(updateBtn);

      // disaply cancel button below update button
      displayBtns(cancelBtn, "block");
      cancelBtn.style.marginTop = "5px";

      // will perform task on click of cancel button
      cancelBtn.addEventListener("click", () => {
        // reset the form
        resetForm();

        // display submit button & hide cancel and update button
        displayBtns(cancelBtn, "none");
        displayBtns(submitBtn, "block");
        displayBtns(updateBtn, "none");

        // enable delete & edit button
        for (let i = 0; i < deleteBtn.length; i++) {
          deleteBtn[i].disabled = false;
          editBtn[i].disabled = false;
        }

        // enable searchbar & their buttons & sorting options
        getElementsByID("search").disabled = false;
        getElementsByID("sort").disabled = false;
        getElementsByID("searchBtn").disabled = false;
        getElementsByID("clearBtn").disabled = false;
      });

      // store old data in a variable to show them in main form
      const oldData = e;

      // fill the main form based on edit button was clicked
      getElementsByID("fname").value = oldData.fname;
      getElementsByID("email").value = oldData.email;
      getElementsByID("dob").value = oldData.DOB;
      //load gender
      getElementsByID(oldData.gender.toLowerCase()).checked = true;
      const hobbiesMap = {
        Travelling: "travel",
        Reading: "read",
        Writing: "write",
        Cricket: "cricket",
      };
      // load hobbies
      oldData.hobbies.forEach((e) => {
        getElementsByID(hobbiesMap[e]).checked = true;
      });
      // load loaction data
      getElementsByID("country").value = oldData.country;
      getElementsByID("country").dispatchEvent(new Event("change"));
      getElementsByID("state").value = oldData.state;
      getElementsByID("state").dispatchEvent(new Event("change"));
      getElementsByID("city").value = oldData.city;

      // will perform action when update button will be clicked
      updateBtn.addEventListener("click", () => {
        // check all field and apply validation function
        validateForm();
        // this variable will check that is there is an error in any of form field it will not store data
        let hasErrors = false;
        // condition to check error
        if (activeError()) {
          hasErrors = true;
        }
        // condition to check error if there is an error in any of form field it will not store data
        if (!hasErrors) {
          //upadate the old data if there is any updation performed
          e.fname = getElementsByID("fname").value.trim();
          e.email = getElementsByID("email").value.trim();
          e.DOB = getElementsByID("dob").value;
          e.age = returnAge(e.DOB);
          e.gender = document.querySelector("input[name=gender]:checked").value;

          let arrHobbies = [];
          const hobbies = document.querySelectorAll(
            "input[name=hobbies]:checked"
          );
          hobbies.forEach((e) => {
            arrHobbies.push(e.value);
          });
          e.hobbies = arrHobbies;
          e.country = getElementsByID("country").value;
          e.state = getElementsByID("state").value;
          e.city = getElementsByID("city").value;

          // display submit button & hide update and cancel button
          displayBtns(cancelBtn, "none");
          displayBtns(submitBtn, "block");
          displayBtns(updateBtn, "none");

          // reset form after updation
          resetForm();

          // clear table body to update new data
          const tblBody = getElementsByID("tbl-body");
          tblBody.innerHTML = "";
          //get value if there is any value in search bar
          const searchValue = getElementsByID("search").value;
          //if there is no value in search bar, updated all record will be displyed
          if (searchValue == "") {
            creatingElements(0, info.length);
          } else {
            // if there is any value in search bar, then updated recoed only diaplyed
            searchFunction(event);
          }

          // enable searchbar & their buttons & sorting options
          getElementsByID("search").disabled = false;
          getElementsByID("sort").disabled = false;
          getElementsByID("searchBtn").disabled = false;
          getElementsByID("clearBtn").disabled = false;
        }
      });
    }
    validateForm();
  });
}

//function to display & hide buttons
function displayBtns(element, displayValue) {
  element.style.display = displayValue;
}
