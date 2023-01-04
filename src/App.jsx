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

// Class Based Version
// class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       data: null,
//       requestParams: {},
//     };
//   }

//   callApi = (requestParams) => {
//     // mock output
//     const data = {
//       count: 2,
//       results: [
//         {name: 'fake thing 1', url: 'http://fakethings.com/1'},
//         {name: 'fake thing 2', url: 'http://fakethings.com/2'},
//       ],
//     };
//     this.setState({data, requestParams});
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <Header />
//         <div>Request Method: {this.state.requestParams.method}</div>
//         <div>URL: {this.state.requestParams.url}</div>
//         <Form handleApiCall={this.callApi} />
//         <Results data={this.state.data} />
//         <Footer />
//       </React.Fragment>
//     );
//   }
// }

// export default App;