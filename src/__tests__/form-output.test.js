// tests here:

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../Components/Form';
// import axios from 'axios';

// jest.mock('axios');

// const url = 'https://pokeapi.co/api/v2/pokemon';
// const onComplete = jest.fn();
// const apiData = {
//   "count": 1154,
//   "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
//   "previous": null,
//   "results": [
//     {
//       "name": "bulbasaur",
//       "url": "https://pokeapi.co/api/v2/pokemon/1/",
//     },
//   ]
// }

// beforeEach(() => {
//   axios.get.mockResolvedValue({ data: apiData });
// })

describe('Form Tests', () => {

  it('should render a form', () => {
    render(<Form />);

    const form = screen.getByTestId('form');
    const button = screen.getByTestId('submitButton');
    const input = screen.getByTestId('input');

    expect(form).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('should handleSubmit when the submit button is clicked', () => {
    const handleApiCall = jest.fn();

    render(<Form handleApiCall={handleApiCall} />);

    const button = screen.getByTestId('submitButton');
    fireEvent.click(button);

    // expect(axios.get).toBeCalledWith(url);
    expect(handleApiCall).toHaveBeenCalled();
    expect(handleApiCall).toHaveBeenCalledWith({
      method: 'GET',
      url: '',
      body: {},
    });
  });
});