import styled from "styled-components";
import { useEffect, useState } from "react";

const Weather = (props) => {
    
    const [cityWeather, setCityWeather] = useState([]);
    const [weatherForecastArr, setWeatherForecastArr] = useState([]);


    //API key = 3a30db69468b00dd50614afa3555031b
    const weatherAPICall = () => {
        //convert city to lat and lon
        let geoRes = fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${props.city}&limit=1&appid=3a30db69468b00dd50614afa3555031b`)
        .then(function (res) {
                return res.json();
            })   
            .then(function (latAndLon) { //Call openweather for weather at this lat/long
                let lat = latAndLon[0].lat;
                let lon = latAndLon[0].lon;
                return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=3a30db69468b00dd50614afa3555031b`);
            }) 
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                // console.log(data)
                setCityWeather(data)
            })
            .catch(function (err) {
                console.log(err.message);
            })
    };
    
    
    useEffect(() => { //calls weather API when city changes
        weatherAPICall()
        console.log('called Weather API')
    },[])
    
    useEffect(() => { //refreshes days of week for proper render
        weatherForecast()
        console.log('set new forecast')
        // const weatherForecastArr = cityWeather.daily;
        // console.log(weatherForecastArr)
    },[cityWeather])

    let weatherImage, currentTemp, currentTime ;
    if (cityWeather.length !== 0){
        weatherImage = <img src={`https://openweathermap.org/img/wn/${cityWeather.current.weather[0].icon}@2x.png`} />
        currentTemp = Math.round(cityWeather.current.temp);
        let date = new Date();
        currentTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); //current time in hours + minutes
    }

    //function to assign forecasted weather to upcoming days of the week
    const weatherForecast = () => {
        if (cityWeather.length !== 0){
            let weekdays = new Array(
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            );
            let weatherRenderArr = []; //Array of arrays. day and high/low temps ex: ['friday', 80, 75]
            let weatherForecastArr = cityWeather.daily; //array of forecasted data from api call
            let todaysDayNum = (new Date()).getDay(); //orient function with today's date (0-6)
            let i = 0;
            while (i < 5){
                let currentArr = [];
                currentArr.push(weekdays[todaysDayNum]);
                let dailyHigh = Math.round(weatherForecastArr[i].temp.max);
                let dailyLow = Math.round(weatherForecastArr[i].temp.min);
                let weatherIcon = weatherForecastArr[i].weather[0].icon;
                currentArr.push(dailyHigh, dailyLow, weatherIcon);
                weatherRenderArr.push(currentArr);
                todaysDayNum = (todaysDayNum === 6) ? 0 : ++todaysDayNum;
                i++;
            } 
            setWeatherForecastArr([...weatherRenderArr])
        } else {
            setWeatherForecastArr([])
        }

        
    };

    //Map forecast array to render individually
    const forecastRender = (
        <ul>
            {weatherForecastArr.map((day) => {
                return (
                    <WeatherCard key={day[0]+'id'}>
                        <h1>
                            {day[0].slice(0,3)}
                        </h1>
                        <div>
                            <img src={`http://openweathermap.org/img/wn/${day[3]}@2x.png`} alt='weather icon' />
                        </div>
                        <HighsAndLows>
                            <div>Hi: {day[1]}&deg;F</div>
                            <div>Low: {day[2]}&deg;F</div>
                        </HighsAndLows>
                    </WeatherCard>
                )
            })
            }   
        </ul>
    );
        
    



    return ( 
        <Container>
            <CurrentWeather>
                <div>Currently</div>
                <div>{weatherImage}</div>
                <div>{currentTemp}&deg;F</div>
                {currentTime}
            </CurrentWeather>
            <Forecast>
                {forecastRender}
            </Forecast>
            
            {/* <Forecast>

            </Forecast> */}
        </Container>
     );
}
 

const Container = styled.div`
    margin: 50px auto;
    width: 70vw;
    height: 300px;
    background-color: grey;
    opacity: .7;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover{
        opacity: 1;
        border: 2px solid white;
        transition: opacity 0.2s ease 0s;
    }


`;

const CurrentWeather = styled.div`
    width: 13%;
    height: 55%;
    margin: 0px 5px;
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-weight: strong;
    font-size: 20px;
    &:hover{
        background-color: black;
        opacity: .8;
        color: white;
        border-radius:3px;
    }
`;

const Forecast = styled.div`
    ul {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        grid-gap: 25px;
        padding: 0px;
    }
    
`;

const WeatherCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
        margin: 0px auto
    }
    &:hover{
        background-color: black;
        opacity: .8;
        color: white;
        border-radius:3px;
    }
    
`;

const HighsAndLows = styled.div`
`;

export default Weather;