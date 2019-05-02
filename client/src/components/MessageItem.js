import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'

const MessageItem = ({ 
  date, 
  username, 
  profileImageUrl, 
  text, 
  removeMessage,
  isCurrentUser
}) => (
  <div>
    <Paper className="" style={{display:'flex',flexDirection:'column',justifyContent:'center',margin:'10px',padding:'10px'}}>
      <img 
          src={(text[0]==="h" && text[1]==="t") ? text : profileImageUrl || "http://lorempixel.com/400/200"} 
          alt={username}
          height="100"
          width="100"
          className="timeline-img"
      />
      <div className="message-area">
        <Link to="/">@{username} &nbsp; </Link>
        <span className="text-muted">
          <Moment className="text-muted" format="Do MMM YYYY">
            {date}
          </Moment>
        </span>
        {
          profileImageUrl[0]!=="h" && profileImageUrl[1]!=="t" && (
            <p>{text}</p>
          )
        }
        {
          profileImageUrl[0]==="h" && profileImageUrl[1]==="t" && (
            <br />
          )
        }

        {isCurrentUser && (
          <button 
            onClick={removeMessage} 
            className="btn btn-danger">
            Remove
          </button>
        )}
      </div>
    </Paper>
  </div>
);

export default MessageItem;