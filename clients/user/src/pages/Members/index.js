import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import { toast } from 'react-toastify';

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

  function handleEditMember() {}

  async function handleDeleteMember(id) {
    try {
      await api.delete(`members/${id}`);
      toast.success('Member deleted successfully!');
    } catch (err) {
      toast.error('Something went wrong!');
      console.tron.log(err);
    }
  }
  function handleAddMember() {
    history.push('/memberform');
  }

  return (
    <Container>
      <Head>
        <h1>Member List</h1>
        <div>
          <button type="button" onClick={() => handleAddMember()}>
            <MdAdd size={20} className="mdAdd" />
            ADD
          </button>
          {/* <MdSearch size={20} className="mdSearch" /> */}
          <Input type="text" placeholder="Search" />
        </div>
      </Head>

      <ContentWrapper>
        <ul>
          <li>
            <strong>NAME</strong>
            <strong>EMAIL</strong>
            <strong className="ageColumn">AGE</strong>
          </li>
        </ul>
        <div>
          {members.map(member => (
            <li key={member.id}>
              <span>{member.name}</span>
              <span>{member.email}</span>
              <span className="ageColumn">{member.age}</span>
              <button type="button" onClick={() => handleEditMember(member.id)}>
                edit
              </button>
              <button
                type="button"
                className="deleteBtn"
                onClick={() => handleDeleteMember(member.id)}
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
