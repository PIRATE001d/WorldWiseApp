import styles from './Home.module.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome To WorldWide</h1>
            <p className={styles.text}>
                This is the home page of the WorldWide app. 
                This app is designed to help you learn about the world around you.   
            </p>
            <div className={styles.buttonContainer}>
                <Link to="/worldWise">
                <button className={styles.button}>Start Tracking</button>
                </Link>
                
            </div>
        </div>
    );
}

export default Home;
