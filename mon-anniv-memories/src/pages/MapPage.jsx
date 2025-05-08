import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaTimes, FaPaperclip, FaImage, FaVideo, FaMicrophone, FaGlobeAmericas } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, serverTimestamp } from '../firebase';
import countries from '../data/countries.json';
import '../styles/MapPage.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadToCloudinary } from '../utils/cloudinary';

// Configuration des icônes
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

export default function MapPage() {
  const [markers, setMarkers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const mapRef = useRef();

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    message: '',
    type: 'text',
    media: null
  });

  // Charger les marqueurs avec notifications
  useEffect(() => {
    const q = query(collection(db, 'mapMarkers'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMarkers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Notification pour nouveaux messages
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          toast.success(`Nouveau message de ${change.doc.data().name}`, {
            position: "bottom-right",
            autoClose: 5000,
          });
        }
      });

      setMarkers(newMarkers);
    });
    
    return unsubscribe;
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Prévisualisation locale
      const previewUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        media: previewUrl,
        file
      });

      // Upload vers Cloudinary avec dossier spécifique
      const cloudinaryUrl = await uploadToCloudinary(file, 'map-markers');
      
      setFormData(prev => ({
        ...prev,
        media: cloudinaryUrl
      }));

      toast.success('Fichier uploadé avec succès!');
    } catch (error) {
      toast.error(`Échec de l'upload: ${error.message}`);
      setFormData(prev => ({ ...prev, media: null, file: null }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCountry) {
      toast.warn('Veuillez sélectionner un pays');
      return;
    }

    try {
      const markerData = {
        ...formData,
        lat: selectedCountry.latlng[0],
        lng: selectedCountry.latlng[1],
        createdAt: serverTimestamp()
      };

      delete markerData.file; // Supprime le fichier avant envoi

      await addDoc(collection(db, 'mapMarkers'), markerData);
      
      toast.success('Message ajouté à la carte!');
      setShowForm(false);
    } catch (error) {
      toast.error(`Erreur: ${error.message}`);
      console.error(error);
    }
  };

  const handleAddClick = () => {
    setShowForm(true);
    setFormData({
      name: '',
      location: '',
      message: '',
      type: 'text',
      media: null
    });
    setSelectedCountry(null);
  };


  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    const country = countries.find(c => c.code === countryCode);
    setSelectedCountry(country);
    
    // Centre la carte sur le pays sélectionné
    if (country && mapRef.current) {
      mapRef.current.flyTo(country.latlng, 5);
    }
  
    // Met à jour le formulaire
    setFormData(prev => ({
      ...prev,
      location: country?.name || ''
    }));
  };
  
      
  return (
    <div className="map-page-container">
      <div className="map-header">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaGlobeAmericas /> Carte des amis
        </motion.h1>
        
        <motion.button
          className="add-marker-btn"
          onClick={handleAddClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <FaMapMarkerAlt />
          Ajouter un message
        </motion.button>
      </div>

      <div className="map-wrapper">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          ref={mapRef}
          className="fullscreen-map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {markers.map(marker => (
            <Marker key={marker.id} position={[marker.lat, marker.lng]}>
              <Popup className="custom-popup">
                <div className="marker-popup">
                  <h3>{marker.name}</h3>
                  <p><FaMapMarkerAlt /> {marker.location}</p>
                  <p>{marker.message}</p>
                  {marker.type === 'audio' && (
                    <audio controls src={marker.media} />
                  )}
                  {marker.type === 'video' && (
                    <video controls src={marker.media} width="100%" />
                  )}
                  {marker.type === 'image' && (
                    <img src={marker.media} alt={marker.message} width="100%" />
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {showForm && (
        <div className="map-form-overlay">
          <motion.div 
            className="map-form"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <button className="close-form" onClick={() => setShowForm(false)}>
              <FaTimes />
            </button>

            <h2>Ajoute ton message</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Ton nom *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Pays *</label>
                <select
                  value={selectedCountry?.code || ''}
                  onChange={handleCountryChange}
                  required
                >
                  <option value="">Sélectionne un pays</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Type de message *</label>
                <div className="type-selector">
                  {['text', 'image', 'video', 'audio'].map(type => (
                    <button
                      key={type}
                      type="button"
                      className={formData.type === type ? 'active' : ''}
                      onClick={() => setFormData({...formData, type})}
                    >
                      {type === 'text' && <FaPaperclip />}
                      {type === 'image' && <FaImage />}
                      {type === 'video' && <FaVideo />}
                      {type === 'audio' && <FaMicrophone />}
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </div>

              {(formData.type === 'image' || formData.type === 'video' || formData.type === 'audio') && (
                <div className="form-group">
                  <label>
                    {formData.type === 'image' && 'Télécharge ta photo *'}
                    {formData.type === 'video' && 'Télécharge ta vidéo *'}
                    {formData.type === 'audio' && 'Télécharge ton audio *'}
                  </label>
                  <input
                    type="file"
                    accept={
                      formData.type === 'image' ? 'image/*' :
                      formData.type === 'video' ? 'video/*' : 'audio/*'
                    }
                    onChange={handleFileChange}
                    required={formData.type !== 'text'}
                  />
                  {formData.media && (
                    <div className="media-preview">
                      {formData.type === 'image' && (
                        <img src={formData.media} alt="Preview" />
                      )}
                      {formData.type === 'video' && (
                        <video src={formData.media} controls />
                      )}
                      {formData.type === 'audio' && (
                        <audio src={formData.media} controls />
                      )}
                    </div>
                  )}
                </div>
              )}

              <button type="submit" className="submit-btn">
                Placer sur la carte
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}