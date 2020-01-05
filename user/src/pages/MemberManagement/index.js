import React, { useState, useEffect } from 'react';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import ConfirmAlert from '~/components/ConfirmAlert';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Head, ContentWrapper } from './styles';

export default function MemberManagement() {
  const [memberManagements, setMemberManagements] = useState([]);

  useEffect(() => {
    async function loadMembers() {
      const response = await api.get('enrollments/0');

      const responseFormatted = response.data.map(oneResponse => {
        return {
          ...oneResponse,
          start_dat: oneResponse.start_date,
          end_dat: oneResponse.end_date,
          start_date: format(parseISO(oneResponse.start_date), 'MMMM do, yyyy'),
          end_date: format(parseISO(oneResponse.end_date), 'MMMM do, yyyy')
        };
      });

      setMemberManagements(responseFormatted);
    }
    loadMembers();
  }, [memberManagements]);

  function handleEditmMemberManagement(memberManagement) {
    history.push({
      pathname: '/membermanagementform',
      data: memberManagement
    });
  }

  function handleAddMemberManagement() {
    history.push('/membermanagementform');
  }

  return (
    <Container>
      <Head>
        <h1>Member management</h1>
        <div>
          <button
            className="defaultBtn"
            type="button"
            onClick={() => handleAddMemberManagement()}
          >
            <MdAdd size={20} className="mdAdd" />
            ADD
          </button>
        </div>
      </Head>

      <ContentWrapper>
        <ul>
          <li>
            <strong>NAME</strong>
            <strong className="centerColumn">MEMBERSHIP</strong>
            <strong className="centerColumn">START DATE</strong>
            <strong className="centerColumn">END DATE</strong>
            <strong className="centerColumn">STATUS</strong>
          </li>
        </ul>
        <div>
          {memberManagements.map(memberManagement => (
            <li key={memberManagement.id}>
              <span>{memberManagement.member.name}</span>
              <span className="centerColumn">
                {memberManagement.membership.title}
              </span>
              <span className="centerColumn">
                {memberManagement.start_date}
              </span>
              <span className="centerColumn">{memberManagement.end_date}</span>
              <span className="centerColumn">
                {memberManagement.active ? (
                  <MdCheckCircle size={20} color="#42cb59" />
                ) : (
                  <MdCheckCircle size={20} color="#dddddd" />
                )}
              </span>
              <button
                className=" defaultBtn"
                type="button"
                onClick={() => handleEditmMemberManagement(memberManagement)}
              >
                edit
              </button>
              <button
                type="button"
                className="defaultBtn deleteBtn"
                onClick={() => ConfirmAlert('enrollments', memberManagement.id)}
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
