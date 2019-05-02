import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchMessages, removeMessage} from '../store/actions/messages';
import MessageItem from '../components/MessageItem'
;
class MessageList extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    const {messages, removeMessage, currentUser} = this.props;
    console.log(messages)
    let messageList = messages.map(m => (
      <MessageItem 
        key={m._id} 
        date={m.createdAt} 
        text={m.text}
        username={m.user.username} 
        profileImageUrl={m.user.profileImageUrl}
        removeMessage={removeMessage.bind(this, m.user._id, m._id)}
        isCurrentUser={currentUser === m.user._id}
        style={{display:'flex',flexDirection:'column',justifyContent:'center'}}
      />
    ));

    return (
      <div className="row col-sm-10">
        <div className="offset-1 col-sm-10">
          <div className="list-group" id="messages" style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
            {messageList}
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    messages: state.messages,
    currentUser: state.currentUser.user.id
  }
}

export default connect(mapStateToProps, {fetchMessages, removeMessage})(MessageList);