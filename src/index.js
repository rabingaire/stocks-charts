import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import Modal from "./Modal";
import { Table, Row } from "./Table";
import getStockData from "./getStockData";

import "./styles.css";

const LineChart = React.lazy(() => import("./LineChart"));

class App extends React.Component {
  state = {
    companies: [
      {
        name: "Apple Inc",
        stockSymbol: "AAPL"
      },
      {
        name: "Facebook",
        stockSymbol: "FB"
      },
      {
        name: "Twitter",
        stockSymbol: "TWTR"
      }
    ],
    showModal: false,
    selectedCompany: null
  };

  onShowModal = company => {
    this.setState({ showModal: true, selectedCompany: company });
  };

  onModalClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const companies = this.state.companies;
    const showModal = this.state.showModal;
    const selectedCompany = this.state.selectedCompany;

    const LineChartWithStockData = getStockData(LineChart);
    return (
      <div>
        <h1>Stocks</h1>
        <Table>
          {companies.map(company => (
            <Row
              key={company.stockSymbol}
              render={() => (
                <tr onClick={() => this.onShowModal(company)}>
                  <td>{company.name}</td>
                  <td>{company.stockSymbol}</td>
                </tr>
              )}
            />
          ))}
        </Table>
        {showModal && (
          <Modal onClose={this.onModalClose}>
            <h1>
              {selectedCompany.name}({selectedCompany.stockSymbol})
            </h1>
            <Suspense fallback={<div>Loading...</div>}>
              <LineChartWithStockData selectedCompany={selectedCompany} />
            </Suspense>
          </Modal>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
