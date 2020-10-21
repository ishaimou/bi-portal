import React, { Component } from "react";
import { Tag, Table, Tooltip, Statistic, Icon } from "antd";

class Lengend extends Component {
  constructor(props) {
    super(props);
    this.getPrefix = this.getPrefix.bind(this);
    this.getStatColor = this.getStatColor.bind(this);
    this.state = {
      // selectedRowKeys: [...Array(props.products.length).keys()].map(i => i + 1),
      // selectedRows: [],
    };
  }
  getPrefix = value => {
    if (value >= 0) {
      return (
        <span>
          <Icon
            style={{ fontSize: "12px", marginRight: "4px" }}
            type="arrow-up"
          />
          +
        </span>
      );
    } else if (value < 0) {
      return (
        <span>
          <Icon
            style={{ fontSize: "12px", marginRight: "4px" }}
            type="arrow-down"
          />
          -
        </span>
      );
    }
  };

  getStatColor = value => {
    if (value >= 0) {
      return {
        color: "#0ea600",
        fontSize: "12px",
        fontWeight: "400",
        fontFamily: "Arial, Helvetica, 'Nimbus Sans L', sans-serif"
      };
    } else if (value < 0) {
      return {
        color: "#cf1322",
        fontSize: "12px",
        fontWeight: "400",
        fontFamily: "Arial, Helvetica, 'Nimbus Sans L', sans-serif"
      };
    }
  };
  // selectRow = record => {
  //   const selectedRowKeys = [...this.state.selectedRowKeys];
  //   const selectedRows = [...this.state.selectedRows];
  //   if (selectedRowKeys.indexOf(record.key) >= 0) {
  //     selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
  //   } else {
  //     selectedRowKeys.push(record.key);
  //   }
  //   if (selectedRows.indexOf(record.key) >= 0) {
  //     selectedRows.splice(selectedRows.indexOf(record.key), 1);
  //   } else {
  //     selectedRows.push(record);
  //   }
  //   this.setState({ selectedRowKeys, selectedRows });
  // };
  // onSelectedRowKeysChange = (selectedRowKeys, selectedRows) => {
  //   this.setState({ selectedRowKeys });
  //   this.props.getProducts(selectedRows, this.state.selectedRowKeys);
  // };
  render() {
    const columns = [
      {
        title: "Product",
        dataIndex: "name",
        width: "30%",
        render: product => (
          <span
            style={{
              marginLeft: "30px",
              fontSize: "10px",
              fontWeight: "700",
              fontFamily: "Montserrat, sans-serif"
            }}
          >
            {product}
          </span>
        )
      },
      {
        title: "Price",
        dataIndex: "price",
        render: price => {
          return (
            <span
              style={{
                fontSize: "12px",
                fontFamily: "Arial, Helvetica, 'Nimbus Sans L', sans-serif"
              }}
            >
              {price}{" "}
            </span>
          );
        }
      },
      {
        title: "unit",
        dataIndex: "unit",
        width: "10%",
        render: unit => {
          return <Tag color="blue">{unit}</Tag>;
        }
      },
      {
        // width: "80px",
        title: "Change",
        dataIndex: "change",
        render: change => {
          return (
            <Statistic
              value={Math.abs(change)}
              precision={change % 1 !== 0 ? 2 : 0}
              valueStyle={this.getStatColor(change)}
              prefix={this.getPrefix(change)}
              suffix=""
            />
          );
        }
      },
      {
        // width: "80px",
        title: "Change %",
        dataIndex: "movement",
        render: movement => (
          <Statistic
            value={Math.abs(movement)}
            precision={2}
            valueStyle={this.getStatColor(movement)}
            prefix={this.getPrefix(movement)}
            suffix="%"
          />
        )
      },
      {
        title: "frequency",
        dataIndex: "frequency",
        // width: "10%",
        render: frequency => {
          return <Tag color="green">{frequency}</Tag>;
        }
      },
      {
        // width: "20px"
        tile: "Date",
        dataIndex: "date",
        render: date => (
          <Tooltip title={date}>
            <Icon className="clock" type="clock-circle" theme="outlined" />
          </Tooltip>
        )
      }
    ];
    const indicators = this.props.indicators;
    const data = indicators.map((indicator, key) => ({
      key: key + 1,
      id: indicator.id,
      name: indicator.label,
      price: indicator.value,
      unit: indicator.unit,
      change: indicator.change,
      movement: indicator.movement,
      frequency: indicator.frequency,
      date: indicator.date
    }));
    // const { selectedRowKeys, selectedRows } = this.state;
    // const rowSelection = {
    //   selectedRowKeys,
    //   selectedRows,
    //   onChange: this.onSelectedRowKeysChange
    // };
    return (
      <div>
        <Table
          // scroll={{ y: 94 }}
          // rowSelection={rowSelection}
          // selections={}
          showHeader={false}
          columns={columns}
          dataSource={data}
          size="small"
          pagination={false}
          loading={this.props.loading}
          // onRow={record => ({
          //   onClick: () => {
          //     this.selectRow(record);
          //   }
          // })}
        />
      </div>
    );
  }
}

export default Lengend;
