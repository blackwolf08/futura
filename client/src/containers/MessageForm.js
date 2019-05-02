import React, {Component} from 'react';
import { connect } from 'react-redux';
import { postNewMessage } from '../store/actions/messages';
import image1 from '../images/undraw_loving_it_y27c.svg'
class MessageForm extends Component {
  state = {
      message: ''
    }
  

  handleNewMessage = e => {
    e.preventDefault();
    this.props.postNewMessage(this.state.message);
    this.setState({ message: ''});
    this.props.history.push('/');
  }

  render() {
    return (
      <form onSubmit={this.handleNewMessage}>
        <img src={image1} alt=""
          style={{width:'100%', height:'300px'}} 
        />
        <h2>Add Message: </h2>
        {this.props.errors.message && (
          <div className="alert alert-danger">
            {this.props.errors}
          </div>
        )}
        <textarea
          className="form-control"
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />
        <button type="submit" className="btn btn-success pull-right" style={{margin:'10px'}}>
          Add Message
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, {postNewMessage})(MessageForm);