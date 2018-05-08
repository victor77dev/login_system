import React from 'react';

import Navbar from './Navbar';

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    return (
        <Navbar location={location}/>
    );
  }
}