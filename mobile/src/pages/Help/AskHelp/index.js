import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import api from '~/services/api';

import Background from '~/components/Background';
import Question from '~/components/Question';
import Header from '~/components/Header';

import { Container, List, NewQuestionButton } from './styles';

export default function AskHelp({ isFocused, navigation }) {
  const [checkins, setCheckins] = useState([]);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`/members/${user.id}/help-orders`);
      console.tron.log(response.data);
      setCheckins(response.data);
    }
    loadCheckins();
  }, [user.id]);

  return (
    <Background>
      <Container>
        <Header />
        <NewQuestionButton onPress={() => navigation.navigate('NewQuestion')}>
          New question
        </NewQuestionButton>

        <List
          data={checkins}
          keyExtractor={item => String(item._id)}
          renderItem={({ item }) => <Question data={item} />}
        />
      </Container>
    </Background>
  );
}

AskHelp.navigationOptions = ({ navigation }) => ({
  // title: 'Question',
  // header: Header,
  headerShown: false,
  // headerLeft: () => (
  //   <TouchableOpacity
  //     onPress={() => {
  //       navigation.navigate('Darshboard');
  //     }}
  //   >
  //     <Icon name="chevron-left" size={20} color="#333" />
  //   </TouchableOpacity>
  // ),
});
