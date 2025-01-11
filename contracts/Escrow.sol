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
            msg.sender == buyer[_nft_id],
            "Only Buyer have permissions to call this method"
        );
        _;
    }
    modifier only_Inspector(uint _nft_id) {
        require(
            msg.sender == Inspector,
            "Only Inspector have permissions to call this method"
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
    mapping(uint => bool) public inpection_check;
    mapping(uint => mapping(address => bool)) public approval;

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

    // Transfer the owner-ship to escrow
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

    //  Down payment
    function deposite_earnest(uint _nft_id) public payable only_buyer(_nft_id) {
        // require(msg.value >= (purchase_price[_nft_id] +  escrow_amount[_nft_id]) );   //  buyer ballance havr greater then equal to the purchase price + escrow_amount
        require(msg.value >= escrow_amount[_nft_id]);
    }

    function inpection_test(
        uint _nft_id,
        bool _result
    ) public only_Inspector(_nft_id) {
        inpection_check[_nft_id] = _result;
    }

    function sell_approval(uint _nft_id) public {
        approval[_nft_id][msg.sender] = true;
    }

    /*  // todo :
    --> Required inspetion status
    --> Required sale to authorized
    --> Required funds to currect ammount ...
    -- > Tranfer NFT 
    --> Tranfer Funds to Seller 
    */
    function finalize_sell(uint _nft_id) public {
        require(
            inpection_check[_nft_id] == true,
            "inpection_check of this nft is false it must be true "
        );
        require(
            approval[_nft_id][buyer[_nft_id]],
            "Buyer can't approved this NFT "
        );
        require(approval[_nft_id][seller], " Seller can't approved this NFT ");
        require(approval[_nft_id][lender], "Lender Can't approuve  this NFT");
        require(
            address(this).balance >= escrow_amount[_nft_id],
            "Your Balanece is not Enough for Escrow "
        );


// Tranfer Funds to Seller 
       (bool sent ,bytes memory data )  = seller.call{value:address(this).balance}("Escrow transfer funds to seller ");
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    // function receive() external payable {}
}
