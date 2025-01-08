import { useContext } from 'react';
import { CitiesContext } from '../contexts/citiesContext';
import { Link } from 'react-router-dom';
import styles from './Cities.module.css'; // Import the CSS module

function Cities() {
    const { cities, isLoading, error, removeCity } = useContext(CitiesContext);

    if (isLoading) {
        return <div className={styles.noCitiesMessage}><span className="loading loading-infinity loading-lg"></span></div>;
    }
    
    if (error) {
        return <div className={styles.noCitiesMessage}>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Cities</h2>
            {cities.length === 0 ? (
                <p className={styles.noCitiesMessage}>No cities found</p>
            ) : (
                <ul className={styles.cityList}>
                    {cities.map((city) => (
                        <li key={city.id} className={styles.cityItem}>
                            <Link
                                to={`/worldWise/cities/${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
                                className={styles.cityLink}
                            >
                                <h2 className={styles.cityName}>
                                    {city.cityName} {city.emoji}
                                </h2>
                                <p className={styles.cityDate}>
                                    <strong>Date Added:</strong> {new Date(city.date).toLocaleDateString()}
                                </p>
                                <button
                                    className={styles.btnRemove}
                                    onClick={(e) => {
                                        e.preventDefault(); 
                                        removeCity(city.id); // Remove city
                                    }}
                                >
                                    &times;
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cities;
