import { NavLink, Outlet } from "react-router-dom";
import styles from "./WorldWise.module.css";
import Map from "../components/map";

function WorldWise() {



  return (
    <div className={styles.worldwiseContainer}>
      <div className={styles.sidebar}>
        <h2>World Wise</h2>
        <nav>
          <ul>
            <li>
              <NavLink
                to="cities"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
              >
                Cities
              </NavLink>
            </li>
            <li>
              <NavLink
                to="countries"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
              >
                Countries
              </NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
      
      <div
        className={styles.mapContainer}
       
      >
        <Map />
      </div>
    </div>
  );
}

export default WorldWise;
