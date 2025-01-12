import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

// Import the NavBar component (Renamed correctly)
import { NavBar } from "./components/Nav.jsx"; // Correct import
import { Search } from "./components/search.jsx"; // Correct import
import { PropertyCard } from "./components/Card.jsx"; // Correct import

// config 
import config from "../config.json"

//ABIs
import RealEstate from "../abis/RealEstate.json"
import Esrow from "../abis/Esrow.json"

function App() {
  // State for storing the account
  const [get_account, set_account] = useState(null);

  // Function to connect to the blockchain and get the account
  const blockchain_data = async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        console.error("MetaMask not detected");
        return;
      }

      // Initialize the provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      window.ethereum.on("accountChange", async () => {
        // lister for account change

        const accounts = await window.ethereum.request({
          method: "eth_requstAccounts",
        });
        const account = ethers.utils.getAddress(accounts[0]);
        set_account(account);
      });
      // console.log("Provider:", provider);
      console.log("Account:", account[0]);
    } catch (error) {
      console.error("Error connecting to blockchain:", error);
    }
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

        <div id="cards" className="flex items-center justify-center  mt-9">
          <div className="m-6">
          <PropertyCard image={"aa"} ethPrice={"10"} squareFeet={10} location={"Lahore"}  />
          </div>
          <div className="m-6">
          <PropertyCard image={"aa"} ethPrice={"10"} squareFeet={10} location={"Lahore"}  />
          </div>
          <div className="m-6">
          <PropertyCard image={"aa"} ethPrice={"10"} squareFeet={10} location={"Lahore"}  />
          </div>
       
        </div>
        
      </div>
    </>
  );
}

export default App;
