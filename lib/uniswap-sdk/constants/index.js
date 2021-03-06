"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var ERC20_json_1 = __importDefault(require("./abis/ERC20.json"));
var FACTORY_json_1 = __importDefault(require("./abis/FACTORY.json"));
var EXCHANGE_json_1 = __importDefault(require("./abis/EXCHANGE.json"));
exports.ETH = 'ETH';
var SUPPORTED_CHAIN_ID;
(function (SUPPORTED_CHAIN_ID) {
    SUPPORTED_CHAIN_ID[SUPPORTED_CHAIN_ID["Mainnet"] = 1] = "Mainnet";
    SUPPORTED_CHAIN_ID[SUPPORTED_CHAIN_ID["Ropsten"] = 3] = "Ropsten";
    SUPPORTED_CHAIN_ID[SUPPORTED_CHAIN_ID["Rinkeby"] = 4] = "Rinkeby";
    SUPPORTED_CHAIN_ID[SUPPORTED_CHAIN_ID["Kovan"] = 42] = "Kovan";
})(SUPPORTED_CHAIN_ID = exports.SUPPORTED_CHAIN_ID || (exports.SUPPORTED_CHAIN_ID = {}));
exports.FACTORY_ADDRESS = (_a = {},
    _a[SUPPORTED_CHAIN_ID.Mainnet] = '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
    _a[SUPPORTED_CHAIN_ID.Ropsten] = '0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351',
    _a[SUPPORTED_CHAIN_ID.Rinkeby] = '0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36',
    _a[SUPPORTED_CHAIN_ID.Kovan] = '0xD3E51Ef092B2845f10401a0159B2B96e8B6c3D30',
    _a);
exports.FACTORY_ABI = JSON.stringify(FACTORY_json_1.default);
exports.EXCHANGE_ABI = JSON.stringify(EXCHANGE_json_1.default);
var TRADE_TYPE;
(function (TRADE_TYPE) {
    TRADE_TYPE["ETH_TO_TOKEN"] = "ETH_TO_TOKEN";
    TRADE_TYPE["TOKEN_TO_ETH"] = "TOKEN_TO_ETH";
    TRADE_TYPE["TOKEN_TO_TOKEN"] = "TOKEN_TO_TOKEN";
})(TRADE_TYPE = exports.TRADE_TYPE || (exports.TRADE_TYPE = {}));
var TRADE_EXACT;
(function (TRADE_EXACT) {
    TRADE_EXACT["INPUT"] = "INPUT";
    TRADE_EXACT["OUTPUT"] = "OUTPUT";
})(TRADE_EXACT = exports.TRADE_EXACT || (exports.TRADE_EXACT = {}));
var TRADE_METHODS;
(function (TRADE_METHODS) {
    TRADE_METHODS["ethToTokenSwapInput"] = "ethToTokenSwapInput";
    TRADE_METHODS["ethToTokenTransferInput"] = "ethToTokenTransferInput";
    TRADE_METHODS["ethToTokenSwapOutput"] = "ethToTokenSwapOutput";
    TRADE_METHODS["ethToTokenTransferOutput"] = "ethToTokenTransferOutput";
    TRADE_METHODS["tokenToEthSwapInput"] = "tokenToEthSwapInput";
    TRADE_METHODS["tokenToEthTransferInput"] = "tokenToEthTransferInput";
    TRADE_METHODS["tokenToEthSwapOutput"] = "tokenToEthSwapOutput";
    TRADE_METHODS["tokenToEthTransferOutput"] = "tokenToEthTransferOutput";
    TRADE_METHODS["tokenToTokenSwapInput"] = "tokenToTokenSwapInput";
    TRADE_METHODS["tokenToTokenTransferInput"] = "tokenToTokenTransferInput";
    TRADE_METHODS["tokenToTokenSwapOutput"] = "tokenToTokenSwapOutput";
    TRADE_METHODS["tokenToTokenTransferOutput"] = "tokenToTokenTransferOutput";
})(TRADE_METHODS = exports.TRADE_METHODS || (exports.TRADE_METHODS = {}));
exports.TRADE_METHOD_IDS = (_b = {},
    _b[TRADE_METHODS.ethToTokenSwapInput] = '0xf39b5b9b',
    _b[TRADE_METHODS.ethToTokenTransferInput] = '0xad65d76d',
    _b[TRADE_METHODS.ethToTokenSwapOutput] = '0x6b1d4db7',
    _b[TRADE_METHODS.ethToTokenTransferOutput] = '0x0b573638',
    _b[TRADE_METHODS.tokenToEthSwapInput] = '0x95e3c50b',
    _b[TRADE_METHODS.tokenToEthTransferInput] = '0x7237e031',
    _b[TRADE_METHODS.tokenToEthSwapOutput] = '0x013efd8b',
    _b[TRADE_METHODS.tokenToEthTransferOutput] = '0xd4e4841d',
    _b[TRADE_METHODS.tokenToTokenSwapInput] = '0xddf7e1a7',
    _b[TRADE_METHODS.tokenToTokenTransferInput] = '0xf552d91b',
    _b[TRADE_METHODS.tokenToTokenSwapOutput] = '0xb040d545',
    _b[TRADE_METHODS.tokenToTokenTransferOutput] = '0xf3c0efe9',
    _b);
var FIXED_UNDERFLOW_BEHAVIOR;
(function (FIXED_UNDERFLOW_BEHAVIOR) {
    FIXED_UNDERFLOW_BEHAVIOR["ZERO"] = "ZERO";
    FIXED_UNDERFLOW_BEHAVIOR["LESS_THAN"] = "LESS_THAN";
    FIXED_UNDERFLOW_BEHAVIOR["ONE_DIGIT"] = "ONE_DIGIT";
})(FIXED_UNDERFLOW_BEHAVIOR = exports.FIXED_UNDERFLOW_BEHAVIOR || (exports.FIXED_UNDERFLOW_BEHAVIOR = {}));
exports._MAX_DECIMAL_PLACES = 18;
exports._ROUNDING_MODE = bignumber_js_1.default.ROUND_HALF_UP;
bignumber_js_1.default.set({ DECIMAL_PLACES: exports._MAX_DECIMAL_PLACES, ROUNDING_MODE: exports._ROUNDING_MODE });
exports._0 = new bignumber_js_1.default('0');
exports._1 = new bignumber_js_1.default('1');
exports._10 = new bignumber_js_1.default('10');
exports._997 = new bignumber_js_1.default('997');
exports._1000 = new bignumber_js_1.default('1000');
exports._10000 = new bignumber_js_1.default('10000');
exports._MAX_UINT8 = 255;
exports._MAX_UINT256 = new bignumber_js_1.default('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
exports._CHAIN_ID_NAME = (_c = {},
    _c[SUPPORTED_CHAIN_ID.Mainnet] = 'homestead',
    _c[SUPPORTED_CHAIN_ID.Ropsten] = 'ropsten',
    _c[SUPPORTED_CHAIN_ID.Rinkeby] = 'rinkeby',
    _c[SUPPORTED_CHAIN_ID.Kovan] = 'kovan',
    _c);
exports._ERC20_ABI = JSON.stringify(ERC20_json_1.default);
//# sourceMappingURL=index.js.map