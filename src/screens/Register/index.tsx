import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../../screens/CategorySelect';

import { Container, Header, Title, Form, Fields, TransactionsType } from './styles';

interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const [transactionsType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category',
  });

  const { control, handleSubmit } = useForm();

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionsType,
      category: category.key,
    };
    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm name="name" control={control} placeholder="Nome" />

          <InputForm name="amount" control={control} placeholder="Preço" />

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

        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
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
