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
    // runs before all tests in this block
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
      console.log("Trasection Hash:", trasection.hash);
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
  });

  // here we test all address
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
});
