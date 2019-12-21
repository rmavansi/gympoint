import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  const dataParserd = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <Info>
        <UpperWrapper>
          <QuestionStatus answer={data.answer}>
            <Icon name="check-circle" size={20} />
            {data.answer ? '  Answered' : '  No answer'}
          </QuestionStatus>
          <Time>{dataParserd}</Time>
        </UpperWrapper>
        <LowerWrapper>
          <QuestionText numberOfLines={3}>{data.question}</QuestionText>
        </LowerWrapper>
      </Info>
    </Container>
  );
}
