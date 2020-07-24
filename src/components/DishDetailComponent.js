import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Col, Row, Label,
Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';


class CommentForm extends Component{
 constructor(props){
   super(props);
   this.state={
     isModalOpen:false
   };
   this.toggleModal=this.toggleModal.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }

 toggleModal(){
   this.setState({
     isModalOpen: !this.state.isModalOpen
   });
 }

 handleSubmit(values) {
       this.toggleModal();
       alert('Current State is: ' + JSON.stringify(values));
   }

   render(){
     const maxLength = (len) => (val) => !(val) || (val.length <= len);
     const minLength = (len) => (val) => val && (val.length >= len);
     return(
       <>
      <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                <Col md={10}>
                <Label htmlFor="rating">Rating</Label>
                    <Control.select model=".rating" name="rating"
                        className="form-control">
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                    </Control.select>
                </Col>
                </Row>
                   <Row className="form-group">
                      <Col md={10}>
                        <Label htmlFor="username">Your Name</Label>
                            <Control.text model=".YourName" id="yourname" name="yourname"
                                placeholder="Your Name"
                                className="form-control"
                                validators={{
                                         minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                     />
                                <Errors
                                    className="text-danger"
                                    model=".yourname"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                 />
                      </Col>
                   </Row>
                   <Row className="form-group">
                       <Col md={10}>
                       <Label htmlFor="comment">Comment</Label>
                           <Control.textarea model=".comment" id="comment" name="comment"
                               rows="6"
                               className="form-control" />
                       </Col>
                   </Row>
                   <Button type="submit" value="submit" color="primary">Submit</Button>
                </LocalForm>
            </ModalBody>
        </Modal>
               </>
     );
   }
}

function RenderDish({dish}){
  return(
    <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
    </Card>
  );
}

function RenderComments({comments}){
const myComments = comments.map((comment)=>{
      return (
        <>
        <p>{comment.comment}<br/><br/>---{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
        </>
      )
    });
    return myComments;
}

const DishDetail=(props)=>{
  if(props.dish!=null){
  return(
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
    <div  className="col-12 col-md-5 m-1">
        <RenderDish dish={props.dish}/>
    </div>
    <div  className="col-12 col-md-5 m-1">
    <h2>Comments</h2><br/>
        <RenderComments comments={props.comments}/>
        <CommentForm />
    </div>
  </div>
  </div>
  );
}

else{
  return(
    <div></div>
  );
}
}

export default DishDetail;
