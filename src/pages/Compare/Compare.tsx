import { useState } from "react";
// import { useGetAllServicesQuery } from "../../redux/features/admin/service.api";
// import { TService } from "../../types";
import { useGetAllServicesQuery } from "@/redux/api/adminApi/service.Api";
import { TService } from "@/types";

const Compare = () => {
  const { data: response, error, isLoading } = useGetAllServicesQuery();
  const [selectedServices, setSelectedServices] = useState<TService[]>([]);
  // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
  const services: TService[] = response?.data || [];

  // Handle service selection, restrict to a maximum of 5
  const handleSelectService = (service: TService) => {
    setSelectedServices((prev) => {
      if (prev.some((s) => s._id === service._id)) {
        return prev.filter((s) => s._id !== service._id);
      }
      if (prev.length < 5) {
        return [...prev, service];
      }
      return prev;
    });
  };

  // Render the selected services in a comparison table
  const renderServiceComparison = () => {
    if (selectedServices.length < 2) {
      return <p>Please select at least two services to compare.</p>;
    }

    return (
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Service Name</th>
            {selectedServices.map((service) => (
              <th key={service._id} className="py-2 px-4 border">
                {service.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border font-semibold">Price</td>
            {selectedServices.map((service) => (
              <td key={service._id} className="py-2 px-4 border">
                ${service.price}
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Duration</td>
            {selectedServices.map((service) => (
              <td key={service._id} className="py-2 px-4 border">
                {service.duration}
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Description</td>
            {selectedServices.map((service) => (
              <td key={service._id} className="py-2 px-4 border">
                {service.description}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

  if (isLoading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div>Error fetching services</div>;
  }

  return (
    <div className="py-24 bg-white px-5 rounded-lg shadow-md max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl text-primary  font-semibold text-center mb-6">
        Compare Services
      </h2>
      <div className="mb-6">
        <h3 className=" font-semibold mb-8 text-2xl ">
          Select Services to Compare
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services?.map((service: TService) => (
            <div
              key={service._id}
              className={`bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer ${
                selectedServices.some((s) => s._id === service._id)
                  ? "border-2 border-primary"
                  : ""
              } ${
                selectedServices.length >= 5 &&
                !selectedServices.some((s) => s._id === service._id)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => handleSelectService(service)}
            >
              <h3 className="text-xl font-semibold text-primary">
                {service.name}
              </h3>
              <p className="text-lg">Price: ${service.price}</p>
              <p className="text-lg">Duration: {service.duration}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">{renderServiceComparison()}</div>
    </div>
  );
};

export default Compare;