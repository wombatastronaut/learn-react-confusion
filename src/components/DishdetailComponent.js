import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

import { Loading } from './LoadingComponent';

import { baseUrl } from '../shared/baseUrl';

function RenderDish ({dish}) {
    return (
        <FadeTransform in transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    )
}

function RenderComments ({comments, dishId, postComment}) {
    if (comments === null || comments === undefined) {
        return (
            <div></div>
        )
    }

    const list = <Stagger in>
        {comments.map((comment) => {
            return (
                <Fade in>
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                </Fade>
            )
        })}
    </Stagger>;

    return (
       <div>
            <h4>Comments</h4>
            
            <ul className="list-unstyled">
                {list}
            </ul>

            <CommentForm dishId={dishId} postComment={postComment} />
       </div>
    )
}

const DishDetail = (props) => {
    if (!props.dish) {
        return (
            <div></div>
        )
    }

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>

            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>

                <div className="col-12 col-md-5 m-1">
                    <RenderComments
                        comments={props.comments}
                        dishId={props.dish.id}
                        postComment={props.postComment}
                    />
                </div> 
            </div>
        </div>
    )   
}

class CommentForm extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            isModelOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.hadnleSubmit.bind(this);
    }

    toggleModal () {
        this.setState({
            isModelOpen: !this.state.isModelOpen
        });
    }

    hadnleSubmit (values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render () {
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);

        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.hadnleSubmit(values)}>
                            <Row className="form-group">
                                <Label for="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author name=author" 
                                        placeholder="Your Name" 
                                        className="form-control" 
                                        validators={{
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }} 
                                    />
                                    <Errors className="text-danger" model=".author" show="touched"
                                        messages={{
                                            minLength: 'Must be greater then 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" 
                                        resize="none"
                                        rows="6" 
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>                            
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}

export default DishDetail;