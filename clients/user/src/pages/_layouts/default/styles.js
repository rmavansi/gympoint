import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #eee;

  button {
    background: #ee4d64;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    height: 35px;
    width: 110px;
    color: #fff;
    margin: 5px 0 0;
    font-weight: bold;
    font-size: 14px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.08, '#ee4d64')};
    }
  }

  button.backBtn {
    background: #55555555;
    &:hover {
      background: ${darken(0.08, '#55555555')};
    }
  }

  input {
    padding: 10px 0;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 16px;
    padding-left: 15px;
    padding-right: 15px;
    color: #333333;

    &::placeholder {
      color: #999999;
    }
  }

  h1 {
    font-size: 24px;
    color: #444444;
  }

  strong {
    font-size: 14px;
    color: #444444;
  }

  span {
    font-size: 16px;
    color: #666666;
  }
`;
