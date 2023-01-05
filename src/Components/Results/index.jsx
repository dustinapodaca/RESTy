import React from 'react';
import { prettyPrintJson } from "pretty-print-json";
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
            {data ? (
              <>
                <pre
                  data-testid="results"
                  dangerouslySetInnerHTML={{
                    __html: prettyPrintJson.toHtml([data], null, 2),
                  }}
                />
              </>
            ) : null}
          </section>
        </>
      )}
    </>
  );
}

export default Results;
