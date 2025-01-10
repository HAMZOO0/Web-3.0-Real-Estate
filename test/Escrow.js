const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Escrow", () => {
  let buyer, seller, lender, inspector; // all address storate
  let real_estate_deploy, real_estate_compile; // real state contract storage
  let Escrow_deploy, Escrow_compile; // escrow contract storage

  // before test case run this function
  before(async () => {
    console.log("Before all tests");

    const signers = await ethers.getSigners(); // get the signers what is signers
    // console.log(signers); // get the addresses of the signers

    buyer = signers[0];
    seller = signers[1];
    lender = signers[2];
    inspector = signers[3];

    real_estate_compile = await ethers.getContractFactory("RealEstate");
    real_estate_deploy = await real_estate_compile.deploy();
    console.log("RealEstate deployed to:", real_estate_deploy.address);

    // this block is for trasection
    {
      const trasection = await real_estate_deploy
        .connect(seller)
        .mint(
          "https://amethyst-rare-eel-981.mypinata.cloud/ipfs/QmfSHSg1xzt7jvCBQXDQZ3mc4JZCmKVgSXdrfTxXiovLW4"
        );
      // Check owner of token ID 0
      const owner = await real_estate_deploy.ownerOf(0);
      console.log("Owner of token ID 0:", owner);
      console.log("Trasection Hash:", trasection.hash);
      console.log("seller", seller.address); // seller address which is owner(0)
    }

    // Escrow contract compilation and deployment
    Escrow_compile = await ethers.getContractFactory("Escrow");
    Escrow_deploy = await Escrow_compile.deploy(
      real_estate_deploy.address,
      seller.address,
      lender.address,
      inspector.address
    );
    console.log("Escrow deployed to:", Escrow_deploy.address);

    //* The seller gives permission to the Escrow contract to manage their NFT with token ID 0.
    //* Without this step, the Escrow contract cannot do anything with the NFT because the seller still owns it.
    let trasection = await real_estate_deploy
      .connect(seller)
      .approve(Escrow_deploy.address, 0); // getting approval
    await trasection.wait();

    // sting the NFT in the Escrow contract so it can handle the sale.
    trasection = await Escrow_deploy.connect(seller).list(
      0,
      buyer.address,
      tokens(10),
      tokens(5)
    ); // calling the list function of escrow
    await trasection.wait(); // here we seller calling list which tranfer the ownership to escrow account
  });

  // here we test all addresses
  describe("Deployment", () => {
    it("Return NFT address", async () => {
      const NftAddress = await Escrow_deploy.nft_address();
      expect(NftAddress).to.equal(real_estate_deploy.address);
    });

    it("Return Seller address", async () => {
      const SellerAdress = await Escrow_deploy.seller();
      expect(SellerAdress).to.equal(seller.address);
    });

    it("Return Lender address", async () => {
      const LenderAdress = await Escrow_deploy.lender();
      expect(LenderAdress).to.equal(lender.address);
    });

    it("Return inspector address", async () => {
      const InspectorAdress = await Escrow_deploy.Inspector();
      expect(InspectorAdress).to.equal(inspector.address);
    });
  });

  // Testing of listing in Escrow
  // * ownerOf(0) is ERC 721 function use to get owner  and as a  parameter add the tokenid (nft id)
  describe("Listing", () => {
    it("Update owner to Escrow", async () => {
      console.log(
        " real_estate_deploy.ownerOf(0)",
        await real_estate_deploy.ownerOf(0)
      );
      console.log(" Escrow_deploy.address", await Escrow_deploy.address);
      console.log(" seller.address", await seller.address);

      //now the address of real_estate_Depl.owerof(nft_id(0)) == eswrow address
      expect(await real_estate_deploy.ownerOf(0)).to.equal(
        Escrow_deploy.address
      );
    });

    it("Check Listing of NFT", async () => {
      const check = await Escrow_deploy.is_listed_check(0);
      expect(check).to.equal(true);
    });

    it("Buyer check", async () => {
      const Escrow_deploy_buyer = await Escrow_deploy.buyer(0);
      expect(Escrow_deploy_buyer).to.equal(buyer.address);
    });
    it("Purchase Price Check", async () => {
      const Escrow_deploy_buyer = await Escrow_deploy.purchase_price(0);
      expect(Escrow_deploy_buyer).to.equal(tokens(10));
    });
    it("Escrow Amount Check", async () => {
      const Escrow_deploy_buyer = await Escrow_deploy.escrow_amount(0);
      expect(Escrow_deploy_buyer).to.equal(tokens(5));
    });
  });

  describe("Deposite Funds", () => {
    it("Buyer to Escrow Tranfer ", async () => {
      const trasection = await Escrow_deploy.connect(buyer).deposite_earnest(
        0,
        {
          value: tokens(5),
        }
      );
      await trasection.wait();

      const escrow_balance = await Escrow_deploy.getBalance();
      expect(escrow_balance).to.equal(tokens(5));
      console.log("trasection :: ", trasection);
      console.log("escrow_balance :: ", escrow_balance);
    });
  });

  describe("Inspection ", () => {
    it("Update Inspection Test", async () => {
      const trasection = await Escrow_deploy.connect(inspector).inpection_test(
        0,
        true
      );
      await trasection.wait();
      const result = await Escrow_deploy.inpection_check(0);

      expect(result).to.equal(true);
    });
    describe("Approval ", () => {
      it("Update approval Test", async () => {
        const trasection_buyer = await Escrow_deploy.connect(
          buyer
        ).sell_approval(0);
        await trasection_buyer.wait();
        expect(await Escrow_deploy.approval(0, buyer.address)).to.equal(true);

        const trasection_seller = await Escrow_deploy.connect(
          seller
        ).sell_approval(0);
        await trasection_seller.wait();
        expect(await Escrow_deploy.approval(0, seller.address)).to.equal(true);

        const trasection_lender = await Escrow_deploy.connect(
          lender
        ).sell_approval(0);
        await trasection_lender.wait();
        expect(await Escrow_deploy.approval(0, lender.address)).to.equal(true);
      });
    });
  });
});
