import { useEffect } from "react";
import { ethers } from "ethers";

import "./App.css";

function App() {
  const blockchain_data = async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        console.error("MetaMask not detected");
        return;
      }

      // Initialize the provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      //   // Request accounts from MetaMask
      //   await provider.send("eth_requestAccounts", []);

      //   // Get the signer (the connected account)
      //   const signer = provider.getSigner();

      // Log provider and account information
      console.log("Provider:", provider);
      //   console.log("Connected Account:", await signer.getAddress());
    } catch (error) {
      console.error("Error connecting to blockchain:", error);
    }
  };

  // Run the blockchain connection logic on mount
  useEffect(() => {
    blockchain_data();
  }, []); // The empty dependency array ensures it runs only once when the component is mounted.

  return (
    <div>
      <p className="bg-black text-white inline-block p-10 m-10">Hello Web3</p>
    </div>
  );
}

export default App;
