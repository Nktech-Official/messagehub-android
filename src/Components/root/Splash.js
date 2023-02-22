import React from 'react'
import { Box, Image, Text } from "native-base"

export default function Splash() {
    return (
        <Box flexDirection="column" h="100%" alignItems="center" >
            <Box space={2} mt={250} alignItems="center" justifyContent="center">

                {/* <Spinner size="lg" accessibilityLabel="Loading posts" color="indigo.500" /> */}
                <Image w={150} alt={"logo"} zIndex={100} h={150} source={require("../../../Assets/WelcomeIcon.png")} />
                {/* <Pulse /> */}
                <Text mt={250} color="#25F5F5" fontWeight="600" letterSpacing={2} fontSize={40}>
                    Message Hub
                </Text>
                <Text color="#25F5F5" textAlign="center" letterSpacing={2} fontSize={18}>
                    Simple. Secure.
                </Text>
                <Text color="#25F5F5" textAlign="center" letterSpacing={2} fontSize={18}>
                    Reliable messaging
                </Text>
            </Box>
        </Box>
    )
}