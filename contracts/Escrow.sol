//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
// using interface meaning getting this function form IERC721 from RealEstate contract 
interface IERC721 {
    function transferFrom(address _from, address _to, uint256 _id) external;
}

contract Escrow {
    address public nft_address;
    address payable public seller;
    address public lender;
    address public Inspector;
    // address public Appraiser ;

    constructor(
        address _nft_address,
        address payable _seller,
        address _lender,
        address _inspector
    ) {
        nft_address = _nft_address;
        seller = _seller;
        lender = _lender;
        Inspector = _inspector;
    }

    function list(uint _nftID) public {
        // nft_address have the address of RealEstate contraact a
        // msg.sender the sender 
        //  address(this) current contract address  -> Escrow
        IERC721(nft_address).transferFrom(msg.sender , address(this), _nftID); 
    } 
}
