import React, { Component } from 'react';
import { connect } from 'react-redux'

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { RestLink } from 'apollo-link-rest';


import { loadProjects } from '../../structural/projects/actions'

import './styles.css';

import ProjectsList from '../../components/ProjectsList'

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql'
// })

// const getProjectsQuery = gql `
//   {
//     projects {
//       name
//       description
//     }
//   }
// `

class ProjectsPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      // <ApolloProvider client={client}>
      
        <div className="App">
          <header className="App-header">
          </header>

            <ProjectsList projects={this.props.projects} />


            <p onClick={this.props.actions.loadProjects}>Load projects</p>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      // </ApolloProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading
})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadProjects: () => dispatch(loadProjects())
    }
  }
}
let decorate
decorate = connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
// decorate = graphql(getProjectsQuery)(ProjectsPage);


export default decorate
