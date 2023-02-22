import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { AppShell, Navbar, Header, Button, SimpleGrid, Text } from "@mantine/core"
import { NavbarMinimal } from "../components/Navigation"
import { AccessControl } from "../components/AccessControl"
import { Layout } from "../components/Layout"
import { useContext, useEffect, useState } from "react"
import OrbisContext from "../context/OrbisContext"
import { AccessControlTry } from "../components/AccessControlTry"
import { UserCard, UserCardImageProps } from "../components/UserCard"
import { mainAbi, mainContractAddress, rpcUrl, tableName } from "../constants"
import { ethers } from "ethers"

export default function Home() {
    const ctx = useContext(OrbisContext)
    console.log("ctx", ctx)
    const [users, setUsers] = useState([])
    useEffect(() => {
        console.log("ctx", ctx)
    }, [ctx])

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        const contractInstance = new ethers.Contract(
            mainContractAddress,
            mainAbi,
            ethers.getDefaultProvider(rpcUrl)
        )
        let data = await contractInstance.getUsers()
        console.log("data123", data)

        // // const postsData = await fetch("https://testnets.tableland.network/query?s=" + "SELECT * FROM " + postTableName + " LIMIT 10")
        // const usersData = await fetch(
        //     "https://testnets.tableland.network/query?s=" + "SELECT * FROM " + tableName
        // )
        // const usersDataJson = await usersData.json()
        // console.log("usersDataJson", usersDataJson)
        setUsers(data)
    }

    const Users = [
        {
            image: "https://previews.123rf.com/images/karpenkoilia/karpenkoilia1806/karpenkoilia180600011/102988806-vector-line-web-concept-for-programming-linear-web-banner-for-coding-.jpg",
            avatar: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
            name: "Bill Headbanger",
            description:
                "Fullstack engineer Fullstack engineer Fullstack engineer Fullstack engineer Fullstack engineer Fullstack engineer",
            stats: [
                { label: "Followers", value: "34K" },
                { label: "Following", value: "2K" },
                { label: "Subscribers", value: "5K" },
            ],
            address: "0x123456789",
        },
        {
            image: "https://previews.123rf.com/images/karpenkoilia/karpenkoilia1806/karpenkoilia180600011/102988806-vector-line-web-concept-for-programming-linear-web-banner-for-coding-.jpg",
            avatar: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
            name: "Bill Headbanger",
            description: "Fullstack engineer",
            stats: [
                { label: "Followers", value: "34K" },
                { label: "Following", value: "2K" },
                { label: "Subscribers", value: "5K" },
            ],
            address: "0x123456789",
        },
        {
            image: "https://previews.123rf.com/images/karpenkoilia/karpenkoilia1806/karpenkoilia180600011/102988806-vector-line-web-concept-for-programming-linear-web-banner-for-coding-.jpg",
            avatar: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
            name: "Bill Headbanger",
            description: "Fullstack engineer",
            stats: [
                { label: "Followers", value: "34K" },
                { label: "Following", value: "2K" },
                { label: "Subscribers", value: "5K" },
            ],
            address: "0x123456789",
        },
    ]

    return (
        <Layout>
            <div className={styles.container}>
                {/* <AccessControl /> */}
                {/* <AccessControlTry /> */}
                {/* <Button onClick={() => ctx.refresh()}>Refresh</Button>
                <Button onClick={() => console.log("ctx 1", ctx)}>Log</Button>
                <Button onClick={() => getSigningKey()}>getSigningKey</Button> */}
                <SimpleGrid cols={3}>
                    {users && !users.message && users.length > 0
                        ? users.map((user, index) => (
                              <UserCard
                                  key={user.userAddress}
                                  cid={user.cid}
                                  did={user.did}
                                  lockAddress={user.lockAddress}
                                  userAddress={user.userAddress}
                              />
                          ))
                        : null}
                </SimpleGrid>
            </div>
        </Layout>
    )
}
