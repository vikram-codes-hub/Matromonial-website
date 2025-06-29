import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { Authcontext } from '../Context/Authcontext';

const Allprofile = () => {
  const { getallprofiles } = useContext(Authcontext);
  const [Profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      const profilesData = await getallprofiles();
      setProfiles(profilesData);
      setLoading(false);
    };
    fetchProfiles();
  }, [getallprofiles]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Title
          Title1={"All Registered Profiles"}
          Title2={"Admin can view and take action here."}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center col-span-full">Loading...</p>
        ) : Profiles.length > 0 ? (
          Profiles.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.profileImage}
              name={item.name}
              age={item.age}
              city={item.city}
              profession={item.profession}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No profiles found.</p>
        )}
      </div>
    </div>
  );
};

export default Allprofile;
