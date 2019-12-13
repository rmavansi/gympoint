import React, { useState, useEffect, useCallback } from 'react';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { addMonths, format } from 'date-fns';
// import AsyncSelect from 'react-select/async';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Head, DivForm } from './styles';

export default function MemberManagementForm() {
  const [members, setMembers] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [selectedMember, setSelectedMember] = useState();
  const [selectedMembership, setSelectedMembership] = useState();

  const [newDate, setNewDate] = useState(new Date());

  const [newDuration, setNewDuration] = useState(0);

  const [newEndDate, setEndDate] = useState(
    format(addMonths(new Date(), 0), 'MM/dd/yyyy')
  );

  const [totalPrice, setTotalPrice] = useState(0);

  /**
   * Get all members and memberships from api
   */
  useEffect(() => {
    async function loadMembersAndMemberships() {
      const response = await api.get('members');
      setMembers(response.data);

      const resp = await api.get('memberships');
      setMemberships(resp.data);
    }
    loadMembersAndMemberships();
  }, []);

  /**
   * Save button to insert data into database
   */
  async function handleSave() {
    try {
      await api.post('enrollments', {
        member_id: selectedMember,
        membership_id: selectedMembership,
        start_date: newDate
      });
      history.push('/membermanagement');
      toast.success('Membership added to member!');
    } catch (err) {
      toast.error('Something went wrong!');
    }
  }

  /**
   * Get back to membermanagement page
   */
  function handleGoBack() {
    history.push('/membermanagement');
  }

  /**
   * Update end_date input when new date is passed
   */
  const handleDateChange = useCallback(
    date => {
      setNewDate(date);
      setEndDate(format(addMonths(date, newDuration), 'MM/dd/yyyy'));
    },
    [newDuration]
  );

  function handleMembershipChange(event) {
    setSelectedMembership(event.target.value);
    memberships.map(membership => {
      if (event.target.value === membership.id.toString()) {
        setTotalPrice(membership.price * membership.duration);
        setNewDuration(membership.duration);
        setEndDate(
          format(addMonths(newDate, membership.duration), 'MM/dd/yyyy')
        );
      }
    });
  }

  /**
   * Update sectedMember state with new member input
   */
  function handleMemberChange(event) {
    setSelectedMember(event.target.value);
  }

  const loadOptions = members.map(member => (
    <option value={member.id}>{member.name}</option>
  ));

  return (
    <Container>
      <Form /* schema={} */ onSubmit={handleSave}>
        <Head>
          <h1>Member management form</h1>
          <div className="divBtn">
            <button
              className=" defaultBtn backBtn"
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
          <strong>MEMBER</strong>
          <select id="names" onChange={handleMemberChange}>
            <option value="" />
            {members.map(member => (
              <option value={member.id}>{member.name}</option>
            ))}
          </select>

          <div>
            <ul>
              <li>
                <strong>MEMBERSHIP</strong>
                <select id="titles" onChange={handleMembershipChange}>
                  <option value="" />
                  {memberships.map(membership => (
                    <option value={membership.id}>{membership.title}</option>
                  ))}
                </select>
              </li>
              <li>
                <strong>START DATE</strong>

                <DatePicker
                  className="dp"
                  showPopperArrow={false}
                  selected={newDate}
                  onChange={handleDateChange}
                  value={newDate}
                />
              </li>
              <li>
                <strong>END DATE</strong>
                <Input
                  name="end_date"
                  type="text"
                  value={newEndDate}
                  disabled
                />
              </li>
              <li>
                <strong>TOTAL PRICE</strong>
                <Input
                  name="totalPrice"
                  type="text"
                  value={totalPrice}
                  disabled
                />
              </li>
            </ul>
          </div>
        </DivForm>
      </Form>
    </Container>
  );
}
