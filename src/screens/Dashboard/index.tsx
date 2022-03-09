/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

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
  LoadContainer,
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}
interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();

  function getTotalIntervalTransactionDate(collection: DataListProps[]) {
    if (collection.length === 0) {
      return '';
    }

    const dateArray = collection.map(transaction => new Date(transaction.date).getTime());

    const lastTransaction = new Date(Math.max.apply(Math, [...dateArray]));

    const lastTransactionFormmated = Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(lastTransaction);

    const firstTransaction = new Date(Math.min.apply(Math, [...dateArray]));

    const firstTransactionFormmated = Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(firstTransaction);

    const firstTransactionYear = firstTransaction.getFullYear();
    const lastTransactionYear = lastTransaction.getFullYear();

    return firstTransactionYear === lastTransactionYear
      ? `${firstTransactionFormmated} ~ ${lastTransactionFormmated}`
      : `${firstTransactionFormmated}. ${firstTransactionYear} ~ ${lastTransactionFormmated}. ${lastTransactionYear}`;
  }

  function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {
    if (collection.length === 0) {
      return '';
    }

    const todayDateYear = new Date().getFullYear();

    const dataArray = collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date(transaction.date).getTime());

    const lastTransaction = new Date(Math.max.apply(Math, [...dataArray]));

    const lastTransactionYear = lastTransaction.getFullYear();

    return dataArray.length === 0
      ? ''
      : `${type === 'positive' ? 'Última entrada dia ' : 'Última saída dia '} ${lastTransaction.getDate()} de ${
          todayDateYear === lastTransactionYear
            ? lastTransaction.toLocaleString('pt-BR', { month: 'long' })
            : `${lastTransaction.toLocaleString('pt-BR', { month: 'short' })} de ${lastTransactionYear}`
        }`;
  }

  async function loadTransaction() {
    const dataKey = '@gofinances:transactions';

    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormated: DataListProps[] = transactions.map((transaction: DataListProps) => {
      if (transaction.type === 'positive') {
        entriesTotal += Number(transaction.amount);
      } else {
        expensiveTotal += Number(transaction.amount);
      }

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

    setTransactions(transactionsFormated);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpansives = getLastTransactionDate(transactions, 'negative');
    const totalInterval = getTotalIntervalTransactionDate(transactions);

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTransactionEntries || '',
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTransactionExpansives || '',
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransaction();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransaction();
    }, []),
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
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
              amount={highlightData?.entries?.amount}
              lastTransition={highlightData?.entries?.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData?.expensive?.amount}
              lastTransition={highlightData?.expensive?.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData?.total?.amount}
              lastTransition={highlightData?.total?.lastTransaction}
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              key="string"
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
