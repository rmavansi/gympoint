import React, { useState, useEffect, useCallback } from 'react';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { addMonths, format } from 'date-fns';
import AsyncSelect from 'react-select/async';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Head, DivForm } from './styles';

export default function MemberManagementForm(data) {
  const memberManagement = data.history.location.data;

  const [memberships, setMemberships] = useState([]);

  const [selectedMember, setSelectedMember] = useState(
    memberManagement ? memberManagement.member.id : ''
  );
  const [selectedMembership, setSelectedMembership] = useState(
    memberManagement ? memberManagement.membership.id : ''
  );

  const [newDate, setNewDate] = useState(
    memberManagement ? new Date(memberManagement.start_dat) : new Date()
  );

  const [newDuration, setNewDuration] = useState(0);

  const [newEndDate, setEndDate] = useState(
    memberManagement
      ? format(new Date(memberManagement.end_dat), 'MM/dd/yyyy')
      : format(new Date(), 'MM/dd/yyyy')
  );
  const [totalPrice, setTotalPrice] = useState(
    memberManagement ? memberManagement.price : 0
  );

  /**
   * Get all members and memberships from api
   */
  useEffect(() => {
    async function loadMembersAndMemberships() {
      const resp = await api.get('memberships');
      setMemberships(resp.data);
    }
    loadMembersAndMemberships();
  }, []);

  /**
   * Save button to insert data into database
   */
  async function handleSave() {
    if (memberManagement) {
      try {
        await api.put(`enrollments/${memberManagement.id}`, {
          member_id: selectedMember,
          membership_id: selectedMembership,
          start_date: newDate
        });
        history.push('/membermanagement');
        toast.success('Membership edited!');
      } catch (err) {
        toast.error('Something went wrong!');
      }
    } else {
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
    setSelectedMember(event.value);
  }

  /**
   * Load members into async select
   */

  async function handleLoadMembers(inputValue) {
    const response = await api.get(`members/?name=${inputValue}`);
    const inputMembers = response.data.map(member => ({
      value: member.id,
      label: member.name
    }));
    return inputMembers;
  }

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
          <AsyncSelect
            id="names"
            cacheOptions
            loadOptions={handleLoadMembers}
            defaultOptions
            onChange={handleMemberChange}
          />

          <div>
            <ul>
              <li>
                <strong>MEMBERSHIP</strong>
                <select
                  id="titles"
                  onChange={handleMembershipChange}
                  value={selectedMembership}
                >
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
