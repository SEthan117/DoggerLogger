import { useRouter } from 'expo-router';
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";


export default function createAccount() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const isCreateAcctInvalid = username.trim() === '' || password.trim() === '';

    return(
        <View>
        <Text>Create Account:</Text>
        <TextInput 
            onChangeText = {setUsername} 
            placeholder="Enter Username"
            value={username} />
        
        <TextInput 
            onChangeText={setPassword} 
            placeholder = "Enter Password" 
            value={password}/>
        
        <Button 
            title="Sign Up" 
            onPress={() => router.replace('/')}
            disabled={isCreateAcctInvalid} />
        </View>
    )
}