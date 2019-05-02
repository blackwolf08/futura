import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import MessageForm from '../containers/MessageForm';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import withAuth from '../hocs/withAuth';
import ImageForm from '../components/ImageForm';
import RaiseIssue from '../components/RaiseIssue';

const Main = props => {
  const { authUser, errors, removeError, currentUser } = props;
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" render={props =>
          <Homepage currentUser={currentUser} {...props} />
          } 
        />
        <Route exact path="/signin" render={props => {
          return(
            <AuthForm
              removeError={removeError}
              errors={errors}
              onAuth={authUser}
              buttonText="Log in"
              heading="Welcome back."
              {...props}/>
          );
        }} />
        <Route exact path="/signup" render={props => {
          return(
            <AuthForm
              removeError={removeError}
              errors={errors}
              onAuth={authUser}
              signUp
              buttonText="Sign up"
              heading="Join today."
              {...props}/>
          );
        }} />
        <Route 
          path="/users/:id/messages/new" 
          component={withAuth(MessageForm)}
        />
        <Route 
          path="/post-image" 
          component={withAuth(ImageForm)}
        />
        <Route 
          path="/raise-issue" 
          component={withAuth(RaiseIssue)}
        />
      </Switch>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  }
};

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main));