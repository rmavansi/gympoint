import styled from 'styled-components';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Container = styled.div`
  margin: 0 270px;
  min-width: 945px;

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

  button.defaultBtn {
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

  div {
    ul {
      display: flex;
    }

    li {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      & + li {
        margin-left: 15px;
      }
    }

    input {
      margin: 10px 0;
    }
    input.dp {
      width: 200px;
    }
  }

  select {
    margin-top: 10px;

    .select-selected:after {
      position: absolute;
      content: '';
      top: 14px;
      right: 10px;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-color: #fff transparent transparent transparent;
    }
  }
`;

export const ASelect = styled(AsyncSelect)`
  padding: 10px 0;
  font-size: 16px;
  color: #333333;
  .css-1hwfws3 {
    height: 39px;
  }
`;

export const DPicker = styled(DatePicker)`
  width: 100% !important;
`;

export const Selec = styled(Select)`
  width: 100% !important;
  padding: 10px 0;
  font-size: 16px;
  height: 41px;
  min-width: 200px;

  .css-1hwfws3 {
    height: 39px;
  }
`;
