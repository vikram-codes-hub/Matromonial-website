import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProfilesContext } from "../context/Profile";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import { Authcontext } from "../context/authcontext";

const Profile = () => {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const { savedProfiles, toggleSaveProfile } = useContext(ProfilesContext);
  const { getprofilebyid, likeprofileid, authuser } = useContext(Authcontext);

  const [productdata, setProductdata] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isSaved = savedProfiles.some((profile) => profile.id === profileId);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getprofilebyid(profileId);
      if (profile) {
        setProductdata(profile);
        setCurrentImageIndex(0);
      }
    };
    fetchProfile();
  }, [profileId]);

  const nextImage = () => {
    if (Array.isArray(productdata?.image)) {
      setCurrentImageIndex((prev) =>
        prev === productdata.image.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (Array.isArray(productdata?.image)) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? productdata.image.length - 1 : prev - 1
      );
    }
  };

  if (!productdata) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <img
              src={
                Array.isArray(productdata.profileImage)
                  ? productdata.profileImage[currentImageIndex]
                  : productdata.profileImage
              }
              alt={productdata.name}
              className="w-full h-full object-cover"
            />

            <button
              onClick={() => {
                toggleSaveProfile(profileId);
                likeprofileid(profileId);

              }}
              className="absolute top-4 right-4 ..."
            >
              {isSaved ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-gray-800 text-xl hover:text-red-500" />
              )}
            </button>

            {Array.isArray(productdata.profileImage) &&
              productdata.profileImage.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
                  >
                    <GrFormPrevious size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
                  >
                    <MdOutlineNavigateNext size={24} />
                  </button>
                </>
              )}

            {Array.isArray(productdata.profileImage) && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {productdata.profileImage.length}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {Array.isArray(productdata.profileImage) &&
            productdata.profileImage.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto py-2">
                {productdata.profileImage.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                      currentImageIndex === index
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {productdata.name}
          </h1>
          <p className="text-gray-700 text-lg mb-1">Age: {productdata.age}</p>
          <p className="text-gray-700 text-lg mb-1">City: {productdata.city}</p>
          <p className="text-gray-700 text-lg mb-1">
            Profession: {productdata.profession}
          </p>
          <p className="text-gray-700 text-lg mb-1">
            Religion: {productdata.religion}
          </p>
          <p className="text-gray-700 text-lg mb-1">
            Caste: {productdata.caste}
          </p>
          <p className="text-gray-700 text-lg mb-1">
            Education: {productdata.education}
          </p>
          <p className="text-gray-700 text-lg mb-1">
            Income: {productdata.income}
          </p>
          <p className="text-gray-600 mt-4">{productdata.bio}</p>

          <div className="flex gap-5">
            <button
              onClick={() => navigate("/chatpage")}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors hover:scale-105"
            >
              In-App Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
