import React, { Component } from 'react'
import image1 from '../images/undraw_photo_sharing_1_85vy.png';
import { connect } from 'react-redux';
import { postNewMessage } from '../store/actions/messages';

class ImageForm extends Component {
    
    state = {
        message: ''
    }
    submit = e => {
        e.preventDefault();
        this.props.postNewMessage(this.state.message);
        this.setState({ message:''});
        this.props.history.push('/');

    }

    render() {
      
    return (
      <div>
          <img src={image1} alt=""
          style={{width:'300px', height:'300px',margin:'0 auto'}} 
        />
        <h2>Add Image:</h2>
        <form onSubmit={this.submit}>
            <h3>Add Image URL:</h3>
            <input type="text" 
            className="form-control"
            placeholder="URL"
            value={this.state.url}
            onChange={e => this.setState({ message: e.target.value })}
            />
            <button  
            type='submit'
            className="btn btn-success pull-right"
            style={Styles.button}
            >
                Post
            </button>
            
        </form>
      </div>
    )
  }
}

const Styles = {
    button: {
        marginTop: '10px'
    }
}

function mapStateToProps(state) {
    return {
      errors: state.errors
    };
  }
  
  export default connect(mapStateToProps, {postNewMessage})(ImageForm);