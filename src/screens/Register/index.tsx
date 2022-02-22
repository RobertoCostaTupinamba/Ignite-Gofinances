import React, { useState } from 'react';
import { Modal } from 'react-native';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../../screens/CategorySelect';

import { Container, Header, Title, Form, Fields, TransactionsType } from './styles';

export function Register() {
  const [transactionsType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category',
  });

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
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

          <CategorySelectButton onPress={handleOpenSelectCategoryModal} title={category.name} />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
