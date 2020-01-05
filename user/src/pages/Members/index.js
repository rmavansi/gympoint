import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import ConfirmAlert from '~/components/ConfirmAlert';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Head, ContentWrapper, Input } from './styles';

export default function Members() {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    async function loadMembers() {
      const response = await api.get('members');
      setMembers(response.data);
    }
    loadMembers();
  }, [members]);

  function handleEditMember(member) {
    history.push({
      pathname: '/memberform',
      data: member
    });
  }

  function handleAddMember() {
    history.push('/memberform');
  }

  async function handleSearchChange(event) {
    const response = await api.get(`members/?name=${event.target.value}`);
    setMembers(response.data);
  }

  return (
    <Container>
      <Head>
        <h1>Member list</h1>
        <div>
          <button
            className="defaultBtn"
            type="button"
            onClick={() => handleAddMember()}
          >
            <MdAdd size={20} className="mdAdd" />
            ADD
          </button>
          <Input
            className="search"
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
          />
        </div>
      </Head>

      <ContentWrapper>
        <ul>
          <li>
            <strong>NAME</strong>
            <strong>EMAIL</strong>
            <strong className="centerColumn">AGE</strong>
          </li>
        </ul>
        <div>
          {members.map(member => (
            <li key={member.id}>
              <span>{member.name}</span>
              <span>{member.email}</span>
              <span className="centerColumn">{member.age}</span>
              <button
                className="defaultBtn"
                type="button"
                onClick={() => handleEditMember(member)}
              >
                edit
              </button>
              <button
                type="button"
                className="defaultBtn deleteBtn"
                onClick={() => ConfirmAlert('members', member.id)}
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
