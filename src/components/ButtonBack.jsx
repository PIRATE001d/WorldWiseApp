import { useNavigate } from 'react-router-dom';
import styles from './ButtonBack.module.css';  // Assuming you have a CSS module for styling

function ButtonBack() {
    const navigate = useNavigate();

    return (
        <button
            className={styles.buttonBack}  // Use class from ButtonBack.module.css for styling
            onClick={() => navigate(-1)}    // Go back to the previous page
        >
            &larr; Back
        </button>
    );
}

export default ButtonBack;
