import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  background: #fff;

  border: 1px solid #ddd;
  display: flex;
`;

export const Info = styled.View`
  margin: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CheckinList = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const Time = styled.Text`
  color: #999;
  font-size: 14px;
`;
