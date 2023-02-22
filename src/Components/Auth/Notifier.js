import FadeView, { Bearing } from 'react-native-fadeview-wrapper';
import { Box, Text } from "native-base"
import React from 'react'

export default function Notifier({ error, bg }) {
    return (
        <FadeView visible={error.error || error.code == "otp_sent"} duration={300} leaveBearing={Bearing.Right} removeChildrenAfterDisapearance={true} entranceBearing={Bearing.Left}>
            <Box opacity={0.8} h="100%" borderWidth={1} borderColor="amber.100" borderRadius="15" backgroundColor={bg} justifyContent="center" alignItems="center"><Text fontSize={20} color="amber.200" >{error.message || "something went wrong"}</Text></Box>
        </FadeView>
    )
}