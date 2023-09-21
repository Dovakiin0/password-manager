import { useEffect, useState } from "react";
import { client } from "../config/client";
import useToast from "./useToast";
import { useManagerStore } from "../store/useManagerStore";
import { IPassword, IPasswordRequest } from "../types/IPassword";

export default function usePasswordManager() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState();
  const { Error, Success } = useToast();
  const {
    filteredPasswords,
    setPasswords,
    createPassword,
    updatePassword,
    deletePassword,
    searchPasswords,
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

  const searchPasswordByQuery = (query: string) => {
    searchPasswords(query);
  };

  const createNewPassword = async (
    password: IPasswordRequest,
    cb?: () => void,
  ) => {
    try {
      setLoading(false);
      const response = await client.post("/api/passwords", password);
      if (response.status === 201) {
        createPassword(response.data);
        Success({ message: "Credentials created Successfully!" });
        cb?.();
      }
    } catch (error: any) {
      Error({ message: error.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  const updateExistingPassword = async (
    _id: string,
    password: IPasswordRequest,
  ) => {
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
    passwords: filteredPasswords,
    loading,
    errors,
    createNewPassword,
    updateExistingPassword,
    deleteExistingPassword,
    searchPasswordByQuery,
  };
}
