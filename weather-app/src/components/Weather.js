import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./weather.css";

function Weather() {
  const [citySearch, setCitySearch] = useState("");
  const [favouriteClassName, setFavouriteClassName] = useState("favourite-off");
  const [cityList, setCityList] = useState([]);
  const [favsSearch, setFavsSearch] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [cityName, setCityName] = useState("");
  const [weatherData, setweatherData] = useState("");
  const [submit, setSubmit] = useState("");
  const [spinner, setSpinner] = useState(false);

  //---------Autocomplete fetch------------------------

  useEffect(() => {
    const cityListFetch = async () => {
      const cityListResponse = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=9ccc715638434575be273925221605&q=${citySearch}`
      );
      const cityListJson = await cityListResponse.json();
      setCityList(cityListJson);
    };
    if (citySearch.length > 2) {
      cityListFetch();
    }
  }, [citySearch]);

  //---------Weather fetch------------------------
  useEffect(() => {
    const weatherFetch = async () => {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=9ccc715638434575be273925221605&q=${cityName}`
      );
      const data = await response.json();
      setweatherData(data);
    };
    if (cityName.length > 2) {
      weatherFetch();
    }
  }, [cityName]);

  //---------Image fetch------------------------
  useEffect(() => {
    const imageFetch = async () => {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${cityName}`,
        {
          headers: {
            Authorization:
              "563492ad6f917000010000016a38353128cd4cff95e5db1ee80e0e57",
          },
        }
      );
      const data = await response.json();
      setBackgroundImage(data.photos[0].src.original);
    };
    if (submit !== "") {
      imageFetch();
    }
  }, [cityName, submit]);

  //---------Input component------------------------
  return (
    <div className="widget-section">
      {submit !== "" && <img src={backgroundImage} className="pexel" alt="" />}
      <div className="search">
        <input
          type="text"
          placeholder="city"
          list="chosen-cities"
          onChange={(event) => {
            setCityName(event.target.value);
            setCitySearch(event.target.value);
            setSubmit("");
            setFavouriteClassName("favourite-off");
            setBackgroundImage("");
            setCityList([]);
          }}
        />
        <button
          id="submit"
          onClick={() => {
            setSpinner(true);
            setTimeout(() => {
              setSubmit("reset");
              setSpinner(false);
            }, 2000);
          }}
        >
          Submit
        </button>
        <button
          className={favouriteClassName}
          onClick={() => {
            if (favouriteClassName === "favourite-off") {
              setFavouriteClassName("favourite-on");
            } else {
              setFavouriteClassName("favourite-off");
            }
            let arr = favsSearch;
            arr.push(weatherData.location.name);
            setFavsSearch(arr);
          }}
        ></button>
        <datalist id="chosen-cities">
          {favsSearch.map((fav, id) => (
            <option key={id} value={fav}></option>
          ))}
          {cityList.map((option) => (
            <option key={option.id} value={option.name}></option>
          ))}
        </datalist>
      </div>
      {spinner && <div id="spinner"></div>}
      {submit !== "" && <Card data={weatherData} />}
    </div>
  );
}
export default Weather;
