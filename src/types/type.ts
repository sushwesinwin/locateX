export interface AddLocationFormProps {
    initialLat: number;
    initialLng: number;
    initialValues?: {
      name?: string;
      description?: string;
    };
    onSubmit: (data: LocationFormData) => void;
    onCancel: () => void;
}

export interface LocationCardProps {
    location: Location;
    onEdit?: () => void;
    onDelete?: () => void;
}

export interface LocationListProps {
    onBackClick: () => void;
}

export interface NavbarProps {
    activeTab: 'map' | 'list';
    setActiveTab: (tab: 'map' | 'list') => void;
    onAddLocationClick: () => void;
}

export interface Location {
    id: string;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    image?: string;
  }
  
export interface LocationFormData {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    image?: FileList;
}

export interface DeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}
  