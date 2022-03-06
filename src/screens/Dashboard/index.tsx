import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransaction() {
    const dataKey = '@gofinances:transactions';

    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormated: DataListProps[] = transactions.map((transaction: DataListProps) => {
      const amount = Number(transaction.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(transaction.date));

      return {
        id: transaction.id,
        name: transaction.name,
        amount,
        type: transaction.type,
        category: transaction.category,
        date,
      };
    });

    setData(transactionsFormated);
  }

  useEffect(() => {
    loadTransaction();
  }, []);

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

          <LogoutButton
            onPress={() => {
              console.log('á');
            }}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransition="Última entrada dia 13 de abril"
        />
        <HighlightCard type="down" title="Saídas" amount="R$ 1.259,00" lastTransition="Última saída dia 03 de abril" />
        <HighlightCard type="total" title="Total" amount="R$ 16.141,00" lastTransition="01 à 16 de abril" />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          key="string"
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
