import React, { useState, useEffect, useCallback } from 'react';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { addMonths, format } from 'date-fns';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Head, DivForm, Selec, ASelect, DPicker } from './styles';

export default function MemberManagementForm(data) {
  const memberManagement = data.history.location.data;

  const [memberships, setMemberships] = useState([]);

  const [selectedMember, setSelectedMember] = useState(
    memberManagement ? memberManagement.member : ''
  );
  const [selectedMembership, setSelectedMembership] = useState(
    memberManagement ? memberManagement.membership : ''
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
          member_id: selectedMember.id,
          membership_id: selectedMembership.id,
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
          member_id: selectedMember.id,
          membership_id: selectedMembership.id,
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
    setSelectedMembership({ id: event.value, title: event.label });
    memberships.map(membership => {
      if (event.value.toString() === membership.id.toString()) {
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
    setSelectedMember({ id: event.value, name: event.label });
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

  function handleMemberValue() {
    if (selectedMember) {
      return {
        value: selectedMember.id,
        label: selectedMember.name
      };
    }
  }

  function handleMembershipValue() {
    if (selectedMembership) {
      return {
        value: selectedMembership.id,
        label: selectedMembership.title
      };
    }
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
          <ASelect
            id="names"
            cacheOptions
            loadOptions={handleLoadMembers}
            defaultOptions
            defaultValue={handleMemberValue()}
            onChange={handleMemberChange}
          />

          <div>
            <ul>
              <li>
                <strong>MEMBERSHIP</strong>
                <Selec
                  id="titles"
                  options={memberships.map(membership => ({
                    value: membership.id,
                    label: membership.title
                  }))}
                  defaultValue={handleMembershipValue()}
                  onChange={handleMembershipChange}
                />
              </li>
              <li>
                <strong>START DATE</strong>

                <DPicker
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
