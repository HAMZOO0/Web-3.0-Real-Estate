import { ethers } from "ethers";
import { useEffect, useState } from "react";

export function Home({ home, provider, esrow, toggle_pop, Account }) {
  const [account, set_account] = useState(null);
  const [buyer, set_buyer] = useState(null);
  const [seller, set_seller] = useState(null);
  const [lender, set_lender] = useState(null);
  const [inspector, set_inspector] = useState(null);
  const [owner, set_owner] = useState(null);

  const [has_bought, set_has_bought] = useState(null);
  const [has_lended, set_has_lended] = useState(null);
  const [has_inspected, set_has_inspected] = useState(null);
  const [has_sold, set_has_sold] = useState(null);

  // Function to normalize addresses using ethers.utils.getAddress
  const normalizeAddress = (address) => {
    try {
      return ethers.utils.getAddress(address); // Normalize address
    } catch (error) {
      console.error("Invalid address:", address);
      return null; // Return null for invalid addresses
    }
  };

  const fetch_accounts = async () => {
    try {
      set_account(normalizeAddress(Account.get_account));

      const buyerAddress = await esrow.buyer(home.id);
      set_buyer(normalizeAddress(buyerAddress));

      const lenderAddress = await esrow.lender();
      set_lender(normalizeAddress(lenderAddress));

      const sellerAddress = await esrow.seller();
      set_seller(normalizeAddress(sellerAddress));

      const inspectorAddress = await esrow.Inspector();
      set_inspector(normalizeAddress(inspectorAddress));

      console.log(home.id , buyer   , "buyer" );
      

      // Approvals
      set_has_bought(await esrow.approval(home.id, buyerAddress));
      set_has_lended(await esrow.approval(home.id, lenderAddress));
      set_has_sold(await esrow.approval(home.id, sellerAddress));
      set_has_inspected(await esrow.approval(home.id, inspectorAddress));
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const fetch_owner = async () => {
    try {
      if (await esrow.is_listed_check(home.id)) return;
      const owner = await esrow.buyer(home.id);
      set_owner(normalizeAddress(owner)); // Normalize owner address
    } catch (error) {
      console.error("Error fetching owner:", error);
    }
  };

  useEffect(() => {
    fetch_accounts();
    fetch_owner();
  }, [has_sold, account]);

  // Check if the current account is a buyer, seller, lender, or inspector and render the correct button
  const renderActionButton = () => {
    if (!account) {
      return null; // If account is not set yet, don't render any button
    }

    if (owner) {
        return <div id="owner">Owned by {owner.slice(0, 6) + "..." + owner.slice(-4)}</div>; 
    }

    if (account === inspector) {
      return (
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg">
          Approve Inspection
        </button>
      );
    }

    if (account === lender) {
      return (
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg">
          Approve & Lend
        </button>
      );
    }

    if (account === seller) {
      return (
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg">
          Approve & Sell
        </button>
      );
    }

    if (account === buyer) {
      return (
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg">
          Buy
        </button>
      );
    }

    return null; // If none of the conditions match, return nothing
  };

  return (
    <div className="home fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="home__details bg-white p-6 rounded-md w-4/5 md:w-3/4 lg:w-1/2 shadow-lg relative">
        <button
          onClick={toggle_pop}
          className="absolute top-4 right-4 text-black text-xl font-bold hover:bg-gray-200 rounded-full p-2"
        >
          X
        </button>
        <div className="home__image">
          <img src={home.image} alt="Home" className="w-full h-auto rounded-md" />
        </div>
        <div className="home__overview mt-4">
          <h1 className="text-2xl font-semibold">{home.name}</h1>
          <p className="text-lg text-gray-600 mt-2">
            <strong>{home.attributes[2]?.value}</strong> bds |{" "}
            <strong>{home.attributes[3]?.value}</strong> ba |{" "}
            <strong>{home.attributes[4]?.value}</strong> sqft
          </p>
          <p className="text-md mt-2 text-gray-500">{home.description}</p>
        </div>

        {/* Render action button */}
        <div className="home__actions flex flex-col gap-4 mt-6">
          {renderActionButton()}
        </div>

        {/* Common buttons */}
        <div className="home__actions flex justify-between mt-6"></div>
      </div>
    </div>
  );
}
