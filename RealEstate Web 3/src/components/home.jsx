import { useEffect, useState } from "react";

export function Home({ home, provider, esrow, toggle_pop }) {
  // Check if home data exists
  const [selectedHome, setSelectedHome] = useState(home);

  useEffect(() => {
    setSelectedHome(home);
  }, [home]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      {/* Full-page overlay */}
      <div className="relative bg-white p-6 rounded-md w-4/5 md:w-3/4 lg:w-1/2">
        <div className="flex justify-end">
          {/* Close button */}
          <button
            onClick={() => toggle_pop(selectedHome)}
            className="text-black text-xl font-bold hover:bg-gray-200 rounded-full p-2"
          >
            X
          </button>
        </div>
        <div className="flex flex-col items-center space-y-4">
          {/* Display the image of the home */}
          <img
            src={selectedHome.image}
            alt="home_image"
            className="w-full h-auto rounded-lg"
          />
          {/* Show the home details */}
          <div className="text-center">
            <h2 className="text-xl font-semibold">{selectedHome.name}</h2>
            <p className="text-lg mt-2">Price: {selectedHome.price} ETH</p>
            <p className="mt-2">{selectedHome.description}</p>
          </div>
          <div>
            <button className="m-2 p-2 bg-blue-500 w-20 rounded-md hover:cursor-pointer hover:bg-blue-400 ">
              {" "}
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
