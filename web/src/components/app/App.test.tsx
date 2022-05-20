import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

import { v4 as uuid } from 'uuid';

test('renders input', () => {
  render(<App />);
  
  const linkElement = screen.getByPlaceholderText('convert your url');
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', async () => {
  render(<App />);

  const id = uuid();
  
  const linkElement = screen.getByPlaceholderText('convert your url');
  linkElement.innerHTML = `https://google${id}.com`;

  const buttonElement = screen.getByText('Submit');
  buttonElement.click();

  const element = screen.getByText(`https://google${id}.com`);
  expect(element).toBeInTheDocument();
});
