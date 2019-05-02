import React, { Component } from 'react';
import Iframe from 'react-iframe';

export default class RaiseIssue extends Component {
  render() {
    return (
      <div>
        <Iframe url="https://pchandna24.github.io/maps/"
        width="450px"
        height="450px"
        id="myId"
        className="myframe"
        display="initial"
        position="relative"/>
      </div>
    )
  }
}
