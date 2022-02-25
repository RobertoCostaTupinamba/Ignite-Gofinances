import React, { useState } from 'react';
import { Alert, Keyboard, Modal } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../../screens/CategorySelect';

import { Container, Header, Title, Form, Fields, TransactionsType } from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface FormData {
  [name: string]: any;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório'),
});

export function Register() {
  const [transactionsType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    console.log('b');
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    console.log('a');

    setCategoryModalOpen(false);
  }

  function handleRegister(form: FormData) {
    if (!transactionsType) {
      return Alert.alert('Selecione o tipo da transação');
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionsType,
      category: category.key,
    };
    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }} containerStyle={{ flex: 1 }}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

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
    </TouchableWithoutFeedback>
  );
}
