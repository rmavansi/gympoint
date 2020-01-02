import React, { useMemo } from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import {
  Container,
  Info,
  QuestionStatus,
  QuestionText,
  Time,
  UpperWrapper,
  LowerWrapper,
} from './styles';

export default function Question({ data, navigation }) {
  const dataParsered = useMemo(() => {
    return formatDistanceToNow(parseISO(data.createdAt), new Date(), {
      addSuffix: true,
    });
  }, [data.createdAt]);

  function handleClick() {
    navigation.navigate('ReadQuestion', { data });
  }

  return (
    <Container>
      <TouchableOpacity onPress={handleClick} data={data}>
        <Info>
          <UpperWrapper OnPress={handleClick}>
            <QuestionStatus answer={data.answer}>
              <Icon name="check-circle" size={20} />
              {data.answer ? '  Answered' : '  No answer'}
            </QuestionStatus>
            <Time>{dataParsered} ago</Time>
          </UpperWrapper>
          <LowerWrapper>
            <QuestionText numberOfLines={3}>{data.question}</QuestionText>
          </LowerWrapper>
        </Info>
      </TouchableOpacity>
    </Container>
  );
}

Question.propTypes = {
  data: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
