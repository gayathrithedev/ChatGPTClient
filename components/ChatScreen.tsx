import React, {useState} from 'react';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import {CHAT_GPT_API_KEY} from '@env';
import axios from 'axios';
import {StyleSheet} from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (message: string) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: [
            {
              role: 'user',
              content: message,
            },
          ],
          model: 'gpt-3.5-turbo',
        },
        {
          headers: {
            Authorization: `Bearer ${CHAT_GPT_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.choices[0].message.content;
    } catch (err) {
      console.log(err, 'api call error');
    }
  };

  const onSend = async (newMessages = []) => {
    console.log(newMessages, 'new messages');
    setMessages(prev => GiftedChat.append(prev, newMessages));

    const response = await sendMessage(newMessages[0].text);
    const chatMessage = [
      {
        _id: Math.random().toString(36).substring(7),
        text: response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'GPT-3.5-turbo',
          avatar: require('../assets/chatgptlogo.png'),
        },
      },
    ];

    setMessages(prev => GiftedChat.append(prev, chatMessage));
  };

  const user = {
    _id: 1,
    name: 'Developer',
    avatar: require('../assets/profile.jpeg'),
  };

  const renderInputToolbar = props => {
    return <InputToolbar {...props} containerStyle={styles.input} />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={user}
      placeholder={'whats on your mind?'}
      showUserAvatar={true}
      showAvatarForEveryMessage={true}
      renderInputToolbar={renderInputToolbar}
      messagesContainerStyle={styles.messageContainer}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  messageContainer: {
    paddingBottom: 16,
  },
  input: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 4,
    marginBottom: 16,
  },
});
