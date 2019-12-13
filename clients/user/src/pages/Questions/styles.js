import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 366px;
  min-width: 850px;

  strong {
    font-size: 16px;
  }
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding: 15px 0;
`;

export const ContentWrapper = styled.ul`
  background: white;
  border-radius: 4px;
  padding: 30px 30px 10px 30px;
  min-width: 470px;

  li {
    display: grid;
    align-items: center;
    grid-template-columns: 15fr 1fr;
  }

  div {
    li {
      padding: 8px 0;

      & + li {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  }

  button.answer {
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

  .popup-content {
    border-radius: 4px;
    width: 444px !important;
  }
`;

export const DivPopup = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  width: 430px;

  h3 {
    font-size: 14px;
    color: #444444;
    padding: 20px 0 8px 0;
  }

  span {
    font-size: 16px;
    color: #666666;
    line-height: 26px;
  }

  textarea {
    height: 150px;
    width: 388px;
  }

  button.defaultBtn {
    width: 388px;
    height: 45px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  div {
    width: 388px;
  }
`;
