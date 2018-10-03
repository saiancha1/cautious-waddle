import React, { Component } from 'react';

export default class Card extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.event.title}</h3>
        <h2>{this.props.event.date}</h2>
        <p>{this.props.event.info}</p>
      </div>
    );
  }
}
