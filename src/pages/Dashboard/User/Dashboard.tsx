
import { useAppSelector } from "@/redux/hook";
import { TUser } from "@/types";
// import { TUser } from "../../../types";

const Dashboard = () => {
  const user: TUser | null = useAppSelector((state) => state.auth?.user);
  console.log(user);
  if (!user) {
    return <div>No user information available</div>;
  }

  const { name, email, role, phone, address, image: img } = user;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center justify-center my-5">
          {" "}
          <div className="avatar online ">
            <div className="w-44 rounded-full">
              <img src={img} alt={name} />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h1 className="text-center text-3xl font-semibold text-gray-800">
            {name}
          </h1>
          <p className="text-center text-gray-600">{email}</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Role</h3>
              <p className="text-gray-600">{role}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
              <p className="text-gray-600">{phone}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Address</h3>
              <p className="text-gray-600">{address}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Email</h3>
              <p className="text-gray-600">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;