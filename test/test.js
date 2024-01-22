const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("listItem", function () {
  it("Emits an event after listing an item", async function () {
    const PRICE = "100000000000000000";
    const TOKEN_ID = 0;

    const nftMarketplace = await hre.ethers.deployContract("NftMarketplace");
    await (await nftMarketplace).waitForDeployment();

    const basicNft = await hre.ethers.deployContract("NftMarketplace");
    await (await basicNft).waitForDeployment();

    await (await basicNft).mintNft();
    await basicNft.approve(await (await nftMarketplace).getAddress(), TOKEN_ID);
    expect(
      await (
        await nftMarketplace
      ).listItem(await (await basicNft).getAddress(), TOKEN_ID, PRICE)
    ).to.emit("ItemListed");
  });
  it("Exclusively items that haven't been listed", async function () {
    await nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE);
    const error = `AlreadyListed("${basicNft.address}", ${TOKEN_ID})`;
    await expect(
      nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE)
    ).to.be.revertedWith(error);
  });
  it("Exclusively allows owners to list", async function () {
    nftMarketplace = nftMarketplaceContract.connect(user);
    await basicNft.approve(user.address, TOKEN_ID);
    await expect(
      nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE)
    ).to.be.revertedWith("NotOwner");
  });
  it("Needs approvals to list item", async function () {
    await basicNft.approve(ethers.constants.AddressZero, TOKEN_ID);
    await expect(
      nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE)
    ).to.be.revertedWith("NotApprovedForMarketplace");
  });
  it("Updates listing with seller and price", async function () {
    await nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE);
    const listing = await nftMarketplace.getListing(basicNft.address, TOKEN_ID);
    expect(listing.price).to.equal(PRICE);
    expect(listing.seller).to.equal(deployer.address);
  });
  it("Reverts if the price be 0", async () => {
    const ZERO_PRICE = "0";
    await expect(
      nftMarketplace.listItem(basicNft.address, TOKEN_ID, ZERO_PRICE)
    ).to.be.revertedWith("PriceMustBeAboveZero");
  });
});
