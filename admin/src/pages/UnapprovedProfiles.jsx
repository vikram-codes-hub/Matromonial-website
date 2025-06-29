import React,{useContext,useState,useEffect} from 'react';
import { dummyProfiles } from '../assets/asset';
import ProductItem from '../components/ProductItem';
import { Authcontext } from '../Context/Authcontext';
const UnapprovedProfiles = () => {
  const { getunapprovedprofiles}=useContext(Authcontext)
  const [profile,setprofile]=useState([])
   const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const fetchprofiles=async()=>{
      setLoading(true);
     const  unaaprovedprofiles= await getunapprovedprofiles()
     setprofile(unaaprovedprofiles)
     setLoading(false)

    }
    fetchprofiles()
  },[getunapprovedprofiles])

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Unapproved Profiles</h2>

      {profile.length > 0 ? (
        <div className="grid ml-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.map(profile => (
           <ProductItem
  key={profile._id}
  id={profile._id}
  image={profile.profileImage}
  name={profile.name}
  age={profile.age}
  city={profile.city}
  profession={profile.profession}
/>

          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No unapproved profiles available.</p>
      )}
    </div>
  );
};

export default UnapprovedProfiles;