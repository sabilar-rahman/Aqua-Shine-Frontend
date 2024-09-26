import { useForm } from "react-hook-form";
import { useEffect } from "react";
// @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
const ServiceForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      img: "",
      duration: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      for (const key in initialData) {
        // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
        setValue(key, initialData[key]);
      }
    }
  }, [initialData, setValue]);

  const submitForm = (data: object) => {
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-lg font-bold">Service Form</h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="form-group">
            <label>Service Name</label>
            <input
              type="text"
              {...register("name", { required: "Service Name is required" })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="form-group mt-2">
            <label>Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="textarea textarea-bordered w-full"
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="form-group mt-2">
            <label>Price</label>
            <input
              type="number"
              {...register("price", { required: "Price is required" })}
              className="input input-bordered w-full"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="form-group mt-2">
            <label>Image URL</label>
            <input
              type="text"
              {...register("img")}
              className="input input-bordered w-full"
            />
            {errors.img && <p className="text-red-500">{errors.img.message}</p>}
          </div>

          <div className="form-group mt-2">
            <label>Duration </label>
            <input
              type="number"
              {...register("duration", { required: "Duration is required" })}
              className="input input-bordered w-full"
            />
            {errors.duration && (
              <p className="text-red-500">{errors.duration.message}</p>
            )}
          </div>

          <div className="modal-action mt-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;