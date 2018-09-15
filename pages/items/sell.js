import React,{Component} from 'react';
import Layout from '../../components/Layout';
import { Button, Checkbox, Form, Input, TextArea, Message, Dropdown, Menu } from 'semantic-ui-react';
import coinListing from '../../ETH/coinListing';
import web3 from '../../ETH/web3';
import{Router} from '../../routes';

class ICOnew extends Component {
    state={
        itemAddress: '',
        itemKind: '',
        itemHash: 'somehash',
        itemIpfs: 'Image-Upload Logic',
        itemPrice: '',
        itemDescription: '',
        userAddress: '',

        loading: false,
        errorMessage: ''
    };
    async componentWillMount(){
        const accounts = await web3.eth.getAccounts()
        this.setState({userAddress:accounts[0]})    
            
      }
    onSubmit = async (event) => {
        event.preventDefault();
        
        
        this.setState({loading: true, errorMessage:''})
        try{
            const accounts = await web3.eth.getAccounts(); 
            this.setState({itemAddress: accounts[0]})
            const user = accounts[0];
            if(this.state.itemKind===''||this.state.itemPrice===''||this.state.itemDescription===''){
                throw new Error("Make sure you fill in all the fields above")
            }            
            await coinListing.methods.listItem(this.state.itemAddress, this.state.itemKind, this.state.itemHash, this.state.itemIpfs, parseInt(this.state.itemPrice), this.state.itemDescription)
            .send({
                from: accounts[0]
        })
       
    } catch(err){
        this.setState({errorMessage: err.message})
        this.setState({loading: false})
    }
    //Router.pushRoute('/');
    this.setState({loading: false})
   
        
    }
    render(){
        const options=[
            {key: 1, text: 'car', value:'car'},
            {key: 2, text: 'phone', value:'phone'},

        ]
       return(
            <Layout address={this.state.userAddress}>
                <h3>Sell an Item</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

                    <Form.Field>
                        <label>Item Kind</label>                       
                        <Input                                    
                            placeholder='Kind'
                            value={this.state.itemKind}
                            onChange={event =>                         
                            this.setState({itemKind: event.target.value})}
                                    />
                    </Form.Field>
                     
                    <Form.Field>
                        <label>Price</label>
                        <Input 
                        placeholder='reasonable price' 
                        label='wei'
                        value={this.state.itemPrice}
                        onChange={event =>                         
                             this.setState({itemPrice: event.target.value})}
                        />                   
                            
                    </Form.Field>

                    <Form.Field>
                        <label>Upload Image</label>
                        <Input
                         placeholder='type'
                         value={this.state.itemIpfs}
                         onChange={event =>                         
                            this.setState({itemHash: event.target.value, itemIpfs: event.target.value})}
                         />
                    </Form.Field>

                    <Form.Field control={TextArea} label="Description" placeholder='Add a short description' value={this.state.itemDescription}
                        onChange={event=>{
                            this.setState({itemDescription: event.target.value})
                        }}                    >                      
                    </Form.Field>
                    

                    <Message 
                        error
                        header="We got a problem"
                        content={this.state.errorMessage}
                        />
                    <Button loading={this.state.loading} type='submit' color='blue'>Submit</Button>
                </Form>
            </Layout>
            )   
         }
    //      <Form.Field>
    //      <label>Item Kind</label>
        
    //      <Dropdown placeholder='Item' search selection options={options} />
    //      <Input
    //      options={options}
    //       placeholder='Kind'
    //       value={this.state.itemKind}
    //       onChange={event =>                         
    //          this.setState({itemKind: event.target.value})}
    //       />
    //  </Form.Field>

    // <Dropdown placeholder='Item' value={this.state.itemKind} fluid search selection options={options} onChange={event =>                         
    //     this.setState({itemKind: event.target.value})}/>
    //     {console.log(this.state.itemKind)}
    }


export default ICOnew;