import React, { createContext, useEffect, useState } from 'react';
import { dummyProfiles } from '../assets/asset'; // ✅ Import your profiles
import axios from 'axios';
import { toast } from 'react-toastify';


export const ProfilesContext = createContext();




const backend_url = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backend_url;



export const ProfilesContextProvider = ({ children }) => {
  const [savedProfiles, setSavedProfiles] = useState([]);

  // Load saved profiles on initial render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedProfiles')) || [];
    setSavedProfiles(saved);
  }, []);

  // Save to localStorage when savedProfiles changes
  useEffect(() => {
    localStorage.setItem('savedProfiles', JSON.stringify(savedProfiles));
  }, [savedProfiles]);

  const toggleSaveProfile = (profileId) => {
    const isCurrentlySaved = savedProfiles.some(profile => profile.id === profileId);

    if (isCurrentlySaved) {
      // Remove from saved
      const updatedProfiles = savedProfiles.filter(profile => profile.id !== profileId);
      setSavedProfiles(updatedProfiles);
    } else {
      // Add to saved
      const profileToSave = dummyProfiles.find(profile => profile.id === profileId);
      if (profileToSave) {
        const updatedProfiles = [...savedProfiles, profileToSave];
        setSavedProfiles(updatedProfiles);
      }
    }
  };



  const value = {
    savedProfiles,
    toggleSaveProfile,
  };

  return (
    <ProfilesContext.Provider value={value}>
      {children}
    </ProfilesContext.Provider>
  );
};

export default ProfilesContextProvider;
