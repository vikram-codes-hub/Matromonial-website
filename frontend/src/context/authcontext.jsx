import React, { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Authcontext = createContext();

const backend_url = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backend_url;

export const AuthcontextProvider = ({ children }) => {
  const [token, settoken] = useState(localStorage.getItem("token"));
  const [authuser, setauthuser] = useState(() => {
    try {
      const userFromStorage = localStorage.getItem("user");
      return userFromStorage && userFromStorage !== "undefined"
        ? JSON.parse(userFromStorage)
        : null;
    } catch {
      return null;
    }
  });

  const checkauth = async () => {
    try {
      const { data } = await axios.get("/api/user/checkauth");
      if (data.success) {
        setauthuser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (error) {
      logout();
    }
  };

  const Login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/user/${state}`, credentials);
      if (data.success) {
        setauthuser(data.user);
        axios.defaults.headers.common["token"] = data.token;
        settoken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.msg);
        return data.user;
      } else {
        toast.error(data.msg);
        return null;
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    settoken(null);
    setauthuser(null);
    delete axios.defaults.headers.common["token"];
    toast.success("Logout successfully");
  };

  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/user/updateProfile", body);
      if (data.success) {
        setauthuser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Profile updated successfully");
        return data;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getallprofiles = async () => {
    try {
        const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/user/getAllProfiles", {
      headers: { token }, 
    });
      if (data.success) {
        return data.profiles || [];
      } else {
        toast.error("Failed to fetch profiles.");
        return [];
      }
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  };

  const getprofilebyid = async (id) => {
    try {
      const { data } = await axios.get(`/api/user/getProfile/${id}`);
      if (data.success) {
        return data.profile;
      } else {
        toast.error("Failed to fetch profile.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const likeprofileid = async (likedProfileId) => {
    try {
      const { data } = await axios.post(`/api/user/likeprofile/${likedProfileId}`);
      console.log(data);
    } catch (error) {
      console.error(error.response?.data?.mssg || error.message);
    }
  };

const getCurrentUserData = useCallback(async () => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.get("/api/user/getCurrentUser", {
      headers: { token }, 
    });

    if (data.success) {
    
      return data.user;
    } else {
      toast.error(data.msg);
      return null;
    }
  } catch (error) {
    toast.error(error.message);
    return null;
  }
}, []);


  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      axios.defaults.headers.common["token"] = tokenFromStorage;
      settoken(tokenFromStorage);
      checkauth();
    }
  }, []);

  const value = {
    token,
    authuser,
    settoken,
    setauthuser,
    Login,
    checkauth,
    updateProfile,
    logout,
    getallprofiles,
    getprofilebyid,
    getCurrentUserData,
    likeprofileid,
  };

  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
};

export default AuthcontextProvider;
