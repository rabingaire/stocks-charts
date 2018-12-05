// Link.react.test.js
import React from "react";
import { Table, Row } from "./Table";
import renderer from "react-test-renderer";

test("Table Gets Rendered", () => {
  const companies = [
    {
      name: "Apple",
      stockSymbol: "AAPL"
    },
    {
      name: "Facebook",
      stockSymbol: "FB"
    }
  ];

  const component = renderer.create(
    <Table>
      {companies.map(company => (
        <Row
          key={company.stockSymbol}
          render={() => (
            <tr>
              <td>{company.name}</td>
              <td>{company.stockSymbol}</td>
            </tr>
          )}
        />
      ))}
    </Table>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
