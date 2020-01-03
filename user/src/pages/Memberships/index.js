import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Head, ContentWrapper } from './styles';

export default function Memberships() {
  const [memberships, setMemberships] = useState([]);
  useEffect(() => {
    async function loadMemberships() {
      const response = await api.get('memberships');
      setMemberships(response.data);
    }
    loadMemberships();
  }, [memberships]);

  function handleEditMembership(membership) {
    history.push({
      pathname: '/membershipform',
      data: membership
    });
  }

  async function handleDeleteMembership(id) {
    try {
      await api.delete(`memberships/${id}`);
      toast.success('Membership deleted successfully!');
    } catch (err) {
      toast.error('Something went wrong!');
      console.tron.log(err);
    }
  }
  function handleAddMembership() {
    history.push('/membershipform');
  }

  return (
    <Container>
      <Head>
        <h1>Membership list</h1>
        <div>
          <button
            className="defaultBtn"
            type="button"
            onClick={() => handleAddMembership()}
          >
            <MdAdd size={20} className="mdAdd" />
            ADD
          </button>
        </div>
      </Head>

      <ContentWrapper>
        <ul>
          <li>
            <strong>TITLE</strong>
            <strong className="centerColumn">DURATION</strong>
            <strong className="centerColumn">PRICE/MONTH</strong>
          </li>
        </ul>
        <div>
          {memberships.map(membership => (
            <li key={membership.id}>
              <span>{membership.title}</span>
              <span className="centerColumn">
                {membership.duration}{' '}
                {membership.duration === 1 ? 'month' : 'months'}
              </span>
              <span className="centerColumn">${membership.price}</span>
              <button
                className="defaultBtn"
                type="button"
                onClick={() => handleEditMembership(membership)}
              >
                edit
              </button>
              <button
                type="button"
                className="defaultBtn deleteBtn"
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you wish to delete this membership?'
                    )
                  )
                    handleDeleteMembership(membership.id);
                }}
              >
                delete
              </button>
            </li>
          ))}
        </div>
      </ContentWrapper>
    </Container>
  );
}
