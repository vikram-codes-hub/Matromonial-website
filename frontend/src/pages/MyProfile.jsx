import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/asset";
import { Authcontext } from "../context/authcontext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { updateProfile, authuser, setAuthuser } = useContext(Authcontext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");
  const [profession, setProfession] = useState("");
  const [city, setCity] = useState("");
  const [education, setEducation] = useState("");
  const [income, setIncome] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(assets.avatar_icon);
  const [selectedImg, setSelectedImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authuser) {
      setName(authuser.name || "");
      setAge(authuser.age || "");
      setGender(authuser.gender || "");
      setReligion(authuser.religion || "");
      setCaste(authuser.caste || "");
      setProfession(authuser.profession || "");
      setCity(authuser.city || "");
      setEducation(authuser.education || "");
      setIncome(authuser.income || "");
      setBio(authuser.bio || "");
      setImage(authuser.profileImage || assets.avatar_icon);
    }
  }, [authuser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      setSelectedImg(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      age,
      gender,
      religion,
      caste,
      profession,
      city,
      education,
      income,
      bio,
    };

    try {
      if (!selectedImg) {
        const res = await updateProfile(updatedData);
        if (res.success) {
          setAuthuser(res.user);
          localStorage.setItem("user", JSON.stringify(res.user));
        }
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(selectedImg);
        reader.onload = async () => {
          const base64img = reader.result;
          const res = await updateProfile({ ...updatedData, profileImage: base64img });
          if (res.success) {
            setAuthuser(res.user);
            localStorage.setItem("user", JSON.stringify(res.user));
          }
        };
      }
    } catch (error) {
      toast.error("Error updating profile");
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Profile saved!");
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      {authuser?.isApproved === false && authuser?.disapprovalMessage && (
        <div className="max-w-3xl mb-6 px-6 py-4 bg-red-50 border border-red-300 text-red-800 rounded-lg shadow-md flex items-start space-x-3">
          <svg
            className="w-6 h-6 text-red-600 mt-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 4.354a9 9 0 110 15.292 9 9 0 010-15.292z"
            />
          </svg>
          <div>
            <p className="font-semibold text-red-700">Your profile was disapproved.</p>
            <p className="text-sm">{authuser.disapprovalMessage}</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-150 rounded-xl w-full max-w-2xl shadow-2xl p-8"
      >
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-lg group">
            <img
              src={selectedImg ? URL.createObjectURL(selectedImg) : image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <label className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium cursor-pointer hover:bg-black/60 transition">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-gray-500 text-sm mt-2">JPG, PNG (Max 5MB)</p>
        </div>

        <div className="mt-8 space-y-4">
          {[
            { label: "Name", value: name, setter: setName },
            { label: "Age", value: age, setter: setAge },
            { label: "Gender", value: gender, setter: setGender },
            { label: "Religion", value: religion, setter: setReligion },
            { label: "Caste", value: caste, setter: setCaste },
            { label: "Profession", value: profession, setter: setProfession },
            { label: "City", value: city, setter: setCity },
            { label: "Education", value: education, setter: setEducation },
            { label: "Income", value: income, setter: setIncome },
          ].map(({ label, value, setter }) => (
            <div key={label}>
              <label className="block text-sm font-medium text-black mb-1">
                {label}
              </label>
              <input
                type="text"
                required
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 text-black focus:border-black focus:ring-2 outline-none transition"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Bio
            </label>
            <textarea
              value={bio}
              required
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-200 text-black focus:border-black focus:ring-2 outline-none transition min-h-[120px]"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 px-6 py-3 bg-black hover:scale-103 text-white font-medium rounded-lg transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
