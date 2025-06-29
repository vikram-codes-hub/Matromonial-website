import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { Authcontext } from '../Context/Authcontext';
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";

const Profile = () => {
  const { profileId } = useParams();
  const [productdata, setProductdata] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [disapproveMessage, setDisapproveMessage] = useState("");

  const { getProfileById, approveprofile, disapproveprofile } = useContext(Authcontext);

  useEffect(() => {
    const fetchprofile = async () => {
      const found = await getProfileById(profileId);
      // Ensure images array is always present
      found.images = Array.isArray(found.images) && found.images.length > 0
        ? found.images
        : [found.profileImage];
      setProductdata(found);
      setCurrentImageIndex(0);
    };
    fetchprofile();
  }, [profileId]);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productdata.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productdata.images.length - 1 : prev - 1
    );
  };

  if (!productdata) {
    return (
      <div className="flex justify-center items-center h-screen">Loading...</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Admin Review Panel – Please review the {productdata.name} details below and choose to approve or disapprove the profile.
      </h2>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Image Section */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative w-full h-80 md:h-[28rem] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={productdata.images[currentImageIndex]}
              alt={productdata.name}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {productdata.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-900 p-2 rounded-full shadow-lg transition"
                >
                  <GrFormPrevious size={26} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-900 p-2 rounded-full shadow-lg transition"
                >
                  <MdOutlineNavigateNext size={26} />
                </button>
              </>
            )}

            {productdata.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gray-800/60 text-white text-sm px-3 py-1 rounded-full">
                {currentImageIndex + 1} / {productdata.images.length}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {productdata.images.length > 1 && (
            <div className="flex gap-3 mt-5 overflow-x-auto pb-1">
              {productdata.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 rounded-lg cursor-pointer border-2 transition-all ${
                    currentImageIndex === index
                      ? "border-blue-600 shadow-md scale-105"
                      : "border-gray-300"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            {productdata.name}
          </h1>
          <div className="space-y-1 text-gray-700 text-lg">
            <p>Age: {productdata.age || "N/A"}</p>
            <p>City: {productdata.city || "N/A"}</p>
            <p>Gender: {productdata.gender || "N/A"}</p>
            <p>Profession: {productdata.profession || "N/A"}</p>
            <p>Religion: {productdata.religion || "N/A"}</p>
            <p>Caste: {productdata.caste || "N/A"}</p>
            <p>Education: {productdata.education || "N/A"}</p>
            <p>Income: {productdata.income || "N/A"}</p>
          </div>
          <p className="text-gray-600 mt-5 text-base leading-relaxed">
            {productdata.bio || "No bio available"}
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => approveprofile(productdata._id)}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-500 hover:scale-105"
            >
              Approve
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-500 hover:scale-105"
            >
              Disapprove
            </button>
          </div>
        </div>
      </div>

      {/* Modal for disapproval reason */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Reason for Disapproval</h3>
            <textarea
              value={disapproveMessage}
              onChange={(e) => setDisapproveMessage(e.target.value)}
              className="w-full h-24 p-2 border rounded resize-none"
              placeholder="Enter reason..."
            ></textarea>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  disapproveprofile(productdata._id, disapproveMessage);
                  setShowModal(false);
                  setDisapproveMessage("");
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Disapprove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
