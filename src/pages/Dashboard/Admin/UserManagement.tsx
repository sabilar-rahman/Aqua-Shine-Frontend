import { useState } from "react";
import { TUser } from "../../../types";
// import {
//   useGetAllUsersQuery,
//   useUpdateUserRoleMutation,
// } from "../../../redux/features/admin/user.api";
import Swal from "sweetalert2";
import { useGetAllUsersQuery, useUpdateUserRoleMutation } from "@/redux/api/adminApi/userApi";

const UserManagement = () => {
  const { data: usersResponse, isLoading: usersLoading } =
    useGetAllUsersQuery(undefined);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");

  if (usersLoading) {
    return (
      <div className="flex items-center justify-center lg:py-32">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  const users: TUser[] = usersResponse?.data || [];
  console.log(usersResponse);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateUserRole({ userId, role: newRole }).unwrap();

      // Show success alert
      Swal.fire({
        title: "Success!",
        text: "Role updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset selection
      setSelectedUserId(null);
      setSelectedRole("");
    } catch (error) {
      console.error("Failed to update role:", error);

      // Show error alert
      Swal.fire({
        title: "Error!",
        text: "Failed to update role.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="md:my-6 text-xl md:text-3xl text-primary text-center font-semibold mb-4">
        User Management
      </h2>
      <table className="table w-full bg-white md:p-8">
        <thead className="text-xl">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Edit Role</th>
          </tr>
        </thead>
        <tbody className="text-[17px]">
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {selectedUserId === user._id ? (
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="select select-bordered"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button
                      className="btn bg-hover text-white"
                      onClick={() =>
                        handleRoleChange(user._id as string, selectedRole)
                      }
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn text-white bg-primary hover:bg-hover"
                    onClick={() => {
                      setSelectedUserId(user._id as string);
                      setSelectedRole(user.role); // Initialize with the current role
                    }}
                  >
                    Edit Role
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;