import React, {Component} from 'react'
import coinListing from '../../ETH/coinListing.js'
import web3 from '../../ETH/web3'
import { Icon, Label, Image } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import Item from '../../components/Display/Item'
import carlogo from '../../assets/images/items/car.png'



class MyListings extends Component{
    state = {
        
    }
    static async getInitialProps(){
        const itemNumber = await coinListing.methods.getNumberOfItems().call();
        const currentNumber =  await coinListing.methods.getListItem(0).call();
        return {currentNumber}

    }
    renderButton(){
        const num = this.props.currentNumber
        return(
            <Item source= {carlogo} type='Car' meta={this.props.currentNumber[0]} description='this is a car' price='30' />
        )
    }
   
    render(){
        return(
            <Layout>            
                {this.renderButton()}
            </Layout>
        )
    }
}
export default MyListings;