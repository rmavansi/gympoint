import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import api from '~/services/api';

import Background from '~/components/Background';
import Question from '~/components/Question';
import Header from '~/components/Header';

import { Container, List, CheckInButton } from './styles';

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
        <CheckInButton onPress={() => navigation.navigate('Teste')}>
          New question
        </CheckInButton>
        <List
          data={checkins}
          keyExtractor={item => String(item._id)}
          renderItem={({ item }) => <Question data={item} />}
        />
      </Container>
    </Background>
  );
}

AskHelp.navigationOptions = {
  tabBarLabel: 'Ask question',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};
