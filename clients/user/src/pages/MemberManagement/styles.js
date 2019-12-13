import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 25px;
  min-width: 850px;

  strong {
    font-size: 16px;
  }

  span {
    font-size: 16px;
  }
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  padding: 15px 0;
  min-width: 950px;

  button.defaultBtn {
    width: 140px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
`;

export const ContentWrapper = styled.ul`
  background: white;
  border-radius: 4px;
  padding: 30px 30px 10px 30px;
  min-width: 950px;

  li {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 0.2fr 0.2fr;
    min-width: 850px;
  }

  div {
    min-width: 850px;
    li {
      padding: 8px 0;

      & + li {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  }

  button.defaultBtn {
    font-size: 15px;
    color: #4d85ee;
    width: 45px;
    background: none;
    font-weight: normal;

    &:hover {
      background: none;
      font-weight: bold;
    }
  }

  button.deleteBtn {
    color: #de3b3b;
  }

  .centerColumn {
    text-align: center;
  }
`;

export const Input = styled.input`
  margin-left: 15px;
  height: 35px;
  width: 240px;
  margin-top: 4px;

  &::placeholder {
    font-size: 14px;
  }
`;
