import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// import axios from 'axios';
// import App from '../App';
import Form from '../Components/Form';
import Results from '../Components/Results';

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

const server = setupServer(
  rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
    return res(
      ctx.json({
        count: 1154,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
        previous: null,
        results: [
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
          },
        ],
      })
  )}),
);

beforeAll(() => server.listen());
// beforeAll(() => {
//   const resData = server.response.data;
//   console.log(resData);
// });
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
    const updateReqParams = jest.fn();

    render(<Form updateReqParams={updateReqParams} />);

    const button = screen.getByTestId('submitButton');
    fireEvent.click(button);

    expect(updateReqParams).toHaveBeenCalled();
    expect(updateReqParams).toHaveBeenCalledWith({
      method: 'GET',
      url: '',
      body: {},
    });
  });

  it('should update the url when the input is changed', () => {
    const updateReqParams = jest.fn();

    render(<Form updateReqParams={updateReqParams} />);

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'https://pokeapi.co/api/v2/pokemon' } });

    expect(input.value).toBe('https://pokeapi.co/api/v2/pokemon');
  });

  it('should update the method when the select is changed', () => {
    const updateReqParams = jest.fn();

    render(<Form updateReqParams={updateReqParams} />);

    const select = screen.getByTestId('selectPost');
    fireEvent.change(select, { target: { value: 'POST' } });

    expect(select.value).toBe('POST');
  });

  it('should update the url, method, and body when the form is submitted', () => {
    const updateReqParams = jest.fn();

    render(<Form updateReqParams={updateReqParams} />);

    const input = screen.getByTestId('input');
    const select = screen.getByTestId('selectGet');
    const button = screen.getByTestId('submitButton');
    
    fireEvent.change(input, { target: { value: 'https://pokeapi.co/api/v2/pokemon' } });
    fireEvent.change(select, { target: { value: 'GET' } });
    fireEvent.click(button);

    expect(updateReqParams).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon',
      body: {},
    });
  });

  it('should render the results when the form is submitted', async () => {
    const updateReqParams = jest.fn();
    const resData = {
      count: 1154,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
      previous: null,
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
      ],
    };

    render(
      <>
        <Form updateReqParams={updateReqParams} />
        <Results data={resData} />
      </>
    );

    const input = screen.getByTestId('input');
    const button = screen.getByTestId('submitButton');

    fireEvent.change(input, { target: { value: 'https://pokeapi.co/api/v2/pokemon' } });
    fireEvent.click(button);

    const results = await screen.findByTestId('results');
    expect(results).toBeInTheDocument();
    expect(results).toHaveTextContent('bulbasaur');
  });
});