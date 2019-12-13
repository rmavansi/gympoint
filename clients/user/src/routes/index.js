import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Members from '../pages/Members';
import Memberships from '../pages/Memberships';
import MemberManagement from '../pages/MemberManagement';
import Questions from '../pages/Questions';

import MemberForm from '../pages/MemberForm';
import MembershipForm from '../pages/MembershipForm';
import MemberManagementForm from '../pages/MemberManagementForm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/members" component={Members} isPrivate />
      <Route path="/memberships" component={Memberships} isPrivate />
      <Route path="/membermanagement" component={MemberManagement} isPrivate />
      <Route path="/questions" component={Questions} isPrivate />

      <Route path="/memberform" component={MemberForm} isPrivate />
      <Route path="/membershipform" component={MembershipForm} isPrivate />
      <Route
        path="/membermanagementform"
        component={MemberManagementForm}
        isPrivate
      />
    </Switch>
  );
}
