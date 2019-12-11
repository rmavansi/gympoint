import styled from 'styled-components';
// import { darken } from 'polished';

export const Container = styled.div`
  margin: 0 270px;
  min-width: 860px;
  div.divBtn {
    display: flex;
  }
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  margin-top: 15px;

  button {
    margin-left: 15px;
  }
`;

export const DivForm = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  border-radius: 4px;

  strong {
    padding-top: 10px;
    font-size: 14px;
  }

  input {
    margin: 10px 0;
  }

  div {
    ul {
      display: flex;
      justify-content: space-between;
    }

    li {
      display: flex;
      flex-direction: column;
    }
    input {
      width: 265px;
    }
  }
`;
