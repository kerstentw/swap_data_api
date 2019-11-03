import { BigNumberish, ChainIdOrProvider, OptionalReserves, TradeDetails } from '../types';
export declare function tradeExactEthForTokensWithData(reserves: OptionalReserves, ethAmount: BigNumberish): TradeDetails;
export declare function tradeExactEthForTokens(tokenAddress: string, ethAmount: BigNumberish, chainIdOrProvider?: ChainIdOrProvider): Promise<TradeDetails>;
export declare function tradeEthForExactTokensWithData(reserves: OptionalReserves, tokenAmount: BigNumberish): TradeDetails;
export declare function tradeEthForExactTokens(tokenAddress: string, tokenAmount: BigNumberish, chainIdOrProvider?: ChainIdOrProvider): Promise<TradeDetails>;
export declare function tradeExactTokensForEthWithData(reserves: OptionalReserves, tokenAmount: BigNumberish): TradeDetails;
export declare function tradeExactTokensForEth(tokenAddress: string, tokenAmount: BigNumberish, chainIdOrProvider?: ChainIdOrProvider): Promise<TradeDetails>;
export declare function tradeTokensForExactEthWithData(reserves: OptionalReserves, ethAmount: BigNumberish): TradeDetails;
export declare function tradeTokensForExactEth(tokenAddress: string, ethAmount: BigNumberish, chainIdOrProvider?: ChainIdOrProvider): Promise<TradeDetails>;
export declare function tradeExactTokensForTokensWithData(reservesInput: OptionalReserves, reservesOutput: OptionalReserves, tokenAmount: BigNumberish): TradeDetails;
export declare function tradeExactTokensForTokens(tokenAddressInput: string, tokenAddressOutput: string, tokenAmount: BigNumberish, chainIdOrProvider?: ChainIdOrProvider): Promise<TradeDetails>;
export declare function tradeTokensForExactTokensWithData(reservesInput: OptionalReserves, reservesOutput: OptionalReserves, tokenAmount: BigNumberish): TradeDetails;
export declare function tradeTokensForExactTokens(tokenAddressInput: string, tokenAddressOutput: string, tokenAmount: BigNumberish, chainIdOrProvider?: ChainIdOrProvider): Promise<TradeDetails>;