import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import createHistory from "history/createBrowserHistory";

import { Provider } from "react-redux";
import { Route } from "react-router";

import {
    ConnectedRouter,
    push,
} from "react-router-redux";

import configureStore from './store'

import Home from './containers/Home';
import ProjectsPage from './containers/ProjectsPage';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/projects" component={ProjectsPage} />
                {/* <Route path="/projects/:id" component={Project} /> */}
                {/* <Route path="/projects" component={Project} /> */}

            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
