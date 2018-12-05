import React, { Suspense } from "react";
import sortBy from "lodash.sortby";
import moment from "moment";

function getStockData(WrappedComponent) {
  return class extends React.Component {
    state = {
      data: [],
      isLoading: true
    };
    componentDidMount() {
      const stockSymbol = this.props.selectedCompany.stockSymbol;
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=YC8YXS13AVAT71DX`
      )
        .then(response => response.json())
        .then(response => {
          const data = [];
          Object.entries(response["Time Series (Daily)"]).forEach(
            ([key, value]) => {
              data.push({
                x: moment(key).format("MM/DD"),
                y: parseInt(value["1. open"], 10)
              });
            }
          );
          this.setState({
            data: sortBy(data, ["x"])
              .reverse()
              .splice(0, 20)
              .reverse(),
            isLoading: false
          });
        })
        .catch(function() {});
    }

    render() {
      const data = this.state.data;
      return (
        <>
          {this.state.isLoading ? (
            <div>Loading...</div>
          ) : (
            <WrappedComponent data={data} />
          )}
        </>
      );
    }
  };
}

export default getStockData;
