import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './state/reducers';


import TranslatorContainer from './containers/TranslatorContainer';
import TranslationHistoryContainer from './containers/TranslationHistoryContainer';
import './App.scss';

const store = createStore(reducers);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="main">
            <div className="container">
              <Route path="/" exact component={TranslatorContainer} />
              <Route path="/history" component={TranslationHistoryContainer} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
