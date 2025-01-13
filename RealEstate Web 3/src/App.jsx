import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

// Import the NavBar component (Renamed correctly)
import { NavBar } from "./components/Nav.jsx"; // Correct import
import { Search } from "./components/search.jsx"; // Correct import
import { PropertyCard } from "./components/Card.jsx"; // Correct import

// config
import config from "../config.json";

//ABIs
import RealEstate from "../abis/RealEstate.json";
import Esrow_abi from "../abis/Esrow.json";

function App() {
  // State for storing the account
  const [get_account, set_account] = useState(null);
  const [provider, setProvider] = useState(null);
  const [get_esrow, set_esrow] = useState(null);
  const [homes, setHomes] = useState([]);
  const [home, setHome] = useState([]);
  const [toggle , settoggle] = useState(false)

  // Function to connect to the blockchain and get the account
  const blockchain_data = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not detected");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      // const code = await provider.getCode('0x5FbDB2315678afecb367f032d93F642f64180aa3');
      // console.log(code); // Output should not be "0x"

      const network = await provider.getNetwork();
      // console.log("Connected Network:", network);

      const realEstateAddress = config[network.chainId]?.escrow?.address;
      if (!realEstateAddress) {
        throw new Error("esrow contract address not found in config.");
      }

      const realEstate = new ethers.Contract(
        config[network.chainId]?.realEstate?.address,
        RealEstate,
        provider
      );
      console.log("RealEstate Contract:", realEstate);

      const eesrow = new ethers.Contract(
        config[network.chainId]?.escrow?.address,
        Esrow_abi,
        provider
      );
      console.log("esrow Contract:", eesrow);

      set_esrow(eesrow);

      // Call total_supply
      const totalSupply = await realEstate.total_supply();
      console.log("Total Supply:", totalSupply.toString());

      const homes = [];

      for (let i = 0; i < totalSupply; i++) {
        const uri = await realEstate.tokenURI(i);
        const res = await fetch(uri);
        const metaData = await res.json();
        homes.push(metaData);
      }
      setHomes(homes);

      console.log("homes ", homes);

      // consts esrow =  new ethers.Contract(r)
    } catch (error) {
      console.error("Error connecting to blockchain:", error);
    }

    //  catch (error) {
    //       console.error("Error connecting to blockchain:", error);
    //     }
  };

  const taggle_prop = (home) => {
    console.log(home);
    setHome(home);
    toggle ? settoggle(false) : settoggle(true)
  };

  // Run the blockchain connection logic on mount
  useEffect(() => {
    blockchain_data();
  }, []);

  // Log account when it's updated
  useEffect(() => {
    if (get_account) {
      console.log("Account updated: ", get_account);
    }
  }, [get_account]);

  return (
    <>
      <NavBar account={get_account} set_account={set_account} />
      <div className="relative h-screen bg-realstate_pic bg-cover bg-center bg-opacity-45 backdrop-blur-md">
        {/* Add a dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

        {/* Navigation Bar */}

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <h2 className="text-white text-3xl font-bold pb-10">
              Search it. Explore it. Buy it
            </h2>
            <Search />
          </div>
        </div>

        <div id="cards" className="flex items-center justify-center mt-9">
          {homes.map((home, index) => (
            <div className="m-6" key={index} onClick={taggle_prop(home)}>
              <PropertyCard
                image={home.image}
                ethPrice={home.attributes[0].value}
                squareFeet={home.attributes[4].value}
                location={home.address}
              />
            </div>
          ))}
        </div>
        {toggle ? && (
          <Home/>
        ) :()}
      </div>
    </>
  );
}

export default App;
