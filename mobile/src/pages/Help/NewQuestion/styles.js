import styled from 'styled-components/native';
import Button from '~/components/Button';

import Input from '~/components/Input';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const CheckInButton = styled(Button)`
  margin: 0 30px 20px 30px;
`;

export const TInput = styled(Input).attrs({
  textAlignVertical: 'top',
  multiline: true,
  numberOfLines: 7,
  autoFocus: true,
})`
  margin: 0 30px 20px 30px;
  height: 280px;
  align-items: flex-start;
`;

export const Form = styled.ScrollView.attrs({})``;
