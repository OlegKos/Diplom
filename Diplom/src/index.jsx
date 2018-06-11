import React from 'react'
import ReactDOM from 'react-dom'

import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';
import dateViewApp from './store/reducer.js';

import MainContent from './components/MainContent.jsx';
import LeftMenu from './components/LeftMenu.jsx';

const store = createStore(dateViewApp, applyMiddleware(thunk), window.STATE_FROM_SERVER)


class App extends React.Component {
    render() {
        return <div style={{height: '100%'}}>
            <LeftMenu/>
            <MainContent/>
        </div>
    }
}


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("app")
);
