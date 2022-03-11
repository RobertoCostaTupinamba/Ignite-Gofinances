import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import { Container, Header, Title, Content, ChartContainer } from './styles';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormated: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const theme = useTheme();

  async function loadData() {
    const dataKey = '@gofinances:transactions';

    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter((expensive: TransactionData) => expensive.type === 'negative');

    const expensivesTotal: number = expensives.reduce((acumullator: number, expensive: TransactionData) => {
      return acumullator + Number(expensive.amount);
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormated = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormated,
          percent,
        });
      }
    });
    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content contentContainerStyle={{ flex: 1, padding: 24 }}>
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="percent"
            y="total"
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: { fontSize: RFValue(18), fontWeight: 'bold', fill: theme.colors.shape },
            }}
            labelRadius={50}
          />
        </ChartContainer>
        {totalByCategories.map(item => (
          <HistoryCard key={item.key} title={item.name} amount={item.totalFormated} color={item.color} />
        ))}
      </Content>
    </Container>
  );
}