import React from 'react';
import axios from 'axios';
import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

import { useState, useEffect } from 'react';

const App = () => {
  const [resData, setResData] = useState(null);
  const [reqParams, setReqParams] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reqParams.url) {
      callApi(reqParams);
    }
  }, [reqParams]);

  const updateReqParams = (reqParams) => {
    setReqParams(reqParams);
  }
  
  async function callApi (reqParams) {
    const { method, url, body } = reqParams;
    setLoading(true);

    console.log('method', method);

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
        setResData({
          headers: res.headers,
          body: res.data,
        });
    
        setLoading(false);
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
      <Footer />
    </React.Fragment>
  );
}

export default App;
