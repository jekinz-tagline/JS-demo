//constant array of locations
const locations = {
  INDIA: {
    Gujarat: ["Suart", "Rajkot", "Vadodara", "Amreli", "Bharuch"],
    Maharashtra: ["Thane", "Pune", "Andheri", "Nagpur", "Nashik"],
    Punjab: ["Amritsar", "Patiala", "Jalandhar", "Mohali", "Ludhiana"],
  },
  AUSTRALIA: {
    Queensland: ["Cooktown", "Moonie", "Redcliffe", "Towndville", "Winton"],
    Victoria: ["Melbourne", "Port Fairy", "Portland", "Sea Lake", "Sunbury"],
    "Western Australia": ["Derby", "Kwinana", "Mandurah", "Perth", "Northam"],
  },
  CANADA: {
    Ontario: ["Hamilton", "Guelph", "Kingston", "Kitchener", "Ottawa"],
    Quebec: ["Asbestos", "Matane", "Montreal", "Rimouski", "Port-Cartier"],
    "Prince Edward Island": [
      "Borden",
      "Cavendish",
      "Charlottetown",
      "Souris",
      "Summerside",
    ],
  },
};

// will perform action on load of page
window.onload = () => {
  //get dropdown for country,state & city
  const countries = getElementsByID("country");
  const states = getElementsByID("state");
  const cities = getElementsByID("city");

  //make options for country
  for (let country in locations) {
    countries.options[countries.options.length] = new Option(country, country);
  }
  //onchange of country make options of states based on country
  countries.onchange = function () {
    // on country change state and city dropdown will set as default option
    states.length = 1;
    cities.length = 1;
    for (let state in locations[this.value]) {
      states.options[states.options.length] = new Option(state, state);
    }
  };
  //onchange on state make options of cities based on states
  states.onchange = function () {
    // on state change city dropdown will set as default option
    cities.length = 1;
    const city = locations[countries.value][this.value];
    console.log(city);
    city.forEach((e) => {
      cities.options[cities.options.length] = new Option(e, e);
    });
  };

  // set attribute of date input to max date as current date
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  let currentDate;
  month > 9
    ? (currentDate = `${year}-${month}-${day}`)
    : (currentDate = `${year}-0${month}-${day}`);
  const dob_input = getElementsByID("dob");
  dob_input.setAttribute("max", currentDate);
};
