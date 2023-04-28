// Selecting elements from the DOM
const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".search");
const form = document.querySelector("form");

// Initializing the target variable to an empty string
let target = "";

// Function to fetch data from the API
const fetchData = async (target) => {
  try {
    // Constructing the API URL with the target location
    const url = `https://api.weatherapi.com/v1/current.json?key=e81e43e241f444c6bd391533232804&q=${target}`;
    // Sending a GET request to the API and getting the response
    const res = await fetch(url);
    // Parsing the response JSON into a data object
    const data = await res.json();
    // Destructuring the data object to get the required information
    const {
      current: { temp_c, condition: { icon, text } },
      location: { name, localtime }
    } = data;
    // Calling the updateDom function with the extracted information
    updateDom(temp_c, name, localtime, icon, text);
  } catch (error) {
    // Handling errors in case the location is not found
    alert("Location Not Found");
  }
};

// Function to update the DOM with the fetched data
function updateDom(temperature, city, localtime, emoji, text) {
  // Splitting the local time string to get the exact time and date
  const exactTime = localtime.split(" ")[1];
  const exactDate = localtime.split(" ")[0];
  // Getting the full name of the day using the getDatefullName function
  const exactDay = getDatefullName(new Date(localtime).getDay());

  // Updating the temperature, city, date, emoji, and weather fields with the fetched data
  temperatureField.innerText = temperature;
  cityField.innerText = city;
  dateField.innerText = `${exactTime} - ${exactDay} ${exactDate}`;
  emojiField.src = emoji;
  weatherField.innerText = text;
}

// Calling the fetchData function with the initial target value
fetchData(target);

// Function to handle the form submission and search for a new location
function search(e) {
  // Preventing the form from submitting and reloading the page
  e.preventDefault();
  // Updating the target variable with the value of the search field
  target = searchField.value;
  // Calling the fetchData function with the new target value
  fetchData(target);
}

// Adding an event listener to the form to handle its submission
form.addEventListener("submit", search);

// Function to get the full name of the day from a number
function getDatefullName(num) {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "don't know";
  }
}
