import { useEffect, useState } from "react";
import { client } from "../config/client";
import useToast from "./useToast";
import { useManagerStore } from "../store/useManagerStore";
import { IPassword } from "../types/IPassword";

export default function usePasswordManager() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState();
  const { Error, Success } = useToast();
  const {
    passwords,
    setPasswords,
    createPassword,
    updatePassword,
    deletePassword,
  } = useManagerStore();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(false);
      const response = await client.get("/api/passwords");
      if (response.status === 200) {
        setPasswords(response.data);
      }
    } catch (error: any) {
      Error({ message: error.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  const createNewPassword = async (password: IPassword) => {
    try {
      setLoading(false);
      const response = await client.post("/api/passwords", password);
      if (response.status === 201) {
        createNewPassword(response.data);
        Success({ message: "Credentials created Successfully!" });
      }
    } catch (error: any) {
      Error({ message: error.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  const updateExistingPassword = async (_id: string, password: IPassword) => {
    try {
      setLoading(false);
      const response = await client.put(`/api/passwords/${_id}`, password);
      if (response.status === 200) {
        updatePassword(_id, response.data);
        Success({ message: "Credentials updated Successfully!" });
      }
    } catch (error: any) {
      Error({ message: error.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  const deleteExistingPassword = async (_id: string) => {
    try {
      setLoading(false);
      const response = await client.delete(`/api/passwords/${_id}`);
      if (response.status === 200) {
        deletePassword(_id);
        Success({ message: "Credentials deleted Successfully!" });
      }
    } catch (error: any) {
      Error({ message: error.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  return {
    passwords,
    loading,
    errors,
    createNewPassword,
    updateExistingPassword,
    deleteExistingPassword,
  };
}
