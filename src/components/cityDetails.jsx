import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import styles from "./CityDetails.module.css";
import ButtonBack from "./ButtonBack";

function CityDetails() {
  const { cityId } = useParams();
  const [city, setCity] = useState({});

  useEffect(() => {
    // Fetch city details
    async function fetchCityDetails() {
      try {
        const response = await fetch(`http://localhost:8230/cities/${cityId}`);
        const data = await response.json();
        setCity(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCityDetails();
  }, [cityId]);

  const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(city.cityName)}`;

  return (
    <div className={styles.container}>
      <h2>{city.cityName} <span>{city.emoji}</span></h2>
      <p><strong>Country:</strong> {city.country}</p>
      <p><strong>You went to {city.cityName} on:</strong> {moment(city.date).format('MMMM Do YYYY, h:mm:ss a')}</p>
      <p><strong>Your Note:</strong> 
      {city.notes ? city.notes : "No note added"}
      </p>
      <p><strong>Learn More About {city.cityName}:</strong>
        <a className={styles.WikiLink} href={wikiUrl} target="_blank" rel="noopener noreferrer">
          Click here to visit Wikipedia
        </a>
      </p>
     <ButtonBack />
    </div>
  );
}

export default CityDetails;
