require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades")
require("dotenv").config();

module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.7",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200
                    }
                }
            },
            {
                version: "0.8.9",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200
                    }
                }
            }
        ],
    },
    networks: {
        // hardhat: {
        //     forking: {
        //         url: process.env.ALCHEMY_URL_MAINNET,
        //         blockNumber: 13190000,
        //     }
        // },
        mainnet: {
            url: `https://api.s0.t.hmny.io`,
            // accounts: [process.env.PRIVATE_KEY]
        },
        testnet: {
            url: `https://api.s0.b.hmny.io`,
            // accounts: [process.env.PRIVATE_KEY]
        },
    },
    mocha: {
        timeout: 300000
    },
};
