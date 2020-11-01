import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {
    constructor (props) {
        super(props);
    }
    
    renderDish (dish) {
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }

    renderComments (comments) {
        if (comments === null) {
            return (
                <div></div>
            )
        }

        const list = comments.map((comment) => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </li>
            )
        });

        return (
           <div>
                <h4>Comments</h4>
                
                <ul className="list-unstyled">
                    {list}
                </ul>
           </div>
        )
    }
	
    render () {
        if (this.props.dish === null) {
            return (
                <div></div>
            )
        }

        return (
            <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>

                <div  className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish.comments)}
                </div> 
            </div>
        )
    }
}

export default Dishdetail;