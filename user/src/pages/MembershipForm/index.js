import React, { useState, useEffect } from 'react';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Head, DivForm } from './styles';

export default function MembershipForm(data) {
  const membership = data.history.location.data;
  const [title, setTitle] = useState(membership ? membership.title : '');
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState(membership ? membership.price : '');
  const [duration, setDuration] = useState(
    membership ? membership.duration : ''
  );

  useEffect(() => {
    setTotalPrice(price * duration);
  }, [price, duration]);

  async function handleSave() {
    if (membership) {
      try {
        await api.put(`memberships/${membership.id}`, {
          title,
          duration,
          price
        });
        history.push('/memberships');
        toast.success('Membership edited successfully!');
      } catch (err) {
        toast.error('Something went wrong!');
      }
    } else {
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
  }
  function handleGoBack() {
    history.push('/memberships');
  }
  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleMonthChange(event) {
    setDuration(event.target.value);
  }

  function handlePriceChange(event) {
    setPrice(event.target.value);
  }

  return (
    <Container>
      <Form /* schema={} */ onSubmit={handleSave}>
        <Head>
          <h1>{membership ? 'Edit membership form' : 'Membership form'}</h1>
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
          <Input
            name="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
          <div>
            <ul>
              <li>
                <strong>DURATION (duration)</strong>
                <Input
                  name="duration"
                  type="text"
                  value={duration}
                  onChange={handleMonthChange}
                />
              </li>
              <li>
                <strong>PRICE/MONTH</strong>
                <Input
                  name="price"
                  type="text"
                  value={price}
                  onChange={handlePriceChange}
                />
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
