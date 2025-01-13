export function Home({ home, provider, esrow, toggle_pop }) {
  return  (
    <div className="home fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      {/* Container for home details */}
      <div className="home__details bg-white p-6 rounded-md w-4/5 md:w-3/4 lg:w-1/2 shadow-lg relative">
        {/* Close button */}
        <button
          onClick={() => toggle_pop()}
          className="absolute top-4 right-4 text-black text-xl font-bold hover:bg-gray-200 rounded-full p-2"
        >
          X
        </button>
        {/* Image Section */}
        <div className="home__image">
          <img
            src={home.image}
            alt="Home"
            className="w-full h-auto rounded-md"
          />
        </div>
        {/* Overview Section */}
        <div className="home__overview mt-4">
          <h1 className="text-2xl font-semibold">{home.name}</h1>
          <p className="text-lg text-gray-600 mt-2">
            <strong>{home.attributes[2]?.value}</strong> bds |
            <strong> {home.attributes[3]?.value}</strong> ba |
            <strong> {home.attributes[4]?.value}</strong> sqft
          </p>
          <p className="text-md mt-2 text-gray-500">{home.description}</p>
        </div>
        {/* Buttons Section */}
        <div className="home__actions flex justify-between mt-6">
          <button
            onClick={() => console.log("Buy button clicked!")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg"
          >
            Buy
          </button>
          <button
            onClick={() => console.log("Contact Agent button clicked!")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-lg"
          >
            Contact Agent
          </button>
        </div>
      </div>
    </div>
  );
}
