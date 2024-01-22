require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      },
      {
        version: "0.8.19",
      },
      {
        version: "0.8.4",
      },
      {
        version: "0.8.9",
      },
    ],
  },
  mocha: {
    // * the reporter here needs to be JSON
    reporter: "json",
  },
};
