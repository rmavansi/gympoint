import React, { useMemo } from 'react';

import { formatDistanceToNow, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import header from '~/assets/header.png';

import {
  Container,
  UpperWrapper,
  LowerWrapper,
  Title,
  QuestionText,
  Time,
  Info,
  HeaderTitle,
} from './styles';

export default function ReadQuestion({ navigation }) {
  const { data } = navigation.state.params;
  const dataParsered = useMemo(() => {
    return formatDistanceToNow(parseISO(data.createdAt), new Date(), {
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Background>
      <Container>
        <Info>
          <UpperWrapper>
            <Title>QUESTION</Title>
            <Time>{dataParsered} ago</Time>
          </UpperWrapper>
          <LowerWrapper>
            <QuestionText>{data.question}</QuestionText>
            <Title>ANSWER</Title>
            <QuestionText>
              {data.answer ? data.answer : 'Not answered yet.'}
            </QuestionText>
          </LowerWrapper>
        </Info>
      </Container>
    </Background>
  );
}

ReadQuestion.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <HeaderTitle>
      <Image source={header} />
    </HeaderTitle>
  ),

  headerTitleStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerStyle: {
    height: 44,
    marginHorizontal: 20,
    elevation: 0,
  },
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('AskHelp');
      }}
    >
      <Icon name="chevron-left" size={20} color="#333" />
    </TouchableOpacity>
  ),
  headerRight: () => <Icon name="chevron-left" size={0} />,
});

ReadQuestion.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        data: PropTypes.shape({
          question: PropTypes.string.isRequired,
          answer: PropTypes.string,
          createdAt: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
