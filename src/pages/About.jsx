import Image from '../assets/img-1.jpg';

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Us</h1>
      <p style={styles.description}>
        Welcome to our platform! We are passionate about connecting people and places. 
        Inspired by the vast beauty of the world, from the Philippines to the Pacific Ocean, 
        we aim to make your journey unforgettable. Let us help you explore the map of endless possibilities.
      </p>
      <img
        src={Image}
        alt="Map and airplane"
        style={styles.image}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#e7f1ff',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.5em',
    color: '#2c3e50',
    marginBottom: '15px',
  },
  description: {
    fontSize: '1.3em',
    color: '#34495e',
    textAlign: 'center',
    margin: '20px 0',
    lineHeight: '1.8',
    maxWidth: '600px', // Limit width for better readability
  },
  image: {
    width: '90%',
    maxWidth: '600px',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default About;
