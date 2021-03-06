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
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var constants_1 = require("../constants");
var _utils_1 = require("../_utils");
var _utils_2 = require("./_utils");
function normalizeTokenAmount(tokenAmount) {
    _utils_1.ensureAllUInt8([tokenAmount.token.decimals]);
    var normalizedAmount = _utils_1.normalizeBigNumberish(tokenAmount.amount);
    _utils_1.ensureAllUInt256([normalizedAmount]);
    return {
        token: __assign({}, tokenAmount.token),
        amount: normalizedAmount
    };
}
function normalizeTokenReserves(tokenReserves) {
    _utils_1.ensureAllUInt8([tokenReserves.token.decimals]);
    return __assign(__assign({ token: __assign({}, tokenReserves.token) }, (tokenReserves.exchange ? { exchange: __assign({}, tokenReserves.exchange) } : {})), { ethReserve: normalizeTokenAmount(tokenReserves.ethReserve), tokenReserve: normalizeTokenAmount(tokenReserves.tokenReserve) });
}
function parseOptionalReserves(optionalReservesInput, optionalReservesOutput) {
    if (types_1.areTokenReserves(optionalReservesInput) && types_1.areTokenReserves(optionalReservesOutput)) {
        return {
            tradeType: constants_1.TRADE_TYPE.TOKEN_TO_TOKEN,
            inputReserves: normalizeTokenReserves(optionalReservesInput),
            outputReserves: normalizeTokenReserves(optionalReservesOutput)
        };
    }
    else if (types_1.areTokenReserves(optionalReservesInput) && !types_1.areTokenReserves(optionalReservesOutput)) {
        return {
            tradeType: constants_1.TRADE_TYPE.TOKEN_TO_ETH,
            inputReserves: normalizeTokenReserves(optionalReservesInput),
            outputReserves: types_1.areETHReserves(optionalReservesOutput)
                ? optionalReservesOutput
                : {
                    token: _utils_1.getEthToken(optionalReservesInput.token.chainId)
                }
        };
    }
    else if (!types_1.areTokenReserves(optionalReservesInput) && types_1.areTokenReserves(optionalReservesOutput)) {
        return {
            tradeType: constants_1.TRADE_TYPE.ETH_TO_TOKEN,
            inputReserves: types_1.areETHReserves(optionalReservesInput)
                ? optionalReservesInput
                : {
                    token: _utils_1.getEthToken(optionalReservesOutput.token.chainId)
                },
            outputReserves: normalizeTokenReserves(optionalReservesOutput)
        };
    }
    else {
        throw Error('optionalReservesInput, optionalReservesOutput, or both must be defined.');
    }
}
function getMarketRate(tradeType, reserves, keepAsDecimal) {
    if (!types_1.areTokenReservesNormalized(reserves)) {
        throw Error;
    }
    var numerator = tradeType === constants_1.TRADE_TYPE.ETH_TO_TOKEN ? reserves.tokenReserve : reserves.ethReserve;
    var denominator = tradeType === constants_1.TRADE_TYPE.ETH_TO_TOKEN ? reserves.ethReserve : reserves.tokenReserve;
    return _utils_2.calculateDecimalRate(numerator, denominator, keepAsDecimal);
}
function getMarketDetails(optionalReservesInput, optionalReservesOutput) {
    var _a = parseOptionalReserves(optionalReservesInput, optionalReservesOutput), tradeType = _a.tradeType, inputReserves = _a.inputReserves, outputReserves = _a.outputReserves;
    if (tradeType === constants_1.TRADE_TYPE.TOKEN_TO_TOKEN) {
        var _b = getMarketRate(constants_1.TRADE_TYPE.TOKEN_TO_ETH, inputReserves, true), numeratorInput = _b.numerator, denominatorInput = _b.denominator, decimalScalarInput = _b.decimalScalar, decimalScalarInvertedInput = _b.decimalScalarInverted;
        var _c = getMarketRate(constants_1.TRADE_TYPE.ETH_TO_TOKEN, outputReserves, true), numeratorOutput = _c.numerator, denominatorOutput = _c.denominator, decimalScalarOutput = _c.decimalScalar, decimalScalarInvertedOutput = _c.decimalScalarInverted;
        var marketRate = numeratorInput
            .multipliedBy(decimalScalarInput)
            .multipliedBy(numeratorOutput)
            .multipliedBy(decimalScalarOutput)
            .dividedBy(denominatorInput.multipliedBy(denominatorOutput));
        var marketRateInverted = denominatorInput
            .multipliedBy(decimalScalarInvertedInput)
            .multipliedBy(denominatorOutput)
            .multipliedBy(decimalScalarInvertedOutput)
            .dividedBy(numeratorInput.multipliedBy(numeratorOutput));
        return {
            tradeType: tradeType,
            inputReserves: inputReserves,
            outputReserves: outputReserves,
            marketRate: { rate: marketRate, rateInverted: marketRateInverted }
        };
    }
    else {
        var reserves = (tradeType === constants_1.TRADE_TYPE.ETH_TO_TOKEN
            ? outputReserves
            : inputReserves);
        return {
            tradeType: tradeType,
            inputReserves: inputReserves,
            outputReserves: outputReserves,
            marketRate: getMarketRate(tradeType, reserves)
        };
    }
}
exports.getMarketDetails = getMarketDetails;
//# sourceMappingURL=market.js.map