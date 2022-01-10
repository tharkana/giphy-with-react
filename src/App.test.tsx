import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Test Main App', () => {
  test('renders Header', () => {
    render(<App />);
    const header = screen.getByText("Giphy Image Gallery");
    expect(header).toBeInTheDocument();
  });
});

