import React, { useMemo } from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

import {
  Container,
  Info,
  QuestionStatus,
  QuestionText,
  Time,
  UpperWrapper,
  LowerWrapper,
} from './styles';

export default function Question({ data }) {
  const dataParsered = useMemo(() => {
    return formatDistanceToNow(parseISO(data.createdAt), new Date(), {
      addSuffix: true,
    });
  }, [data.createdAt]);

  function handleClick() {}

  return (
    <Container>
      <TouchableOpacity>
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
