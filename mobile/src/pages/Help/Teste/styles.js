import styled from 'styled-components/native';
import Button from '~/components/Button';

import Input from '~/components/Input';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const CheckInButton = styled(Button)`
  margin: 0 30px 20px 30px;
`;

export const TInput = styled(Input)`
  margin: 0 30px 20px 30px;
  height: 200px;
`;
