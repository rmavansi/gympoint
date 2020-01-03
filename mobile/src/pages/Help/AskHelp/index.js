import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import api from '~/services/api';

import Background from '~/components/Background';
import Question from '~/components/Question';
import Header from '~/components/Header';

import { Container, List, NewQuestionButton } from './styles';

function AskHelp({ isFocused, navigation }) {
  const [questions, setQuestions] = useState([]);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`/members/${user.id}/help-orders`);
      setQuestions(response.data);
    }
    if (isFocused) {
      loadCheckins();
    }
  }, [isFocused, user.id]);

  return (
    <Background>
      <Container>
        <Header />
        <NewQuestionButton onPress={() => navigation.navigate('NewQuestion')}>
          New question
        </NewQuestionButton>

        <List
          data={questions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Question data={item} navigation={navigation} />
          )}
        />
      </Container>
    </Background>
  );
}

AskHelp.navigationOptions = {
  headerShown: false,
};

AskHelp.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigationFocus(AskHelp);
