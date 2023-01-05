import React from 'react';
import axios from 'axios';
import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import History from './Components/History';
import Results from './Components/Results';

import { useEffect, useReducer } from 'react';

const App = () => {
  const initialState = {
    resData: null,
    reqParams: {},
    history: [],
    loading: false,
  };

  const reducerSwitch = (state = initialState, action) => {
    switch (action.type) {
      case 'setResData':
        return { ...state, resData: action.payload };
      case 'setReqParams':
        return { ...state, reqParams: action.payload };
      case 'setHistory':
        return { ...state, history: [...state.history, action.payload]};
      case 'setLoading':
        return { ...state, loading: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerSwitch, initialState);
  const { resData, reqParams, history, loading } = state;

  useEffect(() => {
    if (reqParams.url) {
      dispatch({ type: 'setLoading', payload: true });
      callApi(reqParams);
      // updateHistory(reqParams);
    }
  }, [reqParams]);

  const updateReqParams = (reqParams) => {
    dispatch({ type: 'setReqParams', payload: reqParams });
    dispatch({
      type: 'setHistory', 
      payload: {
        reqParams
      } 
    });
  }

  // const updateHistory = (reqParams) => {
  // }
  
  async function callApi (reqParams) {
    const { method, url, body } = reqParams;

    try {
      if (!method || !url) {
        throw new Error('ERROR: Request is not defined, please enter a URL and choose a method.');

      } else if ((method === 'POST' || method === 'PUT') && !body) {
        throw new Error(
          "ERROR: Request Body is not defined, please enter a JSON Request Body and try again."
        );

      } else {
        const res = await axios({
          method,
          url,
          data: body,
        });

        dispatch({ 
          type: 'setResData', 
          payload: {
            headers: res.headers,
            body: res.data,
          },
        });

        dispatch({ type: 'setLoading', payload: false });
      }
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {reqParams.method}</div>
      <div>URL: {reqParams.url}</div>
      <Form updateReqParams={updateReqParams} />
      <Results data={resData} loading={loading} data-testid='jsonBody' />
      <History history={history} updateReqParams={updateReqParams} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
