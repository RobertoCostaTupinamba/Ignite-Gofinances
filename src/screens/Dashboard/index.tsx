import React from 'react';

import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName, Icon } from './styles';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/41094007?v=4' }} />
            <User>
              <UserGreeting>Ola,</UserGreeting>
              <UserName>Roberto</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>
      </Header>
    </Container>
  );
}
