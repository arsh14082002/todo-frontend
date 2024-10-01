// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get('http://localhost:3000/api/v1/user/profile', {
          headers: { authorization: `Bearer ${token}` },
        });
        setProfileData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-slate-500 h-screen w-full">
      {/* <h1>Profile</h1> */}
      <div className="flex justify-center items-center flex-col h-full w-full ">
        {profileData && (
          <div className="bg-slate-700 p-6 rounded-2xl">
            <div className="flex justify-center items-center mb-4 ">
              <img
                src={profileData.profileImg}
                alt=""
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex justify-center flex-col items-center bg-slate-800 text-white p-2">
                <span>Total</span>
                <span>{profileData.totalTodos}</span>
              </div>
              <div className="flex justify-center flex-col items-center bg-slate-800 text-white p-2">
                <span>Pinned</span>
                <span>{profileData.pinnedTodos}</span>{' '}
              </div>
              <div className="flex justify-center flex-col items-center bg-slate-800 text-white p-2">
                <span>Completed</span>
                <span>{profileData.completedTodos}</span>
              </div>
              <div className="flex justify-center flex-col items-center bg-slate-800 text-white p-2">
                <span>Not Completed</span>
                <span> {profileData.notCompletedTodos}</span>
              </div>
              <div className="flex justify-center flex-col items-center bg-slate-800 text-white p-2">
                <span>Progress Updated</span>
                <span> {profileData.progressUpdatedTodos}</span>
              </div>
            </div>
          </div>
        )}
        <Link to={'/todos'} className="bg-slate-800 text-white p-2 mt-4 pr-6 pl-6">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Profile;
