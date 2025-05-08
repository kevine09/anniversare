import { useState, useRef } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import FriendMarker from '../components/FriendMarker'
import FriendPopup from '../components/FriendPopup'
import '../styles/WorldMap.css' // Assurez-vous d'importer le fichier CSS

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

export default function WorldMap({ friends, onAddFriend }) {
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [newMarkerPos, setNewMarkerPos] = useState(null)
  const mapRef = useRef()

  const handleMapClick = (e) => {
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setNewMarkerPos({ x, y })
    }
  }

  return (
    <div className="world-map-container" ref={mapRef}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 180,
          center: [10, 40]
        }}
        onClick={handleMapClick}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
                style={{
                  default: { outline: 'none' },
                  hover: { fill: '#F5F5F5', outline: 'none' },
                  pressed: { fill: '#E0E0E0', outline: 'none' }
                }}
              />
            ))
          }
        </Geographies>

        {friends.map((friend) => (
          <Marker key={friend.id} coordinates={[friend.lng, friend.lat]}>
            <FriendMarker 
              friend={friend} 
              onClick={() => setSelectedFriend(friend)}
            />
          </Marker>
        ))}

        {newMarkerPos && (
          <div 
            className="new-marker-preview"
            style={{ left: newMarkerPos.x, top: newMarkerPos.y }}
          >
            <div className="pulse-effect"></div>
            <div className="marker-pin"></div>
          </div>
        )}
      </ComposableMap>

      {selectedFriend && (
        <FriendPopup 
          friend={selectedFriend} 
          onClose={() => setSelectedFriend(null)}
        />
      )}
    </div>
  )
}