//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
// using interface meaning getting this function form IERC721 from RealEstate contract
interface IERC721 {
    function transferFrom(address _from, address _to, uint256 _id) external;
}

contract Escrow {
    modifier only_seller() {
        require(
            msg.sender == seller,
            "Only Seller have permissions to call this method"
        );
        _;
    }
    modifier only_buyer(uint _nft_id) {
        require(
             msg.sender== buyer[_nft_id],
            "Only Buyer have permissions to call this method"
        );
        _;
    }

    address public nft_address;
    address payable public seller;
    address public lender;
    address public Inspector;
    // address public Appraiser ;

    mapping(uint => bool) public is_listed_check; // check nft_id is true / false
    mapping(uint => uint) public purchase_price;
    mapping(uint => uint) public escrow_amount;
    mapping(uint => address) public buyer;

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

    function list(
        uint _nftID,
        address _buyer,
        uint _purchase_price,
        uint _escrow_amount
    ) public payable only_seller {
        // transferFrom parameters def::
        // nft_address have the address of RealEstate contract a
        // msg.sender the sender
        //  address(this) current contract address  -> Escrow
        IERC721(nft_address).transferFrom(msg.sender, address(this), _nftID); // tranfer the ownership of seller to this contract (escrow)

        is_listed_check[_nftID] = true;
        purchase_price[_nftID] = _purchase_price;
        escrow_amount[_nftID] = _escrow_amount;
        buyer[_nftID] = _buyer;
    }

    function deposite_earnest(uint _nft_id) public payable only_buyer(_nft_id) {
    // require(msg.value >= (purchase_price[_nft_id] +  escrow_amount[_nft_id]) );   //  buyer ballance havr greater then equal to the purchase price + escrow_amount 
    require(msg.value >= escrow_amount[_nft_id] );  

    }

    function getBalance()public view returns(uint) {
        return address(this).balance;
    }
}
