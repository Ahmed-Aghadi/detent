import React, { useEffect, useState } from "react"
import "../styles/globals.css"
import {
    AppShell,
    MantineProvider,
    ColorSchemeProvider,
    Navbar,
    Header,
    Grid,
    Text,
    Button,
    SimpleGrid,
} from "@mantine/core"
import { LivepeerConfig, createReactClient, studioProvider } from "@livepeer/react"
import { AccessControl } from "../components/AccessControl"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useLocalStorage } from "@mantine/hooks"
import { ConnectButton, darkTheme, lightTheme } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { publicProvider } from "wagmi/providers/public"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, useSigner, WagmiConfig } from "wagmi"
import { polygonMumbai } from "@wagmi/core/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { NotificationsProvider } from "@mantine/notifications"
import { useAccount } from "wagmi"
import { useRouter } from "next/router"
import OrbisContext, { OrbisContextProvider } from "../context/OrbisContext"
import { fetchJson } from "../utils"
import { SWRConfig } from "swr"
import { mantleChain } from "../constants/MantleChain"

const mantleTestnet = {
    id: 5001,
    name: "Mantle",
    network: "Mantle Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "BIT",
        symbol: "BIT",
    },
    rpcUrls: {
        default: { http: [process.env.NEXT_PUBLIC_MANTLE_TESTNET_RPC_URL] },
    },
    blockExplorers: {
        default: { name: "Mantle", url: "https://explorer.testnet.mantle.xyz" },
    },
    testnet: true,
}

console.log({
    mantleTestnet,
    mantleChain,
    polygonMumbai,
})
const { chains, provider } = configureChains([mantleTestnet], [publicProvider()])

const { connectors } = getDefaultWallets({
    appName: "Detent",
    chains,
})

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
})

const livepeerClient = createReactClient({
    provider: studioProvider({
        apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
    }),
})

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 1_000 * 60 * 60, // 1 hour
            retry: 100,
        },
    },
})

function MyApp({ Component, pageProps }) {
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: "mantine-color-scheme",
        defaultValue: "dark",
    })

    const toggleColorScheme = (value) => {
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))
    }

    const { isConnected } = useAccount()
    const router = useRouter()

    const titleClick = () => {
        router.push("/")
    }

    // to fix hydration error
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <WagmiConfig client={wagmiClient}>
            <NotificationsProvider position="top-right" zIndex={2077}>
                <MantineProvider withGlobalStyles withNormalizeCSS>
                    <RainbowKitProvider
                        chains={chains}
                        theme={colorScheme === "dark" ? darkTheme() : lightTheme()}
                    >
                        <ColorSchemeProvider
                            colorScheme={colorScheme}
                            toggleColorScheme={toggleColorScheme}
                        >
                            <ColorSchemeProvider
                                colorScheme={colorScheme}
                                toggleColorScheme={toggleColorScheme}
                            >
                                <MantineProvider
                                    theme={{ colorScheme }}
                                    withGlobalStyles
                                    withNormalizeCSS
                                >
                                    <QueryClientProvider client={queryClient}>
                                        <LivepeerConfig client={livepeerClient}>
                                            <OrbisContextProvider>
                                                <SWRConfig
                                                    value={{
                                                        fetcher: fetchJson,
                                                        onError: (err) => {
                                                            console.error(err)
                                                        },
                                                    }}
                                                >
                                                    <Component {...pageProps} />
                                                    {/* <AccessControl /> */}
                                                </SWRConfig>
                                            </OrbisContextProvider>
                                        </LivepeerConfig>
                                    </QueryClientProvider>
                                </MantineProvider>
                            </ColorSchemeProvider>
                        </ColorSchemeProvider>
                    </RainbowKitProvider>
                </MantineProvider>
            </NotificationsProvider>
        </WagmiConfig>
    )
}

export default MyApp
