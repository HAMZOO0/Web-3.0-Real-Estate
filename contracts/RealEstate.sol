// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RealEstate is ERC721URIStorage {
    uint256 private _nextTokenId; // to keep track of the next token ID to be minted

    constructor() ERC721("Real Estate", "REAL") {} // initilazing the constructor of ERC721

    function mint(string memory tokenURI) public returns (uint256) {
        uint256 new_itemID = _nextTokenId++; // incrementing the token ID
        _mint(msg.sender, new_itemID); // minting the token to the sender
        _setTokenURI(new_itemID, tokenURI); // setting the token URI

        return new_itemID;
    }

    //return the total number of NFTs minted so far
    function total_supply() public view returns (uint256) {
        return _nextTokenId;
    }
}
