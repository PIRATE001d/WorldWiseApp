import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css' // Leaflet CSS for styling
import { useEffect, useState } from 'react'
import styles from './map.module.css'
import { useContext } from 'react'
import { CitiesContext } from '../contexts/citiesContext'
import { useMap } from 'react-leaflet'
import { useMapEvent } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import { useGeolocation } from '../hooks/useGeolocation'
import { UseUrlPosition } from '../hooks/useUrlPosition'
function Map() {
  const [position, setPosition] = useState([51.505, -0.09]) // Initial map center
  const { cities } = useContext(CitiesContext)
  const { isLoading: isLoadingPosition, getPosition, position: geolocationPosition } = useGeolocation()

  const { Maplat, Maplng } = UseUrlPosition();

  // Update position if lat and lng are provided in the URL
  useEffect(() => {
    if (Maplat && Maplng) {
      setPosition([parseFloat(Maplat), parseFloat(Maplng)]) // Ensure lat and lng are numbers
    }
  }, [Maplat, Maplng])

  // Update position based on geolocation
  useEffect(() => {
    if (geolocationPosition) {
      setPosition([geolocationPosition.lat, geolocationPosition.lng])
    }
  }, [geolocationPosition])

  const handleCityClick = (lat, lng) => {
    setPosition([lat, lng])
  }

  return (
    <div>
      <button className={styles.buttonGetLoc} onClick={getPosition}>
        {isLoadingPosition ? 'Loading...' : 'Get Current Location'}
      </button>

      <MapContainer center={position} zoom={8} scrollWheelZoom={false} className={styles.mapContainer}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">WorldWise</a> contributors'
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
            eventHandlers={{
              click: () => handleCityClick(city.position.lat, city.position.lng),
            }}
          >
            <Popup>
              {city.cityName} <span>{city.emoji}</span>
              <span>{city.notes}</span>
            </Popup>
          </Marker>
        ))}
        <MapChangePosition position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

function MapChangePosition({ position }) {
  const map = useMap()
  useEffect(() => {
    map.setView(position)
  }, [position, map])
  return null
}

const DetectClick = () => {
  const navigate = useNavigate()

  useMapEvent('click', (e) => {
    navigate(`/worldWise/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })

  return null
}

export default Map
