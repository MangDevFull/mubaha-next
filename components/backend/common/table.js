import * as React from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

export default class TableCustom extends React.Component {
  render() {
    return <ReactTable data={this.props.data} columns={this.props.columns} />;
  }
}
