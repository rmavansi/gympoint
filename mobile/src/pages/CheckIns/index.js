import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';
import api from '~/services/api';

import Background from '~/components/Background';
import CheckIn from '~/components/CheckIn';
import Header from '~/components/Header';

import { Container, List, CheckInButton } from './styles';

function CheckIns() {
  const [checkins, setCheckins] = useState([]);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`/members/${user.id}/checkins`);
      setCheckins(response.data);
    }
    loadCheckins();
  }, [user.id]);

  async function handleNewCheckIn() {
    try {
      await api.post(`/members/${user.id}/checkins`);
      showMessage({
        message: 'You just check in!',
        type: 'success',
      });
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
        <CheckInButton onPress={handleNewCheckIn}>New check-in</CheckInButton>
        <List
          inverted
          data={checkins}
          keyExtractor={item => String(item._id)}
          renderItem={({ item, index }) => <CheckIn data={item} num={index} />}
        />
      </Container>
    </Background>
  );
}

CheckIns.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="room" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(CheckIns);
