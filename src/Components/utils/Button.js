import React from 'react'
import { TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export function GradientButton({ children, onPress }, props) {
    return (
        <TouchableOpacity {...props} onPress={onPress} >

            <LinearGradient colors={['#265fec', '#8947d6', '#ec6fca']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{
                borderRadius: 15,

                justifyContent: "center",
                alignItems: "center",
                elevation: 1
            }}>

                {children}
            </LinearGradient>
        </TouchableOpacity>
    )
}
