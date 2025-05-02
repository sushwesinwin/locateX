import { useState } from 'react';
import Navbar from './components/Navbar';
import MapComponent from './components/MapComponent';
import LocationList from './components/LocationList';
import 'leaflet/dist/leaflet.css';

function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onAddLocationClick={() => setShowAddForm(true)}
      />
      
      <main className="container mx-auto p-4">
        {activeTab === 'map' ? (
          <MapComponent 
            showAddForm={showAddForm} 
            setShowAddForm={setShowAddForm} 
          />
        ) : (
          <LocationList 
            onBackClick={() => setActiveTab('map')} 
          />
        )}
      </main>
    </div>
  );
}

export default App;