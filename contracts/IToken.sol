// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IToken {
    function approve(address _spender, uint256 _value) external;

    function balanceOf(address who) external view returns (uint256);

    function allowance(address _owner, address _spender)
        external
        returns (uint256 remaining); 
}

interface IUniswapV2Pair {
    function balanceOf(address owner) external view returns(uint);
    function approve(address spender, uint value) external returns(bool);
}