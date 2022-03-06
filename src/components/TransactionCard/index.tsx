import React from 'react';

import { categories } from '../../utils/categories';
import { Container, Title, Amount, Footer, Category, Icon, CategoryName, Date } from './styles';

export interface TransactionCardProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
  const { type, name, amount, category, date } = data;
  const categorys = categories.filter(item => item.key === category)[0];

  return (
    <Container>
      <Title>{name}</Title>

      <Amount type={type}>
        {type === 'negative' && '- '}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={categorys.icon} />

          <CategoryName>{categorys.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
