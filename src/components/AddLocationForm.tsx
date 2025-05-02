import { useForm } from "react-hook-form";
import { AddLocationFormProps, LocationFormData } from "../types/type";
import { useEffect } from "react";

function AddLocationForm({
  initialLat,
  initialLng,
  initialValues,
  onSubmit,
  onCancel,
}: AddLocationFormProps) {
  const { register, handleSubmit, setValue } = useForm<LocationFormData>({
    defaultValues: {
      latitude: initialLat,
      longitude: initialLng,
      name: initialValues?.name || "",
      description: initialValues?.description || "",
    },
  });

  useEffect(() => {
    setValue("latitude", initialLat);
    setValue("longitude", initialLng);
    if (initialValues) {
      setValue("name", initialValues.name || "");
      setValue("description", initialValues.description || "");
    }
  }, [initialLat, initialLng, initialValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Location Name</label>
        <input
          {...register("name", { required: true })}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          {...register("description")}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Latitude</label>
          <input
            {...register("latitude", { required: true, valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Longitude</label>
          <input
            {...register("longitude", { required: true, valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            readOnly
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default AddLocationForm;
