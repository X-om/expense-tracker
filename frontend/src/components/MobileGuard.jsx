import React, { useEffect, useState } from 'react';

const MobileGuard = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();

    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (!isMobile) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Mobile Only Application
          </h2>
          <p className="text-gray-600">
            This application is currently only available for mobile devices. Please access it from your smartphone.
          </p>
          <div className="mt-6">
            <div className="w-16 h-32 mx-auto border-4 border-gray-300 rounded-xl relative">
              <div className="w-2 h-2 bg-gray-300 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"></div>
              <div className="w-6 h-1 bg-gray-300 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default MobileGuard;