import React from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';
import Paper from '@material-ui/core/Paper'
import impsvg from '../images/undraw_bus_stop_h370.svg'

const MessageTimeline = props => {
  return(
    <>
    <Paper style={{padding:'10px', margin:'10px'}}>
      <img src={impsvg} style={{width:'80%', height:'20%'}} alt=""></img>
      <div className="row" style={{padding:'10px'}}>
        <div className="col">
          <h2>Welcome To Futura!</h2>
          <p>Here you can connect to people around you and raise Concerns/Issues and also post about them in the FEED!</p>
        </div>
      </div>
    </Paper>
    
    <div className="row">
      <UserAside profileImageUrl={props.profileImageUrl} username={props.username}/>
      <MessageList />
    </div>
    </>
  
)};

export default MessageTimeline;