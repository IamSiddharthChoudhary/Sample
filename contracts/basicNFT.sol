// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BasicNft is ERC721 {
    string public constant TOKEN_URI =
        "ipfs/QmXBx4ZLDD7bhAwhveqgCikRCPLxZPxLREdfiLqxiP2nWf/shp.json";
    uint256 private s_tokenCounter;

    event DogMinted(uint256 indexed tokenId);

    constructor() ERC721("Ship", "SHP") {
        s_tokenCounter = 0;
    }

    function mintNft() public {
        _safeMint(msg.sender, s_tokenCounter);
        emit DogMinted(s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}