import React from 'react';

import { render, fireEvent, wait } from '@testing-library/react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render higlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElemente = getByPlaceholderText('E-mail');
    const containerEmelemt = getByTestId('input-container');

    fireEvent.focus(inputElemente);

    await wait(() => {
      expect(containerEmelemt).toHaveStyle('border-color: #ff9000');
      expect(containerEmelemt).toHaveStyle('color: #ff9000');
    });

    fireEvent.blur(inputElemente);

    await wait(() => {
      expect(containerEmelemt).not.toHaveStyle('border-color: #ff9000');
      expect(containerEmelemt).not.toHaveStyle('color: #ff9000');
    });
  });

  it('should keep input border highlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElemente = getByPlaceholderText('E-mail');
    const containerEmelemt = getByTestId('input-container');

    fireEvent.change(inputElemente, {
      target: { value: 'johndoe@example.com.br' },
    });

    fireEvent.blur(inputElemente);

    await wait(() => {
      expect(containerEmelemt).toHaveStyle('color: #ff9000');
    });
  });
});
