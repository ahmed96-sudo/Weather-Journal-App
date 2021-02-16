/* Global Variables */

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
let key = 'e8061c668de8443c751686bb1c382c8b';
let unit = 'metric';
/*let port = 36282;
if (port == null || port == "") {
  port = 8080;
}*/

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const countryName = document.getElementById('country_name').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);
    getTemperature(baseURL, countryName, unit, key)
    .then(function (data){
        // Add data to POST request
        //postData('http://localhost:8080/addWeatherData', {temperature: data.main.temp, date: newDate, user_response: feelings } )
        // Function which updates UI
        //postData('https://weather-app-jrnal.herokuapp.com:'+ port +'/addWeatherData', {temperature: data.main.temp, date: newDate, user_response: feelings } )
        postData('https://weather-app-jrnal.herokuapp.com/addWeatherData', {temperature: data.main.temp, date: newDate, user_response: feelings } )
        .then(function() {
            updateUI()
        })
    })
}

// Async GET
const getTemperature = async (baseURL, countryName, unit, key)=>{
// const getTemperatureDemo = async (url)=>{
    //const response = await fetch(baseURL + countryName + '&appid=' + key)
    const response = await fetch(baseURL + countryName + '&units=' + unit + '&appid=' + key)
    console.log('Response', response);
    try {
        const data = await response.json();
        console.log('Data', data);
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}

// Async POST
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postRequest.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}

// Update user interface
const updateUI = async () => {
    //const request = await fetch('http://localhost:8080/all');
    const request = await fetch('https://weather-app-jrnal.herokuapp.com/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_response;
    }
    catch (error) {
        console.log('error', error);
    }
}