import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import { Content } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('* Email required'),
  password: Yup.string().required('* Password required')
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    console.tron.log(loading);
    dispatch(signInRequest(email, password));
  }
  return (
    <Content>
      <>
        <img src={logo} alt="Gympoint" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <strong>EMAIL</strong>
          <Input name="email" type="email" placeholder="example@email.com" />
          <strong>PASSWORD</strong>
          <Input name="password" type="password" placeholder="*************" />
          <button type="submit">{loading ? 'Loading...' : 'Login'}</button>
        </Form>
      </>
    </Content>
  );
}
