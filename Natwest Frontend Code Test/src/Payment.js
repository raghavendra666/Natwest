import { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";
import React from "react";


export function Payment() {
  const [results,paymentAmount, paymentCurrency,paymentType,paymentDate] = useState(null);
  const [Items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  //setting tha initial page
  const [page, setPage] = useState(0);
  //we need to know if there is more data
  const [HasMore, setHasMore] = useState(true);
  const handleError = useErrorHandler();

  //on initial mount
  useEffect(() => {
    loadMoreItems();
  }, []);

  function loadMoreItems() {
    setIsFetching(true);

    axios({
      method: "GET",
      url: "http://localhost:9001/api",
      params: { _page: page, _limit: 40 },
    })
      .then((res) => {
        setItems((prevTitles) => {
          return [...new Set([...prevTitles, ...res.data.map((b) => b.title)])];
        });
        setPage((prevPageNumber) => prevPageNumber + 1);
        setHasMore(res.data.length > 0);
        setIsFetching(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (

    <ErrorBoundary
      FallbackComponent={CharacterFallback}
    >
      <ComponentWhereErrorMightOccur/>
    </ErrorBoundary>
  );
};
    <div className="App">
      <h1>Natwest</h1>
      <h2>Fetch account details</h2>

      {/* Fetch data from API */}
      <div>
        <button className="fetch-button" onClick={fetchData}>
          Fetch Account Details
        </button>
        <br />
      </div>

      {/* Display data from API */}
      <div className="Accounts">
        {results &&
          results.map((results, index) => {
            const paymentStatus = new Date(results.paymentAmount).toDateString();
            const paymentCurrency = results.paymentCurrency.join(", ");

            return (
              <div className="account" key={index}>
                <div className="details">
                  <p>{paymentCurrency}</p>
                  <p>{results.paymentType} pages</p>
                  <p>{results.paymentDate}</p>
                  <p>{paymentStatus}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div>
      {Items.map((item, index) => {
        if (Items.length === index + 1) {
          return (
            <div key={index}>
              {item} - <b>last</b>
            </div>
          );
        } else {
          return <div key={index}>{item}</div>;
        }
      })}
      {isFetching && <p>Fetching items...</p>}
      {!isFetching && HasMore && (
        <button onClick={loadMoreItems}>Load more</button>
      )}
    </div>
    </div>
  

export default Payment;
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
