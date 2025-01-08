import  styles from './loading.module.css'; // Import the CSS Module

function Loading() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Loading, please wait...</p>
        </div>
    );
}

export default Loading;