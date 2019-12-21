import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  // contentContainerStyle: { padding: 30 },
})`
  padding: 0 30px;
`;

export const CheckInButton = styled(Button)`
  margin: 0 30px 20px 30px;
`;
