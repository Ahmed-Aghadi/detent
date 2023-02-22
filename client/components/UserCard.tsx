import { createStyles, Card, Avatar, Text, Group, Button } from "@mantine/core"
import { ethers } from "ethers"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { useSigner } from "wagmi"
import OrbisContext from "../context/OrbisContext"
import { lockAbi } from "../constants/"

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    avatar: {
        border: `2px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`,
    },
}))

// export interface UserCardImageProps {
//     image: string
//     avatar: string
//     name: string
//     description: string
//     stats: { label: string; value: string }[]
//     address: string
// }

export interface UserCardImageProps {
    id: number
    cid: string
    lockAddress: string
    userAddress: string
    did: string
}

// { image, avatar, name, description, stats, address }
export function UserCard({ cid, lockAddress, userAddress, did }: UserCardImageProps) {
    const { classes, theme } = useStyles()
    const router = useRouter()
    const ctx = useContext(OrbisContext)
    const { data: signer } = useSigner()
    const [image, setImage] = useState("")
    const [avatar, setAvatar] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [stats, setStats] = useState([
        { label: "Followers", value: "" },
        { label: "Following", value: "" },
        { label: "Subscribers", value: "" },
    ])

    useEffect(() => {
        // const did = `did:pkh:eip155:80001:${userAddress.toLowerCase()}`
        if (ctx.isLoaded) {
            ;(async () => {
                const res = await fetch(`https://${cid}.ipfs.nftstorage.link/data.json`)
                const data = await res.json()
                setDescription(data.description)
                console.log(data)
            })()
            ;(async () => {
                let { data, error } = await ctx.orbis.getProfile(did)
                if (error) {
                    console.log(error)
                    return
                }
                console.log("data", data)
                setName(data.username)
                if (data.details.profile && data.details.profile.cover) {
                    setImage(data.details.profile.cover)
                }
                if (data.details.profile && data.details.profile.pfp) {
                    setAvatar(data.details.profile.pfp)
                }
                setStats((prev) => {
                    return [
                        { label: "Followers", value: data.count_followers },
                        { label: "Following", value: data.count_following },
                        { label: "Subscribers", value: prev[2].value },
                    ]
                })
                console.log(data)
            })()
            ;(async () => {
                const contractInstance = new ethers.Contract(
                    lockAddress,
                    lockAbi,
                    ethers.getDefaultProvider(process.env.NEXT_PUBLIC_MUMBAI_RPC_URL)
                )

                console.log(contractInstance)

                let totalSubscribers = 0
                try {
                    totalSubscribers = await contractInstance.s_subscriberCount()
                } catch (error) {
                    console.log(error)
                }
                setStats((prev) => {
                    return [
                        { label: "Followers", value: prev[0].value },
                        { label: "Following", value: prev[1].value },
                        { label: "Subscribers", value: totalSubscribers.toString() },
                    ]
                })
            })()
        }
    }, [ctx.isLoaded])

    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text align="center" size="lg" weight={500}>
                {stat.value}
            </Text>
            <Text align="center" size="sm" color="dimmed">
                {stat.label}
            </Text>
        </div>
    ))

    return (
        <Card withBorder p="xl" radius="md" className={classes.card}>
            <Card.Section sx={{ backgroundImage: `url(${image})`, height: 140 }} />
            <Avatar
                src={avatar}
                size={80}
                radius={80}
                mx="auto"
                mt={-30}
                className={classes.avatar}
            />
            <Text align="center" size="lg" weight={500} mt="sm">
                {name}
            </Text>
            <Text align="center" size="sm" color="dimmed" lineClamp={1}>
                {description}
            </Text>
            <Group mt="md" position="center" spacing={30}>
                {items}
            </Group>
            <Button
                fullWidth
                radius="md"
                mt="xl"
                size="md"
                color={theme.colorScheme === "dark" ? undefined : "dark"}
                onClick={() => {
                    // window.open(`https://rinkeby.etherscan.io/address/${address}`)
                    router.push(`/profile/${did}`)
                }}
            >
                View Profile
            </Button>
        </Card>
    )
}
