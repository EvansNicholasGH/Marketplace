import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import {Link} from '../../routes'
export default(props)=> {
    return(
        
        <Card style={{'overflowWrap':'break-word'}}>
            <Image src={props.source} />
        <Card.Content >
          <Card.Header>{props.type}</Card.Header>
          <Card.Meta>{props.meta}</Card.Meta>
          <Card.Description>{props.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='tag' />
            {props.price}
          </a>
          
          
        </Card.Content>
        <Card.Content>            
          <Button basic color={props.open ? 'green':'red'} floated='right' fluid>Buy this item</Button>
          <Link route={`/items/${props.id}`}>
                <a>
                    <Button basic color='black' floated='right' fluid>More Info</Button>
                </a>
            </Link>
        </Card.Content>
      </Card>
    )
}