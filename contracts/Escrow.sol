//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

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
    ) public {
        nft_address = _nft_address;
        seller = _seller;
        lender = _lender;
        Inspector = _inspector;
    }
}
