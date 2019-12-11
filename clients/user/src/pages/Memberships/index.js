import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';

import { Container, Content, Head, ListWrapper } from './styles';

export default function Membershipships() {
  const [Memberships, setMemberships] = useState([]);
  useEffect(() => {
    async function loadMemberships() {
      const response = await api.get('memberships');
      setMemberships(response.data);
    }
    loadMemberships();
  }, []);

  function handleAddMembership(id) {
    console.tron.log(id);
  }

  return (
    <Container>
      <Content>
        <Head>
          <h1>Membership List</h1>
          <div>
            <button type="button">
              <MdAdd size={20} className="mdAdd" />
              ADD
            </button>
          </div>
        </Head>
        <ListWrapper>
          <>
            <div>
              <li className="HeadLi">
                <strong>TITLE</strong>
                <strong className="ageColumn">DURATION</strong>
                <strong className="ageColumn">PRICE/MONTH</strong>
              </li>
            </div>
            {Memberships.map(membership => (
              <li key={membership.id}>
                <span>{membership.title}</span>
                <span className="ageColumn">{membership.duration}</span>
                <span className="ageColumn">{membership.price}</span>
                <button
                  type="button"
                  onClick={() => handleAddMembership(membership.id)}
                >
                  edit
                </button>
                <button
                  type="button"
                  className="deleteBtn"
                  onClick={() => handleAddMembership(membership.id)}
                >
                  delete
                </button>
              </li>
            ))}
          </>
        </ListWrapper>
      </Content>
    </Container>
  );
}
