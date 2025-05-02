import { LocationCardProps } from '../types/type';

function LocationCard({ location, onEdit, onDelete }: LocationCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {location.image && (
        <img 
          src={location.image} 
          alt={location.name} 
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{location.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{location.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </div>
          
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationCard;