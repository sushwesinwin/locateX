import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addLocation } from '../features/locations/locationsSlice';
import AddLocationForm from './AddLocationForm';
import LocationCard from './LocationCard';
import { useSelector } from 'react-redux';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapContent({ setSelectedPosition }: any) {
  const map = useMapEvents({
    click(e) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
}

function MapComponent({ showAddForm, setShowAddForm }: { showAddForm: boolean, setShowAddForm: (show: boolean) => void }) {
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const locations = useSelector((state: RootState) => state.locations.locations);
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
        if (!selectedPosition) {
          setSelectedPosition([latitude, longitude]);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
        setSelectedPosition([latitude, longitude]);
        setShowAddForm(true);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };

  const handleFormSubmit = (data: any) => {
    const newLocation = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
      image: data.image ? URL.createObjectURL(data.image[0]) : undefined,
    };
    dispatch(addLocation(newLocation));
    setShowAddForm(false);
  };

  return (
    <div className="relative h-[calc(100vh-120px)] rounded-lg overflow-hidden">
      <MapContainer 
        center={currentLocation || [51.505, -0.09]} 
        zoom={13} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapContent 
          setSelectedPosition={setSelectedPosition} 
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
        />
        
        {locations.map(location => (
          <Marker 
            key={location.id} 
            position={[location.latitude, location.longitude]} 
            icon={defaultIcon}
          >
            <Popup>
              <LocationCard location={location} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {showAddForm && selectedPosition && (
        <div className="absolute top-4 right-4 z-[1000] bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-80">
          <AddLocationForm 
            initialLat={selectedPosition[0]} 
            initialLng={selectedPosition[1]} 
            onSubmit={handleFormSubmit} 
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      <button
        onClick={handleCurrentLocation}
        className="absolute bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-lg z-50"
        title="Current Location"
      >
        Add New Location
      </button>
    </div>
  );
}

export default MapComponent;