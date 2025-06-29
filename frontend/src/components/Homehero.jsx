import React, { useState, useContext, useEffect } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';
import { Authcontext } from '../context/authcontext';

const Homehero = () => {
  const [filters, setFilters] = useState({
    religion: '',
    caste: '',
    education: '',
    city: '',
  });

  const { getallprofiles, authuser } = useContext(Authcontext);
  const [profiles, setProfiles] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
useEffect(() => {
  const fetchProfiles = async () => {
    setLoading(true);
    const profilesData = await getallprofiles();
    setProfiles(profilesData);
    setLoading(false);
  };

  if (authuser) {
    fetchProfiles();
  }
}, [getallprofiles, authuser]);


  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProfiles = profiles.filter((profile) => {
    if (!authuser) return true;
    return (
      profile._id !== authuser._id &&
      (filters.religion ? profile.religion?.toLowerCase().trim() === filters.religion.toLowerCase().trim() : true) &&
      (filters.caste ? profile.caste?.toLowerCase().includes(filters.caste.toLowerCase().trim()) : true) &&
      (filters.education ? profile.education?.toLowerCase().includes(filters.education.toLowerCase().trim()) : true) &&
      (filters.city ? profile.city?.toLowerCase().includes(filters.city.toLowerCase().trim()) : true)
    );
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Title
          Title1={"Two souls, one destiny "}
          Title2={"— find the one who’s made for you."}
        />
      </div>

      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-black text-white px-4 py-2 rounded hover:scale-104 transition-all duration-500"
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {showFilter && (
          <div className="md:w-1/4 w-full bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="space-y-3">
              <div>
                <label className="block font-medium text-black">Religion</label>
                <select
                  name="religion"
                  value={filters.religion}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                >
                  <option value="">All</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-black">Caste</label>
                <input
                  name="caste"
                  value={filters.caste}
                  onChange={handleChange}
                  placeholder="e.g. Brahmin"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              <div>
                <label className="block font-medium text-black">Education</label>
                <input
                  name="education"
                  value={filters.education}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              <div>
                <label className="block font-medium text-black">City</label>
                <input
                  name="city"
                  value={filters.city}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
            </div>
          </div>
        )}

        <div className={`${showFilter ? 'md:w-3/4' : 'w-full'} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
          {loading ? (
            <p>Loading profiles...</p>
          ) : filteredProfiles.length > 0 ? (
            filteredProfiles.map((item, index) => (
              <ProductItem
                key={item._id || index}
                id={item._id}
                image={item.profileImage}
                name={item.name}
                age={item.age}
                city={item.city}
                profession={item.profession}
              />
            ))
          ) : (
            <p className="text-gray-500">No profiles match the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homehero;
