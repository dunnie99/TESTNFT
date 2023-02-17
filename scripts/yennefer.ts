import { ethers } from "hardhat";


async function main() {
    const [owner] = await ethers.getSigners();

  //deploy nft token
  const YNFnft = await ethers.getContractFactory("YNFNFT");
  const ynfNftToken = await YNFnft.deploy();
  await ynfNftToken.deployed();

  const csrNftTokenaddress = ynfNftToken.address;

  console.log(`YenneferNFT Token deployed to ${csrNftTokenaddress}`);
  const YENNEFER = await ynfNftToken.safeMint(owner.address,6496, "QmdzDfQH5q7ViXGq7QMRBHLpoC8wGfHEFm4bBsD29hW5yS" );
  console.log(YENNEFER);

///@info log nft details
  const YNFDetails = await (await YENNEFER.wait()).events[0].args[2];

  console.log(YNFDetails);

  //// this is the CID..... QmdzDfQH5q7ViXGq7QMRBHLpoC8wGfHEFm4bBsD29hW5yS

  




}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});