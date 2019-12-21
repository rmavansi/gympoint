import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  background: #fff;

  border: 1px solid #ddd;
`;

export const Info = styled.View`
  margin-left: 15px;
  /* width: 335px; */
  height: 130px;
`;

export const UpperWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const LowerWrapper = styled.View`
  margin-top: 16px;
`;

export const QuestionStatus = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${props => (props.answer ? '#42CB59' : '#999')};
`;
export const QuestionText = styled.Text`
  color: #666;
  font-size: 14px;
  line-height: 26px;
`;

export const Time = styled.Text`
  color: #999;
  font-size: 14px;
  margin-top: 4px;
`;
