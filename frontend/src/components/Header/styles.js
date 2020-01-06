import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  min-width: 850px;

  .active {
    color: #444444;
  }
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img:last-of-type {
    margin-left: -13px;
  }

  img {
    margin-left: 5px;
  }

  p {
    font-weight: bold;
    color: #ee4d64;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 15px;
    text-align: left;
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    border-right: 1px solid #ccc;
  }

  nav {
    display: flex;

    a {
      font-weight: bold;
      margin-left: 20px;
      font-size: 15px;
      color: #999999;
      text-align: left;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 5px;
  padding-left: 5px;

  div {
    strong {
      display: block;
      font-size: 14px;
      color: #666666;
      text-align: left;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 14px;
      color: #de3b3b;
      text-align: right;
      margin-left: 40px;
    }
  }
`;
