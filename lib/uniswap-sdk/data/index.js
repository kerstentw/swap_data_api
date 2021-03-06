"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var types_1 = require("../types");
var constants_1 = require("../constants");
var _utils_1 = require("../_utils");
function getContract(address, ABI, provider) {
    return new ethers_1.ethers.Contract(address, ABI, provider);
}
function getChainIdAndProvider(chainIdOrProvider) {
    return __awaiter(this, void 0, void 0, function () {
        var provider, chainId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!types_1.isChainId(chainIdOrProvider)) return [3, 1];
                    return [2, {
                            chainId: chainIdOrProvider,
                            provider: ethers_1.ethers.getDefaultProvider(constants_1._CHAIN_ID_NAME[chainIdOrProvider])
                        }];
                case 1:
                    provider = types_1.isLowLevelProvider(chainIdOrProvider)
                        ? new ethers_1.ethers.providers.Web3Provider(chainIdOrProvider)
                        : chainIdOrProvider;
                    return [4, provider.getNetwork()];
                case 2:
                    chainId = (_a.sent()).chainId;
                    if (!(chainId in constants_1.SUPPORTED_CHAIN_ID)) {
                        throw Error("chainId " + chainId + " is not valid.");
                    }
                    return [2, {
                            chainId: chainId,
                            provider: provider
                        }];
            }
        });
    });
}
function getToken(tokenAddress, chainIdAndProvider) {
    return __awaiter(this, void 0, void 0, function () {
        var ERC20Contract, decimals;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(tokenAddress === constants_1.ETH)) return [3, 1];
                    return [2, _utils_1.getEthToken(chainIdAndProvider.chainId)];
                case 1:
                    ERC20Contract = getContract(tokenAddress, constants_1._ERC20_ABI, chainIdAndProvider.provider);
                    return [4, ERC20Contract.decimals()];
                case 2:
                    decimals = _a.sent();
                    return [2, {
                            chainId: chainIdAndProvider.chainId,
                            address: ERC20Contract.address,
                            decimals: decimals
                        }];
            }
        });
    });
}
function getTokenReserves(tokenAddress, chainIdOrProvider) {
    if (chainIdOrProvider === void 0) { chainIdOrProvider = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var normalizedTokenAddress, chainIdAndProvider, ethTokenPromise, tokenPromise, factoryContract, tokenContract, exchangeAddress, exchangeTokenPromise, ethBalancePromise, tokenBalancePromise, _a, ethToken, token, exchangeToken, ethBalance, tokenBalance, ethReserve, tokenReserve;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    normalizedTokenAddress = _utils_1.normalizeAddress(tokenAddress);
                    return [4, getChainIdAndProvider(chainIdOrProvider)];
                case 1:
                    chainIdAndProvider = _b.sent();
                    ethTokenPromise = getToken(constants_1.ETH, chainIdAndProvider);
                    tokenPromise = getToken(normalizedTokenAddress, chainIdAndProvider);
                    factoryContract = getContract(constants_1.FACTORY_ADDRESS[chainIdAndProvider.chainId], constants_1.FACTORY_ABI, chainIdAndProvider.provider);
                    tokenContract = getContract(normalizedTokenAddress, constants_1._ERC20_ABI, chainIdAndProvider.provider);
                    return [4, factoryContract.getExchange(normalizedTokenAddress)];
                case 2:
                    exchangeAddress = _b.sent();
                    exchangeTokenPromise = getToken(exchangeAddress, chainIdAndProvider);
                    ethBalancePromise = chainIdAndProvider.provider.getBalance(exchangeAddress);
                    tokenBalancePromise = tokenContract.balanceOf(exchangeAddress);
                    return [4, Promise.all([ethTokenPromise, tokenPromise, exchangeTokenPromise, ethBalancePromise, tokenBalancePromise])];
                case 3:
                    _a = _b.sent(), ethToken = _a[0], token = _a[1], exchangeToken = _a[2], ethBalance = _a[3], tokenBalance = _a[4];
                    ethReserve = { token: ethToken, amount: _utils_1.normalizeBigNumberish(ethBalance) };
                    tokenReserve = { token: token, amount: _utils_1.normalizeBigNumberish(tokenBalance) };
                    return [2, { token: token, exchange: exchangeToken, ethReserve: ethReserve, tokenReserve: tokenReserve }];
            }
        });
    });
}
exports.getTokenReserves = getTokenReserves;
//# sourceMappingURL=index.js.map