import styled from 'styled-components';
import { darken } from 'polished';

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: center;
  background: #fff;
  padding: 50px 30px 50px 30px;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    strong {
      font-family: Roboto;
      font-size: 14px;
      color: #444444;
      text-align: left;
      padding: 5px 0;
    }

    input {
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #333;
      margin: 0 0 10px;
      border: 1px solid #ddd;

      &::placeholder {
        color: #999999;
        font-size: 16px;
      }
    }
    button {
      background: #ee4d64;
      border: 0;
      border-radius: 4px;
      height: 44px;
      color: #fff;
      margin: 5px 0 0;
      font-weight: bold;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }

    span {
      color: #f64c75;
      align-self: flex-start;
      margin: 0 0 10;
      font-weight: bold;
      font-size: 11px;
    }
  }
`;
