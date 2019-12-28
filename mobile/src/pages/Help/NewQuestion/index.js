import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Background from '~/components/Background';
import Header from '~/components/Header';
import api from '~/services/api';

import { Container, CheckInButton, TInput, Form } from './styles';

export default function NewQuestion({ navigation }) {
  const user = useSelector(state => state.auth.user);
  const [question, setQuestion] = useState('');

  async function handleSendQuestion() {
    try {
      await api.post(`/members/${user.id}/help-orders`, { question });
      showMessage({
        message: 'Your question was sent!',
        type: 'success',
      });
      navigation.navigate('AskHelp');
    } catch (err) {
      showMessage({
        message: err.response.data.error,
        type: 'danger',
      });
    }
  }

  return (
    <Background>
      <Container>
        <Header />
        <Form>
          <TInput
            name="question"
            placeholder="Type your question here"
            onSubmitEditing={handleSendQuestion}
            value={question}
            onChangeText={setQuestion}
          />
          <CheckInButton type="button" onPress={handleSendQuestion}>
            Send question
          </CheckInButton>
        </Form>
      </Container>
    </Background>
  );
}

NewQuestion.navigationOptions = ({ navigation }) => ({
  // header: Header,
  headerShown: false,
  // headerLeft: () => (
  //   <TouchableOpacity
  //     onPress={() => {
  //       navigation.navigate('AskHelp');
  //     }}
  //   >
  //     <Icon name="chevron-left" size={20} color="#333" />
  //   </TouchableOpacity>
  // ),
});
