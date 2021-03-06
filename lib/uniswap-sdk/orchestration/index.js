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
var constants_1 = require("../constants");
var data_1 = require("../data");
var computation_1 = require("../computation");
function tradeExactEthForTokensWithData(reserves, ethAmount) {
    var marketDetails = computation_1.getMarketDetails(undefined, reserves);
    return computation_1.getTradeDetails(constants_1.TRADE_EXACT.INPUT, ethAmount, marketDetails);
}
exports.tradeExactEthForTokensWithData = tradeExactEthForTokensWithData;
function tradeExactEthForTokens(tokenAddress, ethAmount, chainIdOrProvider) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenReserves;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, data_1.getTokenReserves(tokenAddress, chainIdOrProvider)];
                case 1:
                    tokenReserves = _a.sent();
                    return [2, tradeExactEthForTokensWithData(tokenReserves, ethAmount)];
            }
        });
    });
}
exports.tradeExactEthForTokens = tradeExactEthForTokens;
function tradeEthForExactTokensWithData(reserves, tokenAmount) {
    var marketDetails = computation_1.getMarketDetails(undefined, reserves);
    return computation_1.getTradeDetails(constants_1.TRADE_EXACT.OUTPUT, tokenAmount, marketDetails);
}
exports.tradeEthForExactTokensWithData = tradeEthForExactTokensWithData;
function tradeEthForExactTokens(tokenAddress, tokenAmount, chainIdOrProvider) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenReserves;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, data_1.getTokenReserves(tokenAddress, chainIdOrProvider)];
                case 1:
                    tokenReserves = _a.sent();
                    return [2, tradeEthForExactTokensWithData(tokenReserves, tokenAmount)];
            }
        });
    });
}
exports.tradeEthForExactTokens = tradeEthForExactTokens;
function tradeExactTokensForEthWithData(reserves, tokenAmount) {
    var marketDetails = computation_1.getMarketDetails(reserves, undefined);
    return computation_1.getTradeDetails(constants_1.TRADE_EXACT.INPUT, tokenAmount, marketDetails);
}
exports.tradeExactTokensForEthWithData = tradeExactTokensForEthWithData;
function tradeExactTokensForEth(tokenAddress, tokenAmount, chainIdOrProvider) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenReserves;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, data_1.getTokenReserves(tokenAddress, chainIdOrProvider)];
                case 1:
                    tokenReserves = _a.sent();
                    return [2, tradeExactTokensForEthWithData(tokenReserves, tokenAmount)];
            }
        });
    });
}
exports.tradeExactTokensForEth = tradeExactTokensForEth;
function tradeTokensForExactEthWithData(reserves, ethAmount) {
    var marketDetails = computation_1.getMarketDetails(reserves, undefined);
    return computation_1.getTradeDetails(constants_1.TRADE_EXACT.OUTPUT, ethAmount, marketDetails);
}
exports.tradeTokensForExactEthWithData = tradeTokensForExactEthWithData;
function tradeTokensForExactEth(tokenAddress, ethAmount, chainIdOrProvider) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenReserves;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, data_1.getTokenReserves(tokenAddress, chainIdOrProvider)];
                case 1:
                    tokenReserves = _a.sent();
                    return [2, tradeTokensForExactEthWithData(tokenReserves, ethAmount)];
            }
        });
    });
}
exports.tradeTokensForExactEth = tradeTokensForExactEth;
function tradeExactTokensForTokensWithData(reservesInput, reservesOutput, tokenAmount) {
    var marketDetails = computation_1.getMarketDetails(reservesInput, reservesOutput);
    return computation_1.getTradeDetails(constants_1.TRADE_EXACT.INPUT, tokenAmount, marketDetails);
}
exports.tradeExactTokensForTokensWithData = tradeExactTokensForTokensWithData;
function tradeExactTokensForTokens(tokenAddressInput, tokenAddressOutput, tokenAmount, chainIdOrProvider) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenReservesInput, tokenReservesOutput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, data_1.getTokenReserves(tokenAddressInput, chainIdOrProvider)];
                case 1:
                    tokenReservesInput = _a.sent();
                    return [4, data_1.getTokenReserves(tokenAddressOutput, chainIdOrProvider)];
                case 2:
                    tokenReservesOutput = _a.sent();
                    return [2, tradeExactTokensForTokensWithData(tokenReservesInput, tokenReservesOutput, tokenAmount)];
            }
        });
    });
}
exports.tradeExactTokensForTokens = tradeExactTokensForTokens;
function tradeTokensForExactTokensWithData(reservesInput, reservesOutput, tokenAmount) {
    var marketDetails = computation_1.getMarketDetails(reservesInput, reservesOutput);
    return computation_1.getTradeDetails(constants_1.TRADE_EXACT.OUTPUT, tokenAmount, marketDetails);
}
exports.tradeTokensForExactTokensWithData = tradeTokensForExactTokensWithData;
function tradeTokensForExactTokens(tokenAddressInput, tokenAddressOutput, tokenAmount, chainIdOrProvider) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenReservesInput, tokenReservesOutput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, data_1.getTokenReserves(tokenAddressInput, chainIdOrProvider)];
                case 1:
                    tokenReservesInput = _a.sent();
                    return [4, data_1.getTokenReserves(tokenAddressOutput, chainIdOrProvider)];
                case 2:
                    tokenReservesOutput = _a.sent();
                    return [2, tradeTokensForExactTokensWithData(tokenReservesInput, tokenReservesOutput, tokenAmount)];
            }
        });
    });
}
exports.tradeTokensForExactTokens = tradeTokensForExactTokens;
//# sourceMappingURL=index.js.map