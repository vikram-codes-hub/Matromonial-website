import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Authcontext = createContext();

const backend_url = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backend_url;

export const AuthcontextProvider = ({ children }) => {
  const [token, settoken] = useState(localStorage.getItem("token"));
  const [authadmin, setauthadmin] = useState(null);

  const Login = async (credentials) => {
    try {
      const { data } = await axios.post('/api/admin/adminlogin', credentials);
      if (data.success) {
        setauthadmin({ isAdmin: true });
        axios.defaults.headers.common["token"] = data.token;
        settoken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.mssg);
      } else {
        toast.error(data.mssg);
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    }
  };

  const Logout = async () => {
    localStorage.removeItem("token");
    settoken(null);
    setauthadmin(null);
    axios.defaults.headers.common["token"] = null;
    toast.success("Logout successfully");
  };

  const getallprofiles = async () => {
    try {
      const { data } = await axios.get("/api/admin/getallusers");
      return data.users || [];
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getunapprovedprofiles = async () => {
    try {
      const { data } = await axios.get('/api/admin/getunapprovedprofiles');
      return data.profiles || [];
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getProfileById = async (id) => {
    try {
      const { data } = await axios.get(`/api/admin/getProfile/${id}`);
      if (data.success) {
        return data.profile;
      }
    } catch (error) {
      toast.error("Failed to fetch profile");
    }
  };

  const disapproveprofile = async (id, message) => {
    try {
      const { data } = await axios.put(`/api/admin/disapproveprofile/${id}`, {
        disapprovalMessage: message,
      });
      if (data.success) {
        toast.success("Disapproved profile successfully");
        return data.profile;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.mssg || error.message);
    }
  };

  const approveprofile = async (id) => {
    try {
      const { data } = await axios.put(`/api/admin/approveprofile/${id}`);
      if (data.success) {
        toast.success("Approved successfully");
        return data.user;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.mssg || error.message);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      axios.defaults.headers.common["token"] = storedToken;

      axios.get("/api/admin/checkauth")
        .then((res) => {
          if (res.data.success && res.data.isAdmin) {
            setauthadmin({ isAdmin: true });
            settoken(storedToken);
          } else {
            setauthadmin(null);
            settoken(null);
            localStorage.removeItem("token");
          }
        })
        .catch(() => {
          setauthadmin(null);
          settoken(null);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const value = {
    Login,
    Logout,
    authadmin,
    token,
    getallprofiles,
    getunapprovedprofiles,
    getProfileById,
    disapproveprofile,
    approveprofile,
  };

  return (
    <Authcontext.Provider value={value}>
      {children}
    </Authcontext.Provider>
  );
};

export default AuthcontextProvider;
