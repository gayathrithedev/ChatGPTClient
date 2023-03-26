import * as React from 'react';
import {View, SafeAreaView} from 'react-native';
import {Example} from './components/Chat';
import ChatScreen from './components/ChatScreen';

const App = () => {
  return (
    <View style={{flex: 1, padding: 20, backgroundColor:'#f1f1f1'}}>
      <ChatScreen />
    </View>
  );
};

export default App;
