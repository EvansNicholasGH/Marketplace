import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {Link} from '../routes'

export default (props) => {
    return (
        <Menu style={{marginTop: '10px'}} pointing secondary>
            <Link route='/'>
                <a className='item'>Items for sale</a>
            </Link>
            <Link route='/items/sell'>
                <a className='item'>Sell</a>
            </Link>
           
            <Menu.Menu position='right'>
            <Link route={`/user/purchases/${props.address}`}>
                <a className='item'>My Purchases</a>
            </Link>
            <Link route={`/user/listings/${props.address}`}>
                <a className='item'>My Listings</a>
            </Link>               
           
            </Menu.Menu>            
        </Menu>
    )
}