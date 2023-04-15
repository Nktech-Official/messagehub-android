import React from 'react'
import { Box, Center, VStack, Icon, Text, Circle } from 'native-base'

export default function Empty(props) {
    return (
        <Center flex={1}>

            <VStack>
                <Center>


                    {(props.type || props.type2) && <Box

                        w={180}
                        h={180}
                        justifyContent='center'
                        alignItems={'center'}
                        borderRadius={100}
                        backgroundColor={'rgba(137 ,89, 223,0.2)'}
                    >

                        <Icon

                            size={100}
                            color="rgba(216, 219, 234, 0.5)"
                            as={props.type}
                            name={props.name}

                        />
                        <Icon
                            size={10}
                            color="rgba(254, 108, 144, 0.5)"
                            as={props.type2}
                            name={props.name2}
                            position={'absolute'}
                            top={"100px"}
                            right={"20px"}
                        />
                    </Box>}
                </Center>
                <Box mt={90}>

                    {props.heading && <Text
                        textAlign='center'
                        fontSize={28}
                        fontWeight='bold'
                        color="rgba(216, 219, 234, 0.5)"
                        letterSpacing={1}
                    > {props.heading}</Text>}
                    {props.desc && <Text
                        mt={5}
                        textAlign='center'
                        fontSize={20}
                        color="rgba(216, 219, 234, 0.5)"
                        letterSpacing={1}
                        flexWrap={'wrap'}
                    > {props.desc}</Text>}
                </Box>
            </VStack>

        </Center>
    )
}