const WebSocket = require("ws");


function  AaveSocketHandler( _res) {

  const AAVE_SOCKET_URL = "wss://echo.websocket.org/"





  let __broadcastInit = (ws) => {


    let init_msg = {"type":"connection_init","payload":{}};
    let pack_msg = {"id":"1","type":"start","payload":{"variables":{},"extensions":{},"operationName":"Reserves","query":"query Reserves {\n  reserves {\n    ...ReserveDataFragment\n    __typename\n  }\n  ethUsdPrice\n}\n\nfragment ReserveDataFragment on ReserveModel {\n  address\n  name\n  symbol\n  uiColor\n  decimals\n  isActive\n  usageAsCollateralEnabled\n  borrowingEnabled\n  fixedBorrowRateEnabled\n  baseLTVasCollateral\n  liquidityIndex\n  aTokenInitialExchangeRate\n  reserveLiquidationThreshold\n  variableBorrowIndex\n  aTokenAddress\n  availableLiquidity\n  fixedBorrowRate\n  liquidityRate\n  totalBorrows\n  totalBorrowsFixed\n  totalBorrowsVariable\n  totalLiquidity\n  utilizationRate\n  variableBorrowRate\n  priceInEth\n  liquidityIndex\n  aTokenInitialExchangeRate\n  lastUpdateTimestamp\n  currencyType\n  __typename\n}\n"}}

    //ws.send(JSON.stringify(init_msg));

    ws.on("message", (msg) => {
      console.log("MSG: ", msg)
      _res.send(msg);
    })

  }

  let mountListener = () => {
    const wss = new WebSocket(AAVE_SOCKET_URL);
    wss.on('connection', __broadcastInit);
  }

  return {
    mountListener: mountListener
  }

}


module.exports = {
  AaveSocketHandler: AaveSocketHandler
}
