# Detent

## Details

A platform for content creators to share their content to their subscribers. The platform will let content creator create membership based NFT contracts.

Content creators can create posts ( using Orbis ) and poll ( using Vocdoni ).

Web3 storage ( which uses Filecoin ) is used to store profile image on ipfs, it is used when user wants to edit their profile so the ipfs image url is then used.

There is a chatroom for all the users to chat.

Contract is deployed on Mantle Testnet.
[smart contract address](https://github.com/Ahmed-Aghadi/detent/blob/main/client/constants/contractAddress.json#L2)

| Tech stack used                   |
| --------------------------------- |
| [Orbis Club](#orbis-club)         |
| [Vocdoni](#vocdoni)               |
| [Mantle Testnet](#mantle-testnet) |
| [Web3 Storage](#web3-storage)     |
| [Mantine UI](#mantine-ui)         |

## Deployements

Deployed website at Vercel: [Detent](https://detent.vercel.app/)

## Getting Started

To run frontend :

```bash
cd client/my-app

yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To deploy smart contracts to localhost :

```bash
cd smart_contracts/

yarn hardhat deploy --network localhost
```

## Sponsors Used

### Orbis Club

Post creation and chatting feature is added using orbis.

#### Atleast one example:

[Create Post](https://github.com/Ahmed-Aghadi/detent/blob/main/client/components/UserPage.tsx#L397)

[Send Message](https://github.com/Ahmed-Aghadi/detent/blob/main/client/components/ChatRoom.tsx#L143)

[Edit Profile](https://github.com/Ahmed-Aghadi/detent/blob/main/client/components/UserPage.tsx#L797)

### Vocdoni

Different types of polls were created using Vocdoni.

#### Atleast one example:

[Create Election](https://github.com/Ahmed-Aghadi/detent/blob/main/client/components/UserPage.tsx#L529)

[Fetching Poll Info](https://github.com/Ahmed-Aghadi/detent/blob/main/client/components/Poll.tsx#L30)

### Mantle Testnet

All the smart contracts are deployed on Mantle Testnet.

#### Atleast one example:

[Deployements](https://github.com/Ahmed-Aghadi/detent/tree/main/smart_contracts/deployments/mantletest)

[Smart Contract](https://github.com/Ahmed-Aghadi/detent/tree/main/smart_contracts/contracts)

### Web3 Storage

When user want to edit their pfp or cover image. Image uploaded by user is stored on IPFS using web3 storage ( which uses Filecoin ) and the IPFS url is then used.

#### Atleast one example:

[image upload function](https://github.com/Ahmed-Aghadi/detent/blob/main/client/pages/api/image-upload-ipfs.js)

[Smart Contract](https://github.com/Ahmed-Aghadi/detent/tree/main/smart_contracts/contracts)

### Mantine UI

Mantine ui is heavily used in front end for styling.
