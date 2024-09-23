import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/redux/api/auth/authApi";
import { setUser } from "@/redux/api/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Assuming you're using React Router
import { useDispatch } from "react-redux";
import { TUser } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { Toaster, toast } from 'sonner'

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const { handleSubmit, reset, register } = useForm<TUser>({
    defaultValues: {
      email: "web@programming-hero.com",
      password: "ph-password",
    },
  });

  const onSubmit = async (data: TUser) => {
    try {
      const res = await login(data).unwrap();
      const token = res.token;
      const user = verifyToken(token);
      dispatch(setUser({ user, token }));
      if (user) {
        toast.success('Login Successfull')
        navigate(location.state?.from?.pathname || "/dashboard", {
          replace: true,
        });
        reset();

        console.log(user)
        
      }
    } catch (error) {
      toast.error('Login Failed')
    }
  };

  return (
    <div className="max-w-sm mx-auto my-12 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl text-center font-semibold mb-6">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-4">
        <span className="text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
