import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { updateLocation, deleteLocation } from '../features/locations/locationsSlice';
import LocationCard from './LocationCard';
import AddLocationForm from './AddLocationForm';
import { Location, LocationListProps } from '../types/type';
import DeleteDialog from './DeleteDialog';


function LocationList({ onBackClick }: LocationListProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.locations.locations);
  const [editingLocation, setEditingLocation] = useState<null | Location>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleUpdateLocation = (data: any) => {
    if (editingLocation) {
      const updatedLocation = {
        ...editingLocation,
        name: data.name,
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
        image: data.image ? URL.createObjectURL(data.image[0]) : editingLocation?.image,
      };
      dispatch(updateLocation(updatedLocation));
      setEditingLocation(null);
    }
  };

  const handleDeleteLocation = (id: string) => {
    setLocationToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (locationToDelete) {
      dispatch(deleteLocation(locationToDelete));
    }
    setShowDeleteDialog(false);
    setLocationToDelete(null);
  };

  return (
    <div className="space-y-4">
        <button
          onClick={onBackClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to Map
        </button>
        <h1 className="text-2xl font-bold text-center">My Locations</h1>

      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
          <AddLocationForm 
            initialLat={0}
            initialLng={0}
            onSubmit={() => {
              setShowAddForm(false);
            }}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {editingLocation && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
          <h2 className="text-xl font-bold mb-4">Edit Location</h2>
          <AddLocationForm 
            initialLat={editingLocation.latitude}
            initialLng={editingLocation.longitude}
            initialValues={{
              name: editingLocation.name,
              description: editingLocation.description,
            }}
            onSubmit={handleUpdateLocation}
            onCancel={() => setEditingLocation(null)}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map(location => (
          <LocationCard 
            key={location.id} 
            location={location} 
            onEdit={() => setEditingLocation(location)}
            onDelete={() => handleDeleteLocation(location.id)}
          />
        ))}
      </div>
      <DeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        title="Delete Location"
        message="Are you sure you want to delete this location?"
      />
    </div>
  );
}

export default LocationList;