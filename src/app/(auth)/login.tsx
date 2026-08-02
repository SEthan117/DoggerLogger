import { useRouter } from 'expo-router';
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    //For testing button
    const [text, setText] = useState('');

    const pressBtn = () => {
        setText(`${username}, ${password}`)
    }

    return(
        <View>
            <Text>Login to Your Account: </Text>
            <TextInput 
                onChangeText = {setUsername} 
                placeholder="Enter Username"
                value={username}/>

            <TextInput 
                onChangeText={setPassword} 
                placeholder = "Enter Password" 
                value={password}/>

            <Button 
                title="Sign In" 
                onPress={pressBtn} />

            <Text>{text}</Text>
            <Text>No Account?{"\n"}</Text>
            <Button 
                title="Create Account"
                onPress={() => router.push("/createAccount")} />
        </View>
    )
}