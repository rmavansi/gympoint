import React from 'react';
import { Image } from 'react-native';

import { Container } from './styles';

import header from '~/assets/header.png';

export default function Header() {
  return (
    <Container>
      <Image source={header} />
    </Container>
  );
}
