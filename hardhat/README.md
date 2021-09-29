# PowerBomb

## Flow

Deposit in USDT/USDC/SLP. Withdraw in SLP.
User can choose to claim their reward anytime.
Reward will be automatically claimed when do withdrawal.

## Deployment

1/ Create .env file

2/ Install packages

```
npm install
```

3/ Run command to deploy contracts

```
npx hardhat run --network mainnet scripts/deployBTC.js
```

```
npx hardhat run --network mainnet scripts/deployETH.js
```

```
npx hardhat run --network mainnet scripts/deployHelper.js
```

## Frontend integration

### PowerBomb Helper contract

Deposit through helper contract

```javascript
await powerBombHelper.deposit(tokenAddress, amountDeposit, btcSplit, ethSplit)
```

> btcSplit + ethSplit must equal 10000

Harvest WONE & SUSHI from Sushi for both contracts

```javascript
await powerBombHelper.harvest()
```

Claim BTC & ETH (if applicable) from both contracts to user

```javascript
await powerBombHelper.claimReward(user.address)
```

Get total amount of SLP in USD for both contracts (not including rewards)

```javascript
const allPoolInUSD = await powerBombHelper.getAllPoolInUSD() // 6 decimals
```

Get pool pending rewards (WONE & SUSHI) from Sushi for both contracts

```javascript
const [pendingWONE, pendingSUSHI] = await powerBombHelper.getPoolPendingReward() // 18 decimals
```

Get total user balance in USD from both contracts

```javascript
const userBalanceInUSD = await powerBombHelper.getUserBalanceInUSD(user.address) // 6 decimals
```

### Original PowerBomb contract

#### Update v1.1

Get accumulated reward for pool

```javascript
const accReward = await powerBomb.getPoolAccumulatedReward() // BTC 8 decimals, ETH 18 decimals
```

Get accumulated reward for user

```javascript
const accReward = await powerBomb.getUserAccumulatedReward(user.address) // BTC 8 decimals, ETH 18 decimals
```

#### Update v1.0

```javascript
const allPoolInUSD = await powerBomb.getAllPoolInUSD() // 6 decimals, all pool not including rewards (BTC/ETH)
```

```javascript
const userBalanceInUSD = await powerBomb.getUserBalanceInUSD(user.address) // 6 decimals
```

#### Original contents

Example in Ethers.js

1/ Deposit

```javascript
await powerBomb.deposit(token.address, amountTokenToDeposit)
```

2/ Withdraw

```javascript
await powerBomb.withdraw(token.address, amountSLPToWithdraw)
```

3/ Claim reward

```javascript
await powerBomb.claimReward()
```

4/ Get user current SLP balance

```javascript
const userSLPBalance = await powerBomb.getUserBalance(user.address) // 18 decimals
```

5/ Get user pending reward (BTC/ETH)

```javascript
const userPendingReward = await powerBomb.getUserPendingReward(user.address)  // BTC 8 decimals, ETH 18 decimals
```

## Backend integration

1/ Get pool pending reward

```javascript
const [pendingWONE, pendingSUSHI] = await powerBomb.getPoolPendingReward()
```

2/ Harvest pending reward

```javascript
await powerBomb.harvest()
```

## Addresses

Proxy contract address for PowerBomb BTC reward: 0x36f4ac72a572ada6d34c3a49c8a7faff9c9e4763

Proxy contract address for PowerBomb ETH reward: 0x62acbbe9733c776f02aeba1e254ac41a7170b397

Proxy contract address for PowerBomb Helper: 0x5E391DD9c5DF458A63c0016E160A15c8A005B63E

Implementation contract address for PowerBomb BTC reward: 0xc23CF2762094a4Dd8DC3D4AaAAfdB38704B0f484

Implementation contract address for PowerBomb ETH reward: 0xf12a8E2Fd857B134381c1B9F6027D4F0eE05295A

Implementation contract address for PowerBomb Helper: 0x2510E5054eeEbED40C3C580ae3241F5457b630D9

Proxy admin contract address: 0x0b9cbe922a5db9180405e224c0f9a2e67d9db01d