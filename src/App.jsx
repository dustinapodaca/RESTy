import React from 'react';
import './App.scss';
import axios from 'axios';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

import { useState } from 'react';

const App = () => {
  const [resData, setResData] = useState(null);
  const [reqParams, setReqParams] = useState({});
  const [loading, setLoading] = useState(false);

  const callApi = async (reqParams) => {

    const { method, url, body } = reqParams;
    setReqParams(reqParams);
    setLoading(true);
    
    const resData = await axios({
      method,
      url,
      data: body,
    });
    
    setResData({
      headers: resData.headers,
      body: resData.data,
    });
    setLoading(false);
  }

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {reqParams.method}</div>
      <div>URL: {reqParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={resData} loading={loading} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
