import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Tela de login', () => {
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
    userEvent.type(passwordEl, '123456');

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

    userEvent.type(emailEl, 'matheus@matheus.com');
    userEvent.type(passwordEl, '123456');

    expect(buttonEl).toBeEnabled();
  });

  test('Verifica se ao clicar no botão, é redirecionado para o diretório .../carteira', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    const emailEl = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const passwordEl = screen.getByLabelText(/senha:/i);
    const buttonEl = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailEl, 'matheus@matheus.com');
    userEvent.type(passwordEl, '123456');

    expect(buttonEl).toBeEnabled();

    userEvent.click(buttonEl);

    const { user: { email } } = store.getState();
    expect(email).toBe('matheus@matheus.com');

    expect(history.location.pathname).toBe('/carteira');
  });
});

// describe('Tela da carteira', () => {
  
// });
