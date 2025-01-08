const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe('Escrow', () => {
  it("Saves The addresses", async () => {
      const real_estate_compile = await ethers.getContractFactory("RealEstate"); 
      const real_estate_deploy = await real_estate_compile.deploy("RealEstateToken", "RET" , );
      console.log("RealEstate deployed to:", real_estate_deploy);
      

  });
});
