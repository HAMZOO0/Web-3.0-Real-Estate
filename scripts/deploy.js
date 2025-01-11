// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};
async function main() {
  // account setup
  const signers = await ethers.getSigners(); // get the signers what is signers
  buyer = signers[0];
  seller = signers[1];
  lender = signers[2];
  inspector = signers[3];

  const real_estate_compile = await ethers.getContractFactory("RealEstate");
  const real_estate_deploy = await real_estate_compile.deploy();

  console.log("RealEstate deployed to:", real_estate_deploy.address);

  await real_estate_deploy.deployed();

  console.log("RealEstate deployed to:", real_estate_deploy.address);
  console.log("Uploading 3 NFTS ... ");
  // -----------------------------------------------------
  // list the property
  for (let i = 1; i <= 3; i++) {
    const trasection = await real_estate_deploy
      .connect(seller)
      .mint(
        `https://amethyst-rare-eel-981.mypinata.cloud/ipfs/bafybeiaasw77a2r3jj7i5zetcdnu4o2du7w3geu3xj5ibcf2woz2tqvzku/${i}.json`
      );
    await trasection.wait();
  }
  //--------------------------------------------------------
  // escrow deploy
  Escrow_compile = await ethers.getContractFactory("Escrow");
  Escrow_deploy = await Escrow_compile.deploy(
    real_estate_deploy.address,
    seller.address,
    lender.address,
    inspector.address
  );

  console.log("Escrow deployed to:", Escrow_deploy.address);

  await Escrow_deploy.deployed();

  console.log("Escrow deployed to:", Escrow_deploy.address);
  //---------------------------------------------------------
  // send to escrow

  for (let nft_id = 0; nft_id < 3; nft_id++) {
    let trasection = await real_estate_deploy
      .connect(seller)
      .approve(Escrow_deploy.address, nft_id); // getting approval
    await trasection.wait();

    // sting the NFT in the Escrow contract so it can handle the sale.
    trasection = await Escrow_deploy.connect(seller).list(
      nft_id,
      buyer.address,
      tokens(10),
      tokens(5)
    );
    await trasection.wait();
  }

  //---------------------------------------------
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
