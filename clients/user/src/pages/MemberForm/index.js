import React from 'react';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Head, DivForm } from './styles';

export default function MemberForm() {
  async function handleSave({ name, email, age, weight, height }) {
    try {
      await api.post('members', {
        name,
        email,
        age,
        weight,
        height
      });
      history.push('/members');
      toast.success('Something went right!');
    } catch (err) {
      toast.error('Something went wrong!');
    }
  }
  function handleGoBack() {
    history.push('/members');
  }

  return (
    <Container>
      <Form /* schema={} */ onSubmit={handleSave}>
        <Head>
          <h1>Member Form</h1>
          <div className="divBtn">
            <button
              type="button"
              onClick={() => handleGoBack()}
              className="backBtn"
            >
              <MdKeyboardArrowLeft size={20} className="mdAdd" />
              BACK
            </button>
            <button type="submit">
              <MdCheck size={20} className="mdAdd" />
              SAVE
            </button>
          </div>
        </Head>
        <DivForm>
          <strong>FULL NAME</strong>
          <Input name="name" type="text" placeholder="Jon Snow" />
          <strong>EMAIL ADDRESS</strong>
          <Input name="email" type="email" placeholder="example@email.com" />
          <div>
            <ul>
              <li>
                <strong>AGE</strong>
                <Input name="age" type="text" />
              </li>
              <li>
                <strong>WEIGHT (KG)</strong>
                <Input name="weight" type="text" />
              </li>
              <li>
                <strong>HEIGHT</strong>
                <Input name="height" type="text" />
              </li>
            </ul>
          </div>
        </DivForm>
      </Form>
    </Container>
  );
}
