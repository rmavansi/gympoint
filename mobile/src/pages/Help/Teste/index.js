import React from 'react';

import Background from '~/components/Background';
import Header from '~/components/Header';

import { Container, CheckInButton, TInput } from './styles';

export default function Teste() {
  return (
    <Background>
      <Container>
        <Header />
        <TInput
          multiline
          textAlignVertical="top"
          numberOfLines={2}
          placeholder="Type your question here"
        />
        <CheckInButton>Send question</CheckInButton>
      </Container>
    </Background>
  );
}
