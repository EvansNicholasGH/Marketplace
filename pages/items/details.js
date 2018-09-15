import React, { Component } from 'react';
import coinListing from '../../ETH/coinListing.js';
import web3 from '../../ETH/web3';
import { Icon, Label, Image, Card, Button, Item } from 'semantic-ui-react';
import Layout from '../../components/Layout';
//import Item from '../../components/Display/Item';
import carlogo from '../../assets/images/items/car.png';
import placeholder from '../../assets/images/items/placeholder.png';


class Details extends Component {
    state={
        userAddress: ''
    }
   static async getInitialProps(props){
       const itemID = props.query.index;
       const item = await coinListing.methods.getListItem(itemID).call();
       console.log(item)
       return({item})
   }
async componentWillMount(){
    const accounts = await web3.eth.getAccounts()
    this.setState({userAddress:accounts[0]})    
  }
   purchaseHandler= async () => {
       const accounts = await web3.eth.getAccounts();
        const check = await coinListing.methods.purchaseItem(this.props.item[7]).send({
            from: accounts[0],
            value: parseInt(this.props.item[4])
        })
        console.log(check)
   }
  
    render(){
        const items= [{
            childKey: 0,
            image: placeholder,
            header: this.props.item[1],
            description: this.props.item[5],
            meta: this.props.item[0],
            extra: this.props.item[4],
        }]
        return(
            <Layout address={this.state.userAddress}>
                <Item.Group items = {items} />
              
              <Button basic color={this.props.item[6]?'green':'red'} floated='left' onClick={this.purchaseHandler}>Buy this item </Button>
            </Layout>
            
        )
    }
}
export default Details;