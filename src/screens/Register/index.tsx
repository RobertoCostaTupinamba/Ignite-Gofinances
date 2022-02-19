import React, { useState } from 'react';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../../components/Form/CategorySelect';

import { Container, Header, Title, Form, Fields, TransactionsType } from './styles';

export function Register() {
  const [transactionsType, setTransactionType] = useState('');

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Preço" />

          <Input placeholder="Nome" />

          <TransactionsType>
            <TransactionTypeButton
              isActive={transactionsType === 'up'}
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect('up')}
            />
            <TransactionTypeButton
              isActive={transactionsType === 'down'}
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect('down')}
            />
          </TransactionsType>

          <CategorySelect title="Categoria" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
