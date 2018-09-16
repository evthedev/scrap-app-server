import React, { Component } from 'react';
import { connect } from 'react-redux'

import { loadImages } from '../../structural/images/actions'

import logo from './logo.svg';
import './styles.css';

class ProjectsPage extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Reacty</h1>
          <p onClick={this.props.actions.loadImages}>Load images</p>}
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading
})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadImages: () => console.log('helo') || dispatch(loadImages())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
