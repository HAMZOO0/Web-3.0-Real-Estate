// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importing ERC721URIStorage and ERC721 from OpenZeppelin
import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RealEstate is ERC721URIStorage {
    uint256 private _nextTokenId; // Keeps track of the next token ID to be minted

    // Constructor that initializes the ERC721 contract with a name and symbol
    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    // Mint function to create a new NFT with a unique token ID and a specified URI
    function mint(string memory tokenURI) public returns (uint256) {
        uint256 new_itemID = _nextTokenId++; // Incrementing the token ID for the next token
        _mint(msg.sender, new_itemID); // Minting the token and assigning it to the sender's address
        _setTokenURI(new_itemID, tokenURI); // Setting the token's URI (metadata link) for the new token

        return new_itemID; // Return the newly minted token ID
    }

    // A function to return the total number of NFTs minted (i.e., the next token ID)
    function total_supply() public view returns (uint256) {
        return _nextTokenId; // The next token ID is the total supply
    }
}
