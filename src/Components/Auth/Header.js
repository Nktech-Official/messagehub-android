import React from 'react'
import { Box, Center, Heading, Image } from 'native-base'

export default function HeaderAuth() {
    return (
        <Center mb={10}>

            <Box>

                <Image source={require('../../../Assets/WelcomeIcon.png')} my={1} w={100} h={100} alt="App LOGO" />
                <Heading mt="1" color="amber.400"
                    fontWeight="medium" size="md">
                    Message Hub
                </Heading>
            </Box>

        </Center >
    )
}