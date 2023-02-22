import { Chain } from "wagmi"

export const mantleChain: Chain = {
    id: 5001,
    name: "Mantle Testnet",
    network: "Mantle Testnet",
    nativeCurrency: {
        name: "Mantle Chain Native Token",
        symbol: "BIT",
        decimals: 18,
    },
    rpcUrls: {
        // @ts-ignore
        default: process.env.NEXT_PUBLIC_MANTLE_TESTNET_RPC_URL!,
    },
    blockExplorers: {
        default: { name: "Mantle", url: "https://explorer.testnet.mantle.xyz" },
    },
    testnet: true,
}
