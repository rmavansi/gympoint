import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Members from '../pages/Members';
import Memberships from '../pages/Memberships';
import MemberManagement from '../pages/MemberManagement';
import Questions from '../pages/Questions';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/members" component={Members} isPrivate />
      <Route path="/memberships" component={Memberships} isPrivate />
      <Route path="/membermanagement" component={MemberManagement} isPrivate />
      <Route path="/questions" component={Questions} isPrivate />
    </Switch>
  );
}
