const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Escrow", () => {
  it("Saves The addresses", async () => {
      const real_estate_compile = await ethers.getContractFactor("RealEstate"); 
      const real_estate_deply = await real_estate_compile.deploy();
      console.log("RealEstate deployed to:", real_estate_deply.address);
      

  });
});
