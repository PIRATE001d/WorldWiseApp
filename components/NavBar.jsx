import { useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header id="header" className={styles.header}>
        <nav className={styles.nav}>
          <button 
            className={`${styles.toggleMenu} ${isMenuOpen ? styles.active : ''}`} 
            onClick={toggleMenu}
          >
            <span></span>
          </button>
        </nav>
      </header>

      <div id="menu" className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
        <nav className={styles.mainNav}>
          <ul>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
            <li><Link to="/worldWise" onClick={closeMenu}>WorldWise</Link></li>
            <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
