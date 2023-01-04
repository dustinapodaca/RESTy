import React from 'react';
import './results.scss';

const Results = (props) => {
  const { loading, data } = props;

  return (
    <>
    {loading ? (
      <>
        <p>Loading....</p>
      </>
    ) : (
      <>
        <section>
          <pre>
            {data
              ? JSON.stringify(data, null, 2)
              : null}
          </pre>
        </section>
      </>
    )}
    </>
  );
}

export default Results;
