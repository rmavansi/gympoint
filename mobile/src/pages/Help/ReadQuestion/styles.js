import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Info = styled.View`
  margin: 20px 20px 0 20px;
  background: #fff;
`;

export const UpperWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0 20px;
`;

export const Title = styled.Text`
  color: #444;
  font-size: 14px;
  line-height: 16px;
  font-weight: bold;
`;

export const LowerWrapper = styled.View`
  padding: 0 20px;
`;

export const QuestionText = styled.Text`
  color: #666;
  font-size: 14px;
  line-height: 26px;
  margin-bottom: 20px;
  margin-top: 16px;
`;

export const Time = styled.Text`
  color: #999;
  font-size: 14px;
  color: #666;
  line-height: 16px;
`;

export const HeaderTitle = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;
