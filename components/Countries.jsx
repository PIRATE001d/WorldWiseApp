import { useContext } from "react";
import { CitiesContext } from "../contexts/citiesContext";
import styles from "./Counties.module.css";

function Countries() {
  const { cities, isLoading, error } = useContext(CitiesContext);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }
  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Countries</h2>
      {cities.length === 0 ? (
        <p className={styles.noCities}>No cities found</p>
      ) : (
        <ul className={styles.countriesList}>
          {cities.map((city) => (
            <li key={city.id} className={styles.countriesItem}>
              <h2 className={styles.cityInfo}>
                {city.country} <span className={styles.emoji}>{city.emoji}</span>
              </h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Countries;
