import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import axios from 'axios';
import {CHAT_GPT_API_KEY} from '@env';

const ChatGPTClient = () => {
  const [message, setMessage] = useState('');
  const [userMessages, setUserMessages] = useState([]);
  const [gptResponse, setGptResponses] = useState([]);

  const sendMessage = async () => {
    console.log(message, 'message');
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: message,
        max_tokens: 50,
        n: 1,
        stop: '\n',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CHAT_GPT_API_KEY}`,
        },
      },
    );
    console.log(response.data, response.data.choices[0].text, 'response');
    setGptResponses([...gptResponse, response.data.choices[0].text]);
  };

  return (
    <View style={styles.container}>
      <Text>Client component</Text>

      <ScrollView>
        <View>{}</View>
      </ScrollView>

      <TextInput
        value={message}
        onChangeText={e => setMessage(e)}
        style={styles.input}
      />
      <TouchableOpacity onPress={sendMessage}>
        <Text>send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatGPTClient;

const styles = StyleSheet.create({
  input: {
    padding: 16,
    borderWidth: 1,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
});
