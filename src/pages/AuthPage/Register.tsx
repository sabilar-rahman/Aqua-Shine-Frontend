import { useSignUpMutation } from '@/redux/api/auth/authApi';
import { setRegistrationData } from '@/redux/api/auth/registerSlice';
import { TUser } from '@/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Register = () => {
  const { handleSubmit, reset, register } = useForm<TUser>();
  const dispatch = useDispatch();
  const [signUp] = useSignUpMutation();

//   const onSubmit = async (data: TUser) => {
//     console.log('Registration Data:', data);
//     dispatch(setRegistrationData(data));
//     const user = await signUp(data);
//     console.log('this is user=>', user);
//     reset();
//   };


  const onSubmit: SubmitHandler<TUser> = async (data) => {
    try {
      console.log("Registration Data:", data);

      // Dispatch the registerUser action to store the data in Redux
      dispatch(setRegistrationData(data));
      const user = await signUp(data).unwrap();
      console.log("User:", user);

      // Reset the form fields after submission
      reset();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };





  return (
    <div className="max-w-md mx-auto mt-16 p-8 shadow-lg rounded-lg bg-white">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">
        Create an Account
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            id="name"
            {...register('name')}
            placeholder="Enter your name"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="Enter your email"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
            Phone
          </label>
          <input
            id="phone"
            {...register('phone')}
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-600">
            Role
          </label>
          <select
            id="role"
            {...register('role')} 
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            placeholder="Enter your password"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-600">
            Address
          </label>
          <input
            id="address"
            {...register('address')}
            placeholder="Enter your address"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 transition-colors"
        >
          Register
        </button>
      </form>

      <div className="text-center mt-6">
        <span className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
