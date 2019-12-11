import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Members from '../pages/Members';
import Memberships from '../pages/Memberships';
import MemberManagement from '../pages/MemberManagement';
import Questions from '../pages/Questions';

import MemberForm from '../pages/MemberForm';
import MemberEdit from '../pages/MemberEdit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/members" component={Members} isPrivate />
      <Route path="/memberships" component={Memberships} isPrivate />
      <Route path="/membermanagement" component={MemberManagement} isPrivate />
      <Route path="/questions" component={Questions} isPrivate />

      <Route path="/memberform" component={MemberForm} isPrivate />
      <Route path="/memberedit" component={MemberEdit} isPrivate />
    </Switch>
  );
}
