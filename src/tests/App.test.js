import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const firstExpense = {
  id: 0,
  value: '1',
  description: 'Primeiro',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: mockData,
};

const INITIAL_STATE = {
  user: {
    email: '',
    password: '',
  },
  wallet: {
    despesaTotal: '0',
    expenses: [firstExpense],
    editor: false,
    idToEdit: 0,
    currencies: Object.keys(mockData),
  },
};

describe('Tela de login', () => {
  const INPUT_EMAIL = 'matheus@matheus.com';
  const INPUT_PASSWORD = '123456';
  test('Verifica se a tela Login é renderizada com dois inputs e um botão', () => {
    // 1. Acessar
    renderWithRouterAndRedux(<App />);
    const emailEl = screen.getByText(/email:/i);
    const passwordEl = screen.getByText(/senha:/i);
    const buttonEl = screen.getByRole('button', {
      name: /entrar/i,
    });
    // 2. Agir

    // 3. Aferir
    expect(emailEl).toBeInTheDocument();
    expect(passwordEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  });

  test('Verifica se o botão esta desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEl = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(buttonEl).toBeDisabled();
  });

  test('Verifica se o botão fica desabilidato ao digitar um email incorreto e uma senha inferior a 6 caracteres', () => {
    renderWithRouterAndRedux(<App />);
    const emailEl = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const passwordEl = screen.getByLabelText(/senha:/i);
    const buttonEl = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailEl, 'matheus');
    userEvent.type(passwordEl, INPUT_PASSWORD);

    expect(buttonEl).toBeDisabled();

    userEvent.clear(emailEl);
    userEvent.clear(passwordEl);

    userEvent.type(emailEl, 'matheus@.com');
    userEvent.type(passwordEl, '1234');

    expect(buttonEl).toBeDisabled();
  });

  test('Verifica se o botão fica habilitado quando entra com email e senha correto', () => {
    renderWithRouterAndRedux(<App />);
    const emailEl = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const passwordEl = screen.getByLabelText(/senha:/i);
    const buttonEl = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailEl, INPUT_EMAIL);
    userEvent.type(passwordEl, INPUT_PASSWORD);

    expect(buttonEl).toBeEnabled();
  });

  test('Verifica se ao clicar no botão, salva o valor do email na store e é redirecionado para o diretório .../carteira', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    const emailEl = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const passwordEl = screen.getByLabelText(/senha:/i);
    const buttonEl = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailEl, INPUT_EMAIL);
    userEvent.type(passwordEl, INPUT_PASSWORD);

    expect(buttonEl).toBeEnabled();

    act(() => userEvent.click(buttonEl));

    const { user: { email } } = store.getState();
    expect(email).toBe(INPUT_EMAIL);

    expect(history.location.pathname).toBe('/carteira');
  });
});

describe('Tela da carteira', () => {
  test('HEADER - Verifica se existe um email, dsspesa total, sigla BRL na tela', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const emailEl = screen.getByTestId('email-field');
    const totalCurrencyEl = screen.getByTestId('total-field');
    const codeCurrencyEl = screen.getByTestId('header-currency-field');

    expect(emailEl).toBeInTheDocument();
    expect(totalCurrencyEl).toBeInTheDocument();
    expect(codeCurrencyEl).toBeInTheDocument();
  });

  test('FORM - Verifica se existe os inputs de valor gasto, descrição, tipo de moeda, modo de pagamento, tipo de despesa e um botão', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const amountSpentEl = screen.getByTestId('value-input');
    const descriptionEL = screen.getByTestId('description-input');
    const coinEl = screen.getByTestId('currency-input');
    const paymentMethodEl = screen.getByTestId('method-input');
    const typeExpenseEl = screen.getByTestId('tag-input');
    const buttonEl = screen.getByRole('button', { name: /Adicionar despesa/ });

    expect(amountSpentEl).toBeInTheDocument();
    expect(descriptionEL).toBeInTheDocument();
    expect(coinEl).toBeInTheDocument();
    expect(paymentMethodEl).toBeInTheDocument();
    expect(typeExpenseEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  });

  test('HEADER - Verifica se o valor da despesa total é alterada', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: INITIAL_STATE });

    // HEADER
    const emailEl = screen.getByTestId('email-field');
    const totalCurrencyEl = screen.getByTestId('total-field');
    const codeCurrencyEl = screen.getByTestId('header-currency-field');

    // FORM
    const amountSpentEl = screen.getByTestId('value-input');
    const descriptionEL = screen.getByTestId('description-input');
    const coinEl = screen.getByTestId('currency-input');
    const paymentMethodEl = screen.getByTestId('method-input');
    const typeExpenseEl = screen.getByTestId('tag-input');
    const buttonEl = screen.getByRole('button', { name: /Adicionar despesa/ });

    // HEADER
    expect(emailEl).toBeInTheDocument();
    expect(totalCurrencyEl).toBeInTheDocument();
    expect(codeCurrencyEl).toBeInTheDocument();

    // FORM
    expect(amountSpentEl).toBeInTheDocument();
    expect(descriptionEL).toBeInTheDocument();
    expect(coinEl).toBeInTheDocument();
    expect(paymentMethodEl).toBeInTheDocument();
    expect(typeExpenseEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();

    userEvent.type(amountSpentEl, '123');
    userEvent.type(descriptionEL, 'Primeiro');

    expect(amountSpentEl.value).toEqual('123');
    expect(descriptionEL.value).toEqual('Primeiro');

    act(() => userEvent.click(buttonEl));

    expect(amountSpentEl.value).toEqual('');
    expect(descriptionEL.value).toEqual('');

    userEvent.type(amountSpentEl, '456');
    userEvent.type(descriptionEL, 'Segundo');

    act(() => userEvent.click(buttonEl));

    expect(amountSpentEl.value).toEqual('456');
    expect(descriptionEL.value).toEqual('Segundo');

    const firstExpenseDescriptonEL = await screen.findByText('Primeiro');
    const secondExpenseDescriptonEL = await screen.findByText('Segundo');
    expect(firstExpenseDescriptonEL).toBeInTheDocument();
    expect(secondExpenseDescriptonEL).toBeInTheDocument();

    const firstButtonDeleteEl = screen.getAllByTestId('delete-btn');
    expect(firstButtonDeleteEl).toHaveLength(2);

    userEvent.click(firstButtonDeleteEl);
  });
});
