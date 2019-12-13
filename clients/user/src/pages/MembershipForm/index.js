import React, { useState, useEffect } from 'react';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Head, DivForm } from './styles';

export default function MembershipForm() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [months, setMonths] = useState(0);

  useEffect(() => {
    setTotalPrice(newPrice * months);
  }, [newPrice, months]);

  async function handleSave({ title, duration, price }) {
    try {
      await api.post('memberships', {
        title,
        duration,
        price
      });
      history.push('/memberships');
      toast.success('Membership added successfully!');
    } catch (err) {
      toast.error('Something went wrong!');
    }
  }
  function handleGoBack() {
    history.push('/memberships');
  }

  function handleChangeMonth(event) {
    setMonths(event.target.value);
  }

  function handleChangePrice(event) {
    setNewPrice(event.target.value);
  }

  return (
    <Container>
      <Form /* schema={} */ onSubmit={handleSave}>
        <Head>
          <h1>Memberships form</h1>
          <div className="divBtn">
            <button
              type="button"
              onClick={() => handleGoBack()}
              className="defaultBtn backBtn"
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
          <strong>TITLE</strong>
          <Input name="title" type="text" />
          <div>
            <ul>
              <li>
                <strong>DURATION (months)</strong>
                <Input
                  name="duration"
                  type="text"
                  onChange={handleChangeMonth}
                />
              </li>
              <li>
                <strong>PRICE/MONTH</strong>
                <Input name="price" type="text" onChange={handleChangePrice} />
              </li>
              <li>
                <strong>TOTAL PRICE</strong>
                <Input name="total" type="text" value={totalPrice} disabled />
              </li>
            </ul>
          </div>
        </DivForm>
      </Form>
    </Container>
  );
}
