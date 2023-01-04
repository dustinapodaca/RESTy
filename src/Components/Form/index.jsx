import React from 'react';
import './form.scss';
import { useState } from 'react';

const Form = (props) => {

  const { handleApiCall } = props;
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
      body: body,
    };
    handleApiCall(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="methods">
          <span>Method: </span>
          <button
            id="get"
            className={method === "GET" ? "active" : null}
            type="button"
            onClick={() => setMethod("GET")}
          >
            GET
          </button>
          <button
            id="post"
            className={method === "POST" ? "active" : null}
            type="button"
            onClick={() => setMethod("POST")}
          >
            POST
          </button>
          <button
            id="put"
            className={method === "PUT" ? "active" : null}
            type="button"
            onClick={() => setMethod("PUT")}
          >
            PUT
          </button>
          <button
            id="delete"
            className={method === "DELETE" ? "active" : null}
            type="button"
            onClick={() => setMethod("DELETE")}
          >
            DELETE
          </button>
        </label>
        <label>
          <span>URL: </span>
          <input
            name="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        {method === "POST" || method === "PUT" ? (
          <>
            <label>
              <span>JSON Request Body: </span>
              <textarea
                name="body"
                rows={6}
                onChange={(e) => setBody(e.target.value)}
              />
            </label>
          </>
        ) : (
          <></>
        )}
        <button type="submit">GO!</button>
      </form>
    </>
  );
};

export default Form;
