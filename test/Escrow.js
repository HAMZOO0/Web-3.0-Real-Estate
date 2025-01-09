const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Escrow", () => {
  // deploy the Reastate contract
  it("Saves The addresses", async () => {
    const signers = await ethers.getSigners(); // get the signers what is signers
    // console.log(signers); // get the addresses of the signers\
    const buyer = signers[0];
    const seller = signers[1];
    const lender = signers[2];
    const inspector = signers[3];

    const real_estate_compile = await ethers.getContractFactory("RealEstate");
    const real_estate_deploy = await real_estate_compile.deploy();
    console.log("RealEstate deployed to:", real_estate_deploy.address);

    const trasection = await real_estate_deploy
      .connect(seller)
      .mint(
        "https://amethyst-rare-eel-981.mypinata.cloud/ipfs/QmfSHSg1xzt7jvCBQXDQZ3mc4JZCmKVgSXdrfTxXiovLW4"
      );

    console.log("Trasection Hash:", trasection.hash);

    const Escrow_compile = await ethers.getContractFactory("Escrow");
    const Escrow_deploy = await Escrow_compile.deploy(
      real_estate_deploy.address,
      seller.address,
      lender.address,
      inspector.address,
    );
    console.log("Escrow deployed to:", Escrow_deploy.address);

    const nft_address =  await Escrow_deploy.nft_address();
    
    console.log("NFT Address:", nft_address);
    
    expect(nft_address).to.equal(real_estate_deploy.address);

  });

});
