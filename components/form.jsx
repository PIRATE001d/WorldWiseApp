import { useNavigate } from 'react-router-dom';
import styles from './form.module.css';
import { UseUrlPosition } from '../hooks/useUrlPosition';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from 'react';
import { CitiesContext } from '../contexts/citiesContext';

function Form() {
  const { createCity } = useContext(CitiesContext);

  function countryCodeToEmoji(countryCode) {
    if (!countryCode) return '';
    return countryCode
      .toUpperCase()
      .split('')
      .map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
      .join('');
  }

  const navigate = useNavigate();

  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState('');
  const [error, setError] = useState(''); // Renamed to lowercase for consistency

  const { Maplat, Maplng } = UseUrlPosition();


  useEffect(() => {
    if (!Maplat || !Maplng) return; 
    
    const fetchCityData = async () => {
      try {
        if (!Maplat || !Maplng) return;
    
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${Maplat}&lon=${Maplng}&format=json`;

    
        const response = await fetch(url);
        
        const data = await response.json();
    
        if (data.error) {
          throw new Error("Unable to retrieve data");
        }
    
        setCityName(data.address.city || '');
        setCountry(data.address.country || '');
        setEmoji(countryCodeToEmoji(data.address.country_code));
        console.log('Fetched data:', data);
      } catch (error) {
        setError(error.message); 
      }
    };
    

    fetchCityData();
  }, [Maplat, Maplng]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: {
        lat: Maplat,
        lng: Maplng
      }
    };

    createCity(newCity);
    navigate('/WorldWise/cities');
  };

  if (!Maplat || !Maplng) {
    return (
      <div className={styles.formContainer}>
        <p>Click On the county or City you have visited...</p>
        <button onClick={() => navigate('/WorldWise/cities')}>&larr; Back</button>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.formContainer}>
        <p>{error}</p>
        <button onClick={() => navigate('/WorldWise/cities')}>&larr; Back</button>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWithEmoji}>
          <label htmlFor="cityName">City Name:</label>
          <input
            type="text"
            id="cityName"
            name="cityName"
            placeholder="Enter city name"
            onChange={(e) => setCityName(e.target.value)}
            required
            value={cityName}
          />
          <span className={styles.emoji}>{emoji}</span>
        </div>
        <div>
          <label htmlFor="whenDidYouGo">When did you go?</label>
          <DatePicker
            selected={date}
            onChange={setDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Click to select a date"
            required
          />
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Add any notes"
            rows="4"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => navigate('/WorldWise/cities')}>
            &larr; Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
