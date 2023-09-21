import { useEffect, useState } from "react";
import { ILoginUser, IRegisterUser } from "../types/IUser";
import { client } from "../config/client";
import useToast from "./useToast";
import { useAuthStore } from "../store/useAuthStore";

export default function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState();
  const { current, setUser } = useAuthStore();
  const { Error, Success } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  // Check if current user exists and is valid
  const checkUser = async () => {
    try {
      const response = await client.get("/api/auth/@me");
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (err: any) {
      return;
    }
  };

  const login = async (credentials: ILoginUser) => {
    try {
      setLoading(true);
      const response = await client.post("/api/auth", credentials);
      if (response.status === 200) {
        setUser(response.data.user);
      }
    } catch (err: any) {
      setErrors(err);
      Error({ message: err.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: IRegisterUser) => {
    try {
      setLoading(true);
      const response = await client.post("/api/auth/register", {
        username: userData.username,
        password: userData.password,
      });
      if (response.status === 201) {
        setUser(response.data.user);
      }
    } catch (err: any) {
      setErrors(err);
      Error({ message: err.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      setLoading(true);
      const response = await client.post("/api/auth/logout", {});
      if (response.status === 200) {
        setUser(null);
        window.location.reload();
      }
    } catch (err: any) {
      setErrors(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    errors,
    register,
    logoutUser,
    current,
  };
}
