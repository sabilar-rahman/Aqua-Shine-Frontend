import { useState } from "react";
import Swal from "sweetalert2";
import ServiceForm from "./ServiceForm"; // Updated ServiceForm component
import {
  useCreateAServiceMutation,
  useDeleteServiceMutation,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
} from "@/redux/api/adminApi/service.Api";
import { TService } from "../../../types";


const ServiceManagement = () => {
  const { data: servicesResponse, isLoading: servicesLoading } =
    useGetAllServicesQuery();
  const [addService] = useCreateAServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [selectedService, setSelectedService] = useState<TService | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const handleAddService = async (serviceData: TService) => {
    try {
      await addService(serviceData).unwrap();
      setAddModalOpen(false);

      // Success alert
      Swal.fire({
        title: "Success",
        text: "Service added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Optimistically update data or refetch
    } catch (error) {
      console.error("Failed to add service:", error);

      // Error alert
      Swal.fire({
        title: "Error",
        text: "Failed to add service.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Handle updating a service
  const handleUpdateService = async (serviceData: TService) => {
    try {
      await updateService({
        id: selectedService?._id as string,
        data: serviceData,
      }).unwrap();
      setUpdateModalOpen(false);

      // Success alert
      Swal.fire({
        title: "Success",
        text: "Service updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Optimistically update data or refetch
    } catch (error) {
      console.error("Failed to update service:", error);

      // Error alert
      Swal.fire({
        title: "Error",
        text: "Failed to update service.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    try {
      await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteService(serviceId).unwrap();
          Swal.fire("Deleted!", "Your service has been deleted.", "success");
          // Optimistically update data or refetch
        }
      });
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  if (servicesLoading) {
    return (
      <div className="flex items-center justify-center lg:py-32">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
  const services = servicesResponse?.data;

  return (
    <div>
      <h2 className="text-xl md:text-3xl text-primary text-center font-semibold mb-4">
        Service Management
      </h2>

      <div className="text-end">
        <button
          className="btn bg-primary text-white hover:bg-hover mb-4"
          onClick={() => setAddModalOpen(true)}
        >
          Add Service
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full bg-white md:p-8">
          <thead className="text-xl">
            <tr>
              <th>Service Name</th>
              <th>Demo Image </th>
              <th>Description</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service: TService) => (
              <tr key={service._id} className="text-[17px]">
                <td>{service.name}</td>
                <td>
                  <div className="mask rounded-xl h-24 w-24">
                    <img src={service.img} alt="Not found" />
                  </div>
                </td>
                <td>{service.description}</td>
                <td>${service.price}</td>
                <td>{service.duration} Minutes</td>
                <td>
                  <button
                    className="btn bg-hover text-white hover:bg-primary mr-2"
                    onClick={() => {
                      setSelectedService(service);
                      setUpdateModalOpen(true);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn bg-red-500 hover:bg-primary text-white"
                    onClick={() => handleDeleteService(service._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Service Modal */}
      {isAddModalOpen && (
        // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
        <ServiceForm
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleAddService}
        />
      )}

      {/* Update Service Modal */}
      {isUpdateModalOpen && selectedService && (
        <ServiceForm
          isOpen={isUpdateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          onSubmit={handleUpdateService}
          initialData={selectedService}
        />
      )}
    </div>
  );
};

export default ServiceManagement;