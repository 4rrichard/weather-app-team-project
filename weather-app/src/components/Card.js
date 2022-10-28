import React from 'react';
import './card.css';

function Card({data}) {

  
  let cardContent =
  <div className={(data.location.localtime.slice(11, -3, data.location.localtime.length) >= 20) ? "weather-card night" :
    (data.location.localtime.slice(11, -3, data.location.localtime.length) >= 17) ? "weather-card afternoon" : 
    (data.location.localtime.slice(11, -3, data.location.localtime.length) >= 10) ? "weather-card day" :
    (data.location.localtime.slice(11, -3, data.location.localtime.length) >= 7) ? "weather-card morning" : "weather-card night"}>
      <div className="card-body">
        <div className="card-left">        
          <div className="card-left-top">
            <div className="card-left-top-country">              
              <h4 className="location-name">{data.location.name}</h4>
              <h5 className="region">{data.location.region}</h5>
              <p className="country">{data.location.country}</p>
            </div>
            <div className="card-left-top-time">  
              <h2>Local time</h2> 
              <h3 className="local-time">{data.location.localtime.slice(11, data.location.localtime.length)}</h3>
            </div>
          </div>
          <div className="card-left-bot">
            <div className="card-condition">
              <img src={data.current.condition.icon} alt=''></img>
              <p className="current-condition "> {data.current.condition.text}</p>
            </div>
            <h1 className="temp">{data.current.temp_c}°C</h1>
          </div>
        </div>
        <div className="card-right">
            <div className='hum-cont'>
              <p className="humidity">Humidity</p> 
              <h2>{data.current.humidity} % </h2>
            </div>
            <div className='wind-cont'>
              <p className="wind"> Wind</p>  
              <h2>{data.current.wind_kph} km/h </h2>
            </div>
            <div className='uv-cont'>
              <p className="uv-index">UV index</p>
              <h2>{data.current.uv}</h2>
            </div>
        </div>  
      </div>
    </div>
    
  return cardContent 
}


export default Card
