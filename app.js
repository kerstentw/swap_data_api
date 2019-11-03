const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
//const socketHandler = require('./src/websocketHandler/AaveSocketHandler.js').AaveSocketHandler;
const Web3 = require("web3");
const uniswap_sdk = require('./lib/uniswap-sdk');


//socket = new socketHandler()

//const AAVE_SOCKET_URL = "wss://dlp-api-dev.testing.aave.com/graphql"

const TOKEN_LISTING = ['ETH', 'DAI', 'USDC', 'SUSD', 'TUSD', 'USDT', 'AMPL', 'BAT', 'KNC', 'LEND', 'LINK', 'MANA', 'MKR', 'REP', 'WBTC', 'ZRX']

TOKEN_MAINNET_ADDRS = {'ZRX':   '0xe41d2489571d322189246dafa5ebde1f4699f498',
                       'KNC':   '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
                       'LEND':  '0x80fb784b7ed66730e8b1dbd9820afd29931aab03',
                       'MANA':  '0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
                       'MKR':   '0xc66ea802717bfb9833400264dd12c2bceaa34a6d',
                       'REP':   '0xe94327d07fc17907b4db788e5adf2ed424addff6',
                       'BAT':   '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
                       'DAI':   '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
                       'LINK':  '0x514910771af9ca656af840dff83e8264ecf986ca',
                       'SUSD' : '0x57Ab1E02fEE23774580C119740129eAC7081e9D3',
                       'USDC' : '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
                       'WBTC' : '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
                       'TUSD' : '0x0000000000085d4780B73119b644AE5ecd22b376',
                       'USDT' : '0xdac17f958d2ee523a2206206994597c13d831ec7',
                       'AMPL' : '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
                       'ETH' :  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
                        }

const A_TOKEN_MAPS = {
  "0x436264Ac032f7f271934Fa920dcD655210193090"  : "ETH"  ,
  "0x8Ac14CE57A87A07A2F13c1797EfEEE8C0F8F571A"  : "DAI"  ,
  "0x20AD264D06f0Cf265054589577c8c2297C26B6C4"  : "USDC" ,
  "0x5537e2b41E6a1e6f72e28B93c48D9EA11caa5A94"  : "SUSD" ,
  "0x3BE8B64104de5b809AAd0eC4514C97A58878eE14"  : "TUSD" ,
  "0xD0F559C8ed680e5666Acb7CB068a6964ee05122c"  : "USDT" ,
  "0xdE460f92901185d24090BcF6cAc3B37308b2b98A"  : "AMPL" ,
  "0xEAe6283C6A1EB7E29CA9A4B3F049C894DA7216c1"  : "BAT"  ,
  "0x67F548FC6831222b8565eA69589fd7dc56d2C3Ba"  : "KNC"  ,
  "0x538e2C4Fc148f5483fDbb4f24A042B76111F3114"  : "LEND" ,
  "0x7d2a39c2A3a74d7570f487E203230D3aC00cea80"  : "LINK" ,
  "0xaAc40ceEf68B662643fB9ec641E11a40b7c90B0a"  : "MANA" ,
  "0x0697A93267f6c656023F8a5b489435591b849698"  : "MKR"  ,
  "0xA46d949aB1fc89c33C5CD8163482Eb84BE0A9a8c"  : "REP"  ,
  "0xf065FD0972a98D9F1c01AB3EE2D4efbbbb5bD1F7"  : "WBTC" ,
  "0x3b9743C458ae58c30069D14e98A2745aD3982480" :  "ZRX"
}

const RESERVES =  [ '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD',
  '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e',
  '0xe22da380ee6B445bb8273C81944ADEB6E8450422',
  '0x13512979ADE267AB5100878E2e0f485B568328a4',
  '0xD868790F57B39C9B2B51b12de046975f986675f9',
  '0x1BCe8A0757B7315b74bA1C7A731197295ca4747a',
  '0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738',
  '0x804C0B38593796bD44126102C8b5e827Cf389D80',
  '0xAD5ce863aE3E4E9394Ab43d4ba0D80f419F61789',
  '0x3b92f58feD223E2cB1bCe4c286BD97e42f2A12EA',
  '0xd2eC3a70EF3275459f5c7a1d5930E9024bA3c4f3',
  '0x3F80c39c0b96A0945f9F0E9f55d8A8891c5671A8',
  '0x260071C8D61DAf730758f8BD0d6370353956AE0E',
  '0x61e4CAE3DA7FD189e52a4879C7B8067D7C2Cc0FA',
  '0x738Dc6380157429e957d223e6333Dc385c85Fec7',
  '0xD0d76886cF8D952ca26177EB7CfDf83bad08C00C' ]

AAVE_LPC_ABI = [{"constant":true,"inputs":[],"name":"addressesProvider","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_addressesProvider","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_reserve","type":"address"},{"indexed":true,"name":"_user","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":true,"name":"_referral","type":"uint16"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_reserve","type":"address"},{"indexed":true,"name":"_user","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"RedeemUnderlying","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_reserve","type":"address"},{"indexed":true,"name":"_user","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":true,"name":"_referral","type":"uint16"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"Borrow","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_reserve","type":"address"},{"indexed":true,"name":"_user","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"Repay","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_collateral","type":"address"},{"indexed":true,"name":"_user","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":true,"name":"_reserve","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"LiquidationCall","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_reserve","type":"address"},{"indexed":true,"name":"_user","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_target","type":"address"},{"indexed":true,"name":"_reserve","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":false,"name":"_fee","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"FlashLoan","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_reserve","type":"address"},{"indexed":true,"name":"_user","type":"address"}],"name":"ReserveUsedAsCollateralEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_reserve","type":"address"},{"indexed":true,"name":"_user","type":"address"}],"name":"ReserveUsedAsCollateralDisabled","type":"event"},{"constant":false,"inputs":[{"name":"_reserve","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_referralCode","type":"uint16"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_reserve","type":"address"},{"name":"_user","type":"address"},{"name":"_amount","type":"uint256"}],"name":"redeemUnderlying","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_reserve","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_interestRateMode","type":"uint256"},{"name":"_referralCode","type":"uint16"}],"name":"borrow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_reserve","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_onBehalfOf","type":"address"}],"name":"repay","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_reserve","type":"address"}],"name":"swapBorrowRateMode","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_reserve","type":"address"},{"name":"_user","type":"address"}],"name":"rebalanceFixedBorrowRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_reserve","type":"address"},{"name":"_useAsCollateral","type":"bool"}],"name":"setUserUseReserveAsCollateral","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_collateral","type":"address"},{"name":"_reserve","type":"address"},{"name":"_user","type":"address"},{"name":"_purchaseAmount","type":"uint256"},{"name":"_receiveAToken","type":"bool"}],"name":"liquidationCall","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_receiver","type":"address"},{"name":"_reserve","type":"address"},{"name":"_amount","type":"uint256"}],"name":"flashLoan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_reserve","type":"address"}],"name":"getReserveConfigurationData","outputs":[{"name":"ltv","type":"uint256"},{"name":"liquidationThreshold","type":"uint256"},{"name":"liquidationDiscount","type":"uint256"},{"name":"interestRateStrategyAddress","type":"address"},{"name":"usageAsCollateralEnabled","type":"bool"},{"name":"borrowingEnabled","type":"bool"},{"name":"fixedBorrowRateEnabled","type":"bool"},{"name":"isActive","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_reserve","type":"address"}],"name":"getReserveData","outputs":[{"name":"totalLiquidity","type":"uint256"},{"name":"availableLiquidity","type":"uint256"},{"name":"totalBorrowsFixed","type":"uint256"},{"name":"totalBorrowsVariable","type":"uint256"},{"name":"liquidityRate","type":"uint256"},{"name":"variableBorrowRate","type":"uint256"},{"name":"fixedBorrowRate","type":"uint256"},{"name":"averageFixedBorrowRate","type":"uint256"},{"name":"utilizationRate","type":"uint256"},{"name":"liquidityIndex","type":"uint256"},{"name":"variableBorrowIndex","type":"uint256"},{"name":"aTokenAddress","type":"address"},{"name":"lastUpdateTimestamp","type":"uint40"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_user","type":"address"}],"name":"getUserAccountData","outputs":[{"name":"totalLiquidityETH","type":"uint256"},{"name":"totalCollateralETH","type":"uint256"},{"name":"totalBorrowsETH","type":"uint256"},{"name":"availableBorrowsETH","type":"uint256"},{"name":"currentLiquidationThreshold","type":"uint256"},{"name":"ltv","type":"uint256"},{"name":"healthFactor","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_reserve","type":"address"},{"name":"_user","type":"address"}],"name":"getUserReserveData","outputs":[{"name":"currentATokenBalance","type":"uint256"},{"name":"currentUnderlyingBalance","type":"uint256"},{"name":"currentBorrowBalance","type":"uint256"},{"name":"principalBorrowBalance","type":"uint256"},{"name":"borrowRateMode","type":"uint256"},{"name":"borrowRate","type":"uint256"},{"name":"liquidityRate","type":"uint256"},{"name":"originationFee","type":"uint256"},{"name":"variableBorrowIndex","type":"uint256"},{"name":"lastUpdateTimestamp","type":"uint256"},{"name":"usageAsCollateralEnabled","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"}]

const MAINNET_PROVIDER  = "mainnet.infura.io/v3/d2bda2c2e7d0463ab1dd077566fb2e3f";
const KOVAN_PROVIDER = "https://kovan.infura.io/v3/27f94aaf0b9b468fae7c869394b23ed0";
const AAVE_LPC_ADDR = "0xB36017F5aafDE1a9462959f0e53866433D373404";
const DAI_KOVAN = "0xc4375b7de8af5a38a93548eb8453a498222c4ff2"

web3 = new Web3(KOVAN_PROVIDER);

dotenv.config()

app = express();

app.use(cors());

app.get("/", (req,res)=>{
  res.send("up");
})


app.get("/get_aave_apr", async (req, res)=>{
    let options = {address: AAVE_LPC_ADDR}

    let aave_lpc_addr = new web3.eth.Contract(AAVE_LPC_ABI,AAVE_LPC_ADDR);
      aprs = new Array

      for (let i = 0; i < RESERVES.length; i++) {
        let n = await getAPRFromContract(RESERVES[i], aave_lpc_addr.methods.getReserveData);
        n.abbr = A_TOKEN_MAPS[n.aTokenAddress]
        aprs.push(n)
      }

      res.send(aprs)
})

app.get("/get_reserves", (req, res)=>{
  res.send({data: RESERVES});
})

app.get("/get_uniswap_liquidity")

app.listen(process.env.PORT);


// HELPERS


async function getAPRFromContract(_address, _contract){
  let v = await _contract(_address).call();
  console.log("DATA FROM: ",v)
  return v;
}
