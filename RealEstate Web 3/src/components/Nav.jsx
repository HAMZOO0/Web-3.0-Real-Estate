import React from "react";
import nav_logo from "../assets/5b88fd25-3684-47b4-96d9-e0a4798b6e6c.png"; // Import your logo image

export function NavBar({ account, set_account }) {
  const connect_handler = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Set the account
      set_account(accounts[0]); // Store the first account from the returned array
      console.log("Account:", accounts[0]);
    } catch (error) {
      console.error("Error connecting to blockchain:", error);
    }
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={nav_logo} alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-white font-bold text-xl">Rihaish</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <a
              href="#home"
              className="text-white hover:text-gray-400 p-4 text-xl "
            >
              Buy
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-white hover:text-gray-400 p-4 text-xl "
            >
              Sell
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="text-white hover:text-gray-400 p-4 text-xl "
            >
              Rent
            </a>
          </li>
        </ul>

        {
          account ? (
            <button className="text-white bg-blue-500 py-2 px-4 rounded hover:bg-blue-600">
           {account.slice(0,5)+'...'+account.slice(38,42)}
          </button>
          ): (
            <button className="text-white bg-red-600 py-2 px-4 rounded hover:bg-red-900" onClick={connect_handler}>
            Connect Wallet
          </button>
          )
        }
    
      </div>
    </nav>
  );
}
