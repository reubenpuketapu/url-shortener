import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { App } from './App';

import { v4 as uuid } from 'uuid';

/**
 * @jest-environment jsdom
 */

test('renders input', () => {
  render(<App apiUrl='http://web-api-tests'/>);
  
  const linkElement = screen.getByPlaceholderText('convert your url');
  expect(linkElement).toBeInTheDocument();
});

test('renders newly created row', async () => {
  render(<App apiUrl='http://web-api-tests'/>);

  const id = uuid();

  const loadingElement = screen.getByText('Loading...');

  await waitForElementToBeRemoved(loadingElement).then(() =>
    console.log('Element no longer in DOM'),
  )
  
  const linkElement = screen.getByPlaceholderText('convert your url');
  linkElement.innerHTML = `https://google${id}.com`;

  const buttonElement = screen.getByText('Submit');
  buttonElement.click();

  const element = screen.getByText(`https://google${id}.com`);
  await waitFor(() => expect(element).toBeInTheDocument())
});
