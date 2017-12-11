import React, { Component } from "react";
// app component
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Due: "",
      Received: "",
      twenties: 0,
      tens: 0,
      fives: 0,
      ones: 0,
      quarters: 0,
      dimes: 0,
      nickels: 0,
      pennies: 0,
      good: "alert alert-success hidden",
      bad: "alert alert-danger hidden",
      change: 0,
    }
    this.handleDueChange = this.handleDueChange.bind(this);
    this.handleReceivedChange = this.handleReceivedChange.bind(this);
    this.totalChange = this.totalChange.bind(this);
  }

  handleDueChange(e) {
    this.setState({ Due: e.target.value })
  }

  handleReceivedChange(e) {
    this.setState({ Received: e.target.value })
  }

  totalChange(e) {
    var change =
      Math.round((this.state.Received * 100) - (this.state.Due * 100));
    let twenties = (change - (change % 2000)) / 2000;
    let tens =     (change - (change % 1000) - (twenties * 2000)) / 1000;
    let fives =    (change - (change % 500)  - (tens * 1000)    - (twenties * 2000)) / 500;
    let ones =     (change - (change % 100)  - (fives * 500)    - (tens * 1000)   - (twenties * 2000)) / 100;
    let quarters = (change - (change % 25)   - (ones * 100)     - (fives * 500)   - (tens * 1000)   - (twenties * 2000)) / 25;
    let dimes =    (change    - (quarters * 25)  - (ones * 100)    - (fives * 500)   - (tens * 1000) - (twenties * 2000));
    dimes = (dimes - (dimes % 10)) / 10 ;
    let nickels =  (change    - (dimes * 10)     - (quarters * 25) - (ones * 100)    - (fives * 500) - (tens * 1000) - (twenties * 2000)) 
    nickels = (nickels - (nickels % 5)) / 5
    let pennies =  (change    - (nickels * 5)    - (dimes * 10)    - (quarters * 25) - (ones * 100)  - (fives * 500) - (tens * 1000) - (twenties * 2000)) 
    
    let good = "alert alert-success"
    let bad = "alert alert-danger"
    if (parseFloat(this.state.Due) > parseFloat(this.state.Received)) {
      this.setState({
        bad,
        good: null
      })
    } else {
      this.setState({
        bad: null,
        twenties: twenties,
        tens: tens,
        fives: fives,
        ones: ones,
        quarters: quarters,
        dimes: dimes,
        nickels: nickels,
        pennies: pennies,
        good,
        change: change / 100
      })
    }

  }
  render() {
    return (

      // the first box with the inputs
      <div className="container">
        <h1 className="text-white">Change Calculator</h1>
        <hr className="bg-white" />
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-header">
                Enter Information
          </div>
              <div className="card-block">
                <label htmlFor="amount-due" className="max-width"> How Much Is Due?
      <input id="amountDue" name="Due" placeholder="$0.00" onChange={this.handleDueChange} defaultValue={this.state.Due} type="number" className="form-control" />
                </label>
              </div>
              <label htmlFor="amount-received" className="max-width"> How Much Was Recevied?
        <input id="amountReceived" name="Received" placeholder="$0.00" onChange={this.handleReceivedChange} defaultValue={this.state.Received} type="number" className="from-control" />
              </label>
            </div>
            <div className="card-footer">
              <button onClick={this.totalChange} type="button" className="btn btn-primary btn-block">Calculate</button>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card-block">
              <div className={this.state.good} style={{ display: this.state.good ? "block" : "none" }} role="alert">The total change due is ${this.state.change}</div>
              <div className={this.state.bad} style={{ display: this.state.bad ? "block" : "none" }} role="alert">Additional Money Needed</div>
              <div className="row">
                <div className="col-3 text centercard">
                  <h4><strong>Twenties</strong></h4>
                  <p className="lead text-center">{this.state.twenties}</p>
                </div>
                <div className="col-3 text centercard">
                  <h4><strong>Tens</strong></h4>
                  <p className="lead text-center">{this.state.tens}</p>
                </div>
                <div className="col-3 text centercard">
                  <h4><strong>Fives</strong></h4>
                  <p className="lead text-center">{this.state.fives}</p>
                </div>
                <div className="col-3 text centercard">
                  <h4><strong>Ones</strong></h4>
                  <p className="lead text-center">{this.state.ones}</p>
                </div>
                <div className="col-3 text centercard">
                  <h4><strong>Quarters</strong></h4>
                  <p className="lead text-center">{this.state.quarters}</p>
                </div>
                <div className="col-3 text centercard">
                  <h4><strong>Dimes</strong></h4>
                  <p className="lead text-center">{this.state.dimes}</p>
                </div>
                <div className="col-3 text centercard">
                  <h4><strong>Nickels</strong></h4>
                  <p className="lead text-center">{this.state.nickels}</p>
                </div>
                <div className="col-3 text centercard">
                  <h4><strong>Pennies</strong></h4>
                  <p className="lead text-center">{this.state.pennies}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}