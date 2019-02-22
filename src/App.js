import React, { Component } from 'react';
import './App.css';
import Title from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather';


const API_KEY = "d493ffcfd99ce0b9b42178ba8ed6b1be";

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }


  getWeather = async (e) => {
    e.preventDefault(); //Signifies SPAs and we use React to create SPAs
    const city = e.target.elements.city.value; //Use the event(e) object to grab the values typed into the input fields
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`); //We need to change hard coded values like "jacksonville" and "us"
    //we don't always want the app to return weather values for jacksonville and us
    const data = await api_call.json(); //convert response from api to json format consumable by the browser

    if (city && country) { //Right now, when the user clicks the submit button, without supply input values, the app breaks down. Hence, the need for the if statement
      // console.log(data); //How do we make sure that the data we get back from the api actually gets displayed on the UI...setup state
      this.setState({ //To show all these things on the screen, we need to pass them to the weather component
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a value for city and county"
      });
    }
  }


  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  < Title />
                </div>
                <div className="col-xs-7 form-container">
                  < Form getWeather={this.getWeather} />
                  < Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};




export default App;
