import { useState } from "react";
import Swal from "sweetalert2";

import { TSlot } from "../../../types";
import {
  useGetSlotsQuery,
  useUpdateSlotStatusMutation,
} from "@/redux/api/adminApi/slotApi";
import { toast } from "sonner";
import LoaderSpinner from "@/pages/shared/loadingPage/LoadingSpinner";

const SlotManagement = () => {
  const { data: slotsResponse, isLoading: slotsLoading } = useGetSlotsQuery();
  const [updateSlotStatus] = useUpdateSlotStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState<{
    [key: string]: string;
  }>({});

  // Handle the status selection change
  const handleStatusChange = (slotId: string, newStatus: string) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [slotId]: newStatus,
    }));
  };

  // Save the updated status
  const handleSaveStatus = async (slot: TSlot) => {
    if (slot.isBooked === "booked") {
      toast.error("Cannot change the status of a booked slot.");

      // Swal.fire({
      //   title: "Error",
      //   text: "Cannot change the status of a booked slot.",
      //   icon: "error",
      //   confirmButtonText: "OK",
      // });

      return;
    }

    const newStatus = selectedStatus[slot._id] || slot.isBooked; // Default to current status if not changed

    try {
      await updateSlotStatus({
        id: slot._id,
        status: newStatus,
      }).unwrap();

      toast.success(`Slot status updated to ${newStatus.toUpperCase()}!`);

      // Swal.fire({
      //   title: "Success",
      //   text: `Slot status updated to ${newStatus.toUpperCase()}!`,
      //   icon: "success",
      //   confirmButtonText: "OK",
      // });
    } catch (error) {
      toast.error("Failed to update slot status.");

      // console.error("Failed to update slot status:", error);
      // Swal.fire({
      //   title: "Error",
      //   text: "Failed to update slot status.",
      //   icon: "error",
      //   confirmButtonText: "OK",
      // });
    }
  };

  if (slotsLoading) {
    return <LoaderSpinner />;
  }
  // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
  const slots = slotsResponse?.data;

  return (
    <div>
      <h2 className="text-xl md:text-3xl text-primary text-center font-semibold mb-4">
        Slot Management
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full bg-white md:p-8">
          <thead className="text-xl">
            <tr>
              <th>Service Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot: TSlot) => (
              <tr key={slot._id}>
                <td>
                  {
                    // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
                    slot.service.name
                  }
                </td>
                <td>{slot.date}</td>
                <td>
                  {slot.startTime} - {slot.endTime}
                </td>
                <td>
                  {/* Select Dropdown for status */}
                  <select
                    className="select select-bordered w-full max-w-xs"
                    value={
                      slot.isBooked === "booked"
                        ? "booked"
                        : selectedStatus[slot._id] // Show selected status when not booked
                    }
                    onChange={(e) =>
                      handleStatusChange(slot._id, e.target.value)
                    }
                    disabled={slot.isBooked === "booked"} // Disable selection if booked
                  >
                    {/* Show booked text if the slot is booked */}
                    {slot.isBooked === "booked" ? (
                      <option value="booked" disabled>
                        BOOKED
                      </option>
                    ) : (
                      <>
                        <option value="available">AVAILABLE</option>
                        <option value="canceled">CANCELLED</option>
                      </>
                    )}
                  </select>
                </td>
                <td>
                  {/* Save Status Button */}
                  <button
                    className="btn bg-red-700 hover:bg-red-500 text-white hover:text-white"
                    onClick={() => handleSaveStatus(slot)}
                    disabled={slot.isBooked === "booked"} // Prevent updates for booked slots
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SlotManagement;
