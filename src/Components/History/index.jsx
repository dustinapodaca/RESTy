import React from 'react';
import './history.scss';

const History = (props) => {
  const { history, updateReqParams } = props;

  const handleClick = (reqParams) => {
    updateReqParams(reqParams);
  };

  return (
    <>
      <section className="history">
        <h2>History</h2>
        <ul>
          {history.map((item, idx) => (
            <li key={idx}>
              <button onClick={() => handleClick(item.reqParams)}>
                {idx + 1} {item.searchNumber} {item.reqParams.method} {item.reqParams.url}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default History;
