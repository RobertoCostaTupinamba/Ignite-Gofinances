import React from 'react';

import { Container, Title, Amount, Footer, Category, Icon, CategoryName, Date } from './styles';

interface Category {
  name: string;
  icon: string;
}

interface IData {
  title: string;
  amount: string;
  category: Category;
  date: string;
}

interface Props {
  data: IData;
}

export function TransactionCard({ data }: Props) {
  const { title, amount, category, date } = data;
  return (
    <Container>
      <Title>{title}</Title>

      <Amount>{amount}</Amount>

      <Footer>
        <Category>
          <Icon name="dollar-sign" />

          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
