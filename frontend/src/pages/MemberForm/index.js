import React, { useState } from 'react';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Head, DivForm } from './styles';

export default function MemberForm(data) {
  const member = data.history.location.data;
  const [name, setName] = useState(member ? member.name : '');
  const [email, setEmail] = useState(member ? member.email : '');
  const [age, setAge] = useState(member ? member.age : '');
  const [weight, setWeight] = useState(member ? member.weight : '');
  const [height, setHeight] = useState(member ? member.height : '');

  async function handleSave() {
    if (member) {
      try {
        await api.put(`members/${member.id}`, {
          name,
          email,
          age,
          weight,
          height
        });
        history.push('/members');
        toast.success('Member edited successfully!');
      } catch (err) {
        toast.error('Something went wrong!');
      }
    } else {
      try {
        await api.post('members', {
          name,
          email,
          age,
          weight,
          height
        });
        history.push('/members');
        toast.success('Member added successfully!');
      } catch (err) {
        toast.error('Something went wrong!');
      }
    }
  }

  function handleGoBack() {
    history.push('/members');
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handleAgeChange(event) {
    setAge(event.target.value);
  }
  function handleWeightChange(event) {
    setWeight(event.target.value);
  }
  function handleHeightChange(event) {
    setHeight(event.target.value);
  }
  return (
    <Container>
      <Form /* schema={} */ onSubmit={handleSave}>
        <Head>
          <h1>{member ? 'Edit member form' : 'Member form'}</h1>
          <div className="divBtn">
            <button
              className="defaultBtn backBtn"
              type="button"
              onClick={() => handleGoBack()}
            >
              <MdKeyboardArrowLeft size={20} className="mdAdd" />
              BACK
            </button>
            <button className="defaultBtn" type="submit">
              <MdCheck size={20} className="mdAdd" />
              SAVE
            </button>
          </div>
        </Head>
        <DivForm>
          <strong>FULL NAME</strong>
          <Input
            name="name"
            type="text"
            placeholder="Jon Snows"
            value={name}
            onChange={handleNameChange}
          />
          <strong>EMAIL ADDRESS</strong>
          <Input
            name="email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={handleEmailChange}
          />
          <div>
            <ul>
              <li>
                <strong>AGE</strong>
                <Input
                  name="age"
                  type="text"
                  value={age}
                  onChange={handleAgeChange}
                />
              </li>
              <li>
                <strong>WEIGHT (KG)</strong>
                <Input
                  name="weight"
                  type="text"
                  value={weight}
                  onChange={handleWeightChange}
                />
              </li>
              <li>
                <strong>HEIGHT</strong>
                <Input
                  name="height"
                  type="text"
                  value={height}
                  onChange={handleHeightChange}
                />
              </li>
            </ul>
          </div>
        </DivForm>
      </Form>
    </Container>
  );
}
