import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { providers } from "ethers";

async function main() {
  //uniswap router address
  const ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  //dai token address
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  //uni token address
  const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  //holder address
  const Holder = "0x748dE14197922c4Ae258c7939C7739f3ff1db573";

  const time = 1677628799;

  

  const Uniswap = await ethers.getContractAt("IUniswap", ROUTER);
 //Impersonating
  const helpers = require("@nomicfoundation/hardhat-network-helpers");
  await helpers.impersonateAccount(Holder);
  const impersonatedSigner = await ethers.getSigner(Holder);

  const DaiContract = await ethers.getContractAt("IToken", DAI);

  const UniContract = await ethers.getContractAt("IToken", UNI);

  const holderBalance = await DaiContract.balanceOf(Holder);
  console.log(`Dai balance before ${holderBalance}`);

  const holderBalance1 = await UniContract.balanceOf(Holder);
  console.log(`Uni balance before ${holderBalance1}`);

//Approving for Func AddLiquidity

const amountADesired = await ethers.utils.parseEther("100");
  console.log(amountADesired);

const amountBDesired = await ethers.utils.parseEther("100");
  console.log(amountBDesired);

await DaiContract.connect(impersonatedSigner).approve(ROUTER, amountADesired);
await UniContract.connect(impersonatedSigner).approve(ROUTER, amountBDesired);

const Liquidity = await Uniswap.connect(impersonatedSigner).addLiquidity(
    UNI,
    DAI,
    amountADesired,
    amountBDesired,
    0,
    0,
    Holder,
    time
  );
  console.log(`Liquidity is ${Liquidity}`);
  const holderDaiBalanceAfter = await DaiContract.balanceOf(Holder);
  console.log(`Dai balance After ${holderDaiBalanceAfter}`);

  const holderUniBalanceAfter = await UniContract.balanceOf(Holder);
  console.log(`Uni balance After ${holderUniBalanceAfter}`);

  const amountA = Number(holderBalance) - Number(holderDaiBalanceAfter);
  console.log(`amountA is ${amountA}`);

  const amountB = Number(holderBalance1) - Number(holderUniBalanceAfter);
  console.log(`amountB is ${amountB}`);
  

//Approving for Func AddLiquidityETH

const ETHbalanceBefore = await ethers.provider.getBalance(Holder);
  console.log(`ETHBalance before ${ETHbalanceBefore}`);

  const min = ethers.utils.parseEther("0.9");
  console.log(`min is ${min}`);

//1 739 056 314 797 772 521 061
//10 000 000 000 000 000

//15 110 085 000 000 000 000 000 000
const amountTokenDesired = await ethers.utils.parseEther("80");
const amountTokenMin = await ethers.utils.parseEther("70");
  console.log(amountTokenMin);
  await DaiContract.connect(impersonatedSigner).approve(ROUTER, amountTokenDesired)
  await Uniswap.connect(impersonatedSigner).addLiquidityETH(
    DAI,
    amountTokenDesired,
    amountTokenMin,
    0,
    Holder,
    time,
    {
        value: min,
      }
  );

  const ETHbalanceAfter = await ethers.provider.getBalance(Holder);
  console.log(`ETHBalance After ${ETHbalanceAfter}`);

  const amountETH = Number(ETHbalanceBefore) - Number(min);
  console.log(`amountETH is ${amountETH}`);



  //Approving for Func removeLiquidity


  //get liquidity pair
  //const uniswapFac = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
  const pairAddress = "0xf00e80f0DE9aEa0B33aA229a4014572777E422EE";

  const paired = await ethers.getContractAt("IUniswapV2Pair", pairAddress);
 
  const getAddressBal = await paired.balanceOf(impersonatedSigner.address);
  console.log(`balanceOf pairAddress is ${getAddressBal}`);
  
  const amountApprove = ethers.utils.parseEther("120");
  
  await paired.connect(impersonatedSigner).approve(ROUTER, amountApprove);
  await Uniswap.connect(impersonatedSigner).removeLiquidity(
     UNI,
     DAI,
     getAddressBal,
     0,
     0,
     Holder,
     time,
  );


















  
}




main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});