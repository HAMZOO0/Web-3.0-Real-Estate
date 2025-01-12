import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

// Import the NavBar component (Renamed correctly)
import { NavBar } from "./components/Nav.jsx"; // Correct import

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

      window.ethereum.on("accountChange", async () => { // lister for account change

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
      <div>
        <NavBar account={get_account} set_account={set_account} />

        <div>
          <p>Hi</p>
        </div>
      </div>
    </>
  );
}

export default App;
