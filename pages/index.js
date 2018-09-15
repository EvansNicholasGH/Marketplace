import React, { Component } from 'react';
import coinListing from '../ETH/coinListing.js';
import web3 from '../ETH/web3';
import { Icon, Label, Image, Card, Button, Field } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Item from '../components/Display/Item';
import placeholder from '../assets/images/items/placeholder.png';


class ItemListings extends Component {
  state = {
    empty: false,
    sortIndex: 4,
    sortAscending: true,
    userAddress: '',
    userBalance: '',
    inContractBalance: '',
    userAddress: ''
  };

  static async getInitialProps() {   
    const itemCount = await coinListing.methods.getNumberOfItems().call();
    const properties = { allCars: [] };   
    if (!parseInt(itemCount)) return properties;    
    var onResolve = () => { };
    var itemsLoaded = 0;

    for (let index = 0; index < itemCount; index++) {
      coinListing.methods.getListItem(index).call().then(function (currentCar) {
          if(!!currentCar[6])
        properties.allCars.push(currentCar);
        if (++itemsLoaded >= itemCount) {
          onResolve(properties);
        }
      });
    }

    return await new Promise(function promise(resolve) {
      onResolve = resolve;
    });
  }

  async componentWillMount(){
    const accounts = await web3.eth.getAccounts()
    this.setState({userAddress:accounts[0]})    
  }

  renderCar = (car, index) => {
    return <Card key={car[7]}><Item open={car[6]} source={placeholder} type={car[1]} meta={car[0]} description={car[5]} price={car[4]} id={car[7]} key={car[7]} /></Card>;
  };

  sortCar = (a, b) => {
    var attrA = a[this.state.sortIndex];
    var attrB = b[this.state.sortIndex];
    var multiplier = this.state.sortAscending ? 1 : -1;
    
    if (typeof attrA === "string") {
        if (!isNaN(attrA - 0) && !isNaN(attrB - 0)) return ((attrA - 0) - (attrB - 0)) * multiplier;
      return (attrA < attrB ? -1 : attrA > attrB ? 1 : 0) * multiplier;
    } else if (typeof attrA === "number") {
      return (attrA - attrB) * multiplier;
    }
    return 0;
  }; 

  toggleSortPrice = () => {
    this.setState({ sortAscending: !this.state.sortAscending, sortIndex: 4 });
  };
  toggleSortName = () => {
      
    this.setState({ sortAscending: !this.state.sortAscending, sortIndex: 1 });
  };

  renderNTD = () => {
    return <h2>Nothing to Display. Click on Sell to list an Item</h2>;
  };

  renderCarList = () => {
    return <Card.Group > {this.props.allCars.sort(this.sortCar).map(this.renderCar)} </Card.Group>;
  };
  buttonText = () => {
      if(!this.state.sortAscending){
        return 'lowest -> highest'
      }
      else{
          return 'highest -> lowest'
      }
  }
  getbalance =async () => {
      const accounts = await web3.eth.getAccounts()
      const balance = await  web3.eth.getBalance(accounts[0]);
      this.setState({userAddress:accounts[0], userBalance:balance})
      alert(balance)
        return balance;
  }
  getContractBalance=async ()=>{
    
     const accounts = await web3.eth.getAccounts();
      
     const balance = await coinListing.methods.getBalance().call({from: accounts[0]});
      this.setState({inContractBalance: balance})
      alert(balance)
  }
  withdrawBalance=async ()=>{
    console.log("withdrawing")
     const accounts = await web3.eth.getAccounts();
      
     await coinListing.methods.withdrawFunds().send({from: accounts[0]});
     console.log("done")
      
  }
  

  render = () => {
    return (
     <Layout address={this.state.userAddress}>
         <p style={{'float':'right'}}>Price:{' '}
            <Button size='tiny' onClick={this.toggleSortPrice} test='val'>
        
                {this.buttonText()}
            </Button>
        </p>
        <p style={{'float':'right', 'clear':'right'}}>Name:{' '}
            <Button size='tiny' onClick={this.toggleSortName} test='val'>
        
                {this.buttonText()}
            </Button>
        </p>
        <p style={{'float':'right', 'clear':'right'}}>
            <Button basic color='black' size='tiny' onClick={this.getbalance} test='val'>   
                Account blalance
            </Button>
        </p>
        <p style={{'float':'right', 'clear':'right'}}>
            <Button basic color='black' size='tiny' onClick={this.getContractBalance} test='val'>   
                Contract balance
            </Button>
        </p>
        <p style={{'float':'right', 'clear':'right'}}>
            <Button basic color='black' size='tiny' onClick={this.withdrawBalance} test='val'>   
                Withdraw Funds
            </Button>
        </p>
        {(!this.props.allCars.length ? this.renderNTD() : this.renderCarList())}
    </Layout>
    )
  };
}
export default ItemListings;