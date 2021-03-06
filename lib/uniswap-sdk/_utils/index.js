"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var ethers_1 = require("ethers");
var constants_1 = require("../constants");
function ensureUInt8(number) {
    if (!Number.isInteger(number) || number < 0 || number > constants_1._MAX_UINT8) {
        throw Error("Passed number '" + number + "' is not a valid uint8.");
    }
}
function ensureAllUInt8(numbers) {
    numbers.forEach(ensureUInt8);
}
exports.ensureAllUInt8 = ensureAllUInt8;
function ensureUInt256(bigNumber) {
    if (!bigNumber.isInteger() || bigNumber.isLessThan(constants_1._0) || bigNumber.isGreaterThan(constants_1._MAX_UINT256)) {
        throw Error("Passed bigNumber '" + bigNumber + "' is not a valid uint256.");
    }
}
function ensureAllUInt256(bigNumbers) {
    bigNumbers.forEach(ensureUInt256);
}
exports.ensureAllUInt256 = ensureAllUInt256;
function ensureBoundedInteger(number, bounds) {
    var _a = typeof bounds === 'number' ? [0, bounds] : [bounds[0], bounds[1]], minimum = _a[0], maximum = _a[1];
    if (!Number.isInteger(number) || number < minimum || number > maximum) {
        throw Error("Passed number '" + number + "' is not an integer between '" + minimum + "' and '" + maximum + "' (inclusive).");
    }
}
exports.ensureBoundedInteger = ensureBoundedInteger;
function normalizeBigNumberish(bigNumberish) {
    var bigNumber = bignumber_js_1.default.isBigNumber(bigNumberish)
        ? bigNumberish
        : new bignumber_js_1.default(bigNumberish.toString());
    if (!bigNumber.isFinite()) {
        throw Error("Passed bigNumberish '" + bigNumberish + "' of type '" + typeof bigNumberish + "' is not valid.");
    }
    return bigNumber;
}
exports.normalizeBigNumberish = normalizeBigNumberish;
function normalizeAddress(address) {
    return ethers_1.ethers.utils.getAddress(address.toLowerCase());
}
exports.normalizeAddress = normalizeAddress;
function getEthToken(chainId) {
    return __assign(__assign({}, (chainId ? { chainId: chainId } : {})), { address: constants_1.ETH, decimals: 18 });
}
exports.getEthToken = getEthToken;
//# sourceMappingURL=index.js.map