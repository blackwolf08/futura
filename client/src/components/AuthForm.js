import React, {Component} from 'react';


export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      profileImageUrl: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp ? 'signup' : 'signin';
    this.props.onAuth(authType, this.state)
      .then(() => {
        this.props.history.push('/');
      })
      .catch(() => {
        return;
      });
  }

  render() {
    const { email, username, password } = this.state;
    const { 
      signUp, 
      heading, 
      buttonText, 
      errors, 
      history, 
      removeError
    } = this.props;

    history.listen(() => {
      removeError();
    });

    return (
      <div>
        <div className="signup-bg"></div>
        <div className="row justify-content-md-center text-center signup-content signup-content" style={{display:'flex', justifyContent:'center'}}>
          <div className="col-md-8 col-lg-6">
            <form onSubmit={this.handleSubmit}>
              <h2 style={{textShadow:'0 0 8px grey'}}>{heading}</h2>
              {errors.message && 
                <div className="alert alert-danger">{errors.message}</div>
              }
              <label htmlFor="email">Email:</label>
              <input
                className="form-control" 
                id="email"
                name="email"
                type="text"
                onChange={this.handleChange}
                value={email}
              />
              <label htmlFor="password">Password:</label>
              <input
                className="form-control" 
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
              /> 
              {signUp && (
                <div>
                  <div className="signup-bg"></div>
                  <label htmlFor="username">Username:</label>
                  <input
                    className="form-control" 
                    id="username"
                    name="username"
                    type="text"
                    onChange={this.handleChange}
                    value={username}
                  />
                  <label htmlFor="profile-img">Profile Image Url:</label>
                  <input
                    className="form-control" 
                    id="profileImageUrl"
                    name="profileImageUrl"
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
              )}
              <br></br>
              <button 
                type="submit" 
                className="btn btn-primary btn-block btn-lg">
                {buttonText}
              </button>
            </form>
        </div>     
      </div>
    </div>
    );
  }
}
