import React from 'react';
import DefaultProfileImage from '../images/default-profile-image.jpg'

const UserAside = ({profileImageUrl, username}) => {
  return(
  <aside className="col-sm-2">
    <div className="panel panel-default">
      <div className="panel-body">
        <img 
          className="img-thumbnail" 
          alt={username} 
          src={profileImageUrl || DefaultProfileImage}
          style={{height:'100px',width:'100px'}}
        />
        <h5>Logged In as: <span style={{color:'blue'}}>@{username}</span></h5>
      </div>
    </div>
  </aside>
)};

export default UserAside;