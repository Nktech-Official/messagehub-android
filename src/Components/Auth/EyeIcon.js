import Ionicons from "react-native-vector-icons/Ionicons"
import React from 'react'
import { Icon } from "native-base"
import { TouchableOpacity } from "react-native"

export default function EyeIcon({ name, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} >
            <Icon as={Ionicons} name={name} size={6} ml="2" mr="2" color="muted.400" />
        </TouchableOpacity>

    )
}