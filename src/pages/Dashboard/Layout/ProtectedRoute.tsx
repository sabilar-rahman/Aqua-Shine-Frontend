import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/api/auth/authSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentUser);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;