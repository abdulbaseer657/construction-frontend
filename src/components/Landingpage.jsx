import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import landingImage1 from "../assets/landingimage.jpeg.jpg";
import landingImage2 from "../assets/landingimage2.jpg";
import landingImage3 from "../assets/landingimage3.jpg";

const LandingPage = () => {
  const [number, setNumber] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const images = [landingImage1, landingImage2, landingImage3];

  const handleNumberChange = (e) => {
    const input = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(input)) {
      setNumber(input);
      setError(null);
    } else {
      setError('Please enter a valid number.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (number !== '') {
      navigate('/form');
    } else {
      setError('Please enter a valid number before submitting.');
    }
  };

  const getRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <div className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center"
         style={{ backgroundImage: `url(${getRandomImage()})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="z-10 p-8 bg-white rounded-lg shadow-xl opacity-90 flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">PVF SUBMITTAL BUILDER</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center space-y-4">
          <input
            type="text"
            value={number}
            onChange={handleNumberChange}
            placeholder="Enter a number"
            className="w-full px-3 py-2 text-lg border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
          />
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="px-8 py-3 text-xl text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
