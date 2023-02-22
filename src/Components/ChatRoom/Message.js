import { Box, Text, Skeleton } from 'native-base'
import React, { useEffect, useState } from 'react'



export default function Message(item) {
    const [msg, setMsg] = useState(false)
    const session = item.session;
    useEffect(() => {
        const AS = async () => {
            if (session) {

                session.decryptMessage(item.message).then((decryptMessage) => {
                    setMsg(decryptMessage);
                });
            } else {
                setMsg(item.message)
            }
        }; AS()
        return () => {
            setMsg(null)
        }
    }, [item.message, session])


    return (<>
        {msg ? <Box p={3} backgroundColor={item.send ? "rgba(15, 54, 177, 0.52)" : "rgba(177, 78, 182, 0.52)"} flex={1} borderWidth={1} minW={20} borderRadius={20} justifyContent="center" maxW="80%" alignItems="center">
            <Text flexWrap='wrap' h={"100%"} editable={false} borderWidth={0} fontSize={20}  >
                {msg}
            </Text>
        </Box> : <Box maxW="80%" borderRadius={20} p={5} backgroundColor={item.send ? "rgba(15, 54, 177, 0.52)" : "rgba(177, 78, 182, 0.52)"} minW={"50%"} w="50%">
            <Skeleton.Text px={1} lines={2} />
        </Box>}
    </>
    )
}