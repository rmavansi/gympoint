import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logoP1 from '~/assets/logoP1.png';
import logoP2 from '~/assets/logoP2.png';

import { Container, Content, Profile, Navigation, Teste } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  const user = useSelector(state => state.user);

  return (
    <Container>
      <Content>
        <Navigation>
          <div>
            <img src={logoP1} alt="Gympoint" />
            <img src={logoP2} alt="Gympoint" />
            <p>GYMPOINT</p>
          </div>
          <nav>
            <NavLink to="/members">MEMBERS</NavLink>
            <NavLink to="/memberships">MEMBERSHIPS</NavLink>
            <NavLink to="/membermanagement">MEMBER MANAGEMENT</NavLink>
            <NavLink to="/questions">QUESTIONS</NavLink>
          </nav>
        </Navigation>
        <aside>
          <Profile>
            <div>
              <strong>{user.user.name}</strong>
              <Link to="/" onClick={handleSignOut}>
                Log out
              </Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
