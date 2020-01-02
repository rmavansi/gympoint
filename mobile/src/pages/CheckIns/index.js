import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import api from '~/services/api';

import Background from '~/components/Background';
import CheckIn from '~/components/CheckIn';
import Header from '~/components/Header';

import { Container, List, CheckInButton } from './styles';

function CheckIns({ isFocused }) {
  const [checkins, setCheckins] = useState([]);
  const [check, setCheck] = useState('');
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`/members/${user.id}/checkins`);
      setCheckins(response.data);
    }
    if (isFocused) {
      loadCheckins();
    }
  }, [user.id, check, isFocused]);

  async function handleNewCheckIn() {
    try {
      await api.post(`/members/${user.id}/checkins`);
      setCheck('a');
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

function SubmitIcon({ tintColor }) {
  return <Icon name="room" size={20} color={tintColor} />;
}

CheckIns.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: SubmitIcon,
};

CheckIns.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

SubmitIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default withNavigationFocus(CheckIns);
