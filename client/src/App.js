import React, { Component } from 'react';
import swal from 'sweetalert';
import Translator from './views/translator';
import TranslationHistory from './views/translationHistory';
import './App.scss';

class App extends Component {
  static generateKey(pre) {
    return `${pre}_${new Date().getTime()}`;
  }

  constructor() {
    super();
    this.state = {
      translationHistory: [],
    };
    this.translate = this.translate.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  async translate(text) {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      if (response.ok) {
        const result = await response.json();
        this.updateState(result);
      } else if (response.status === 500) {
        swal('Oops', 'Seems like the server is down!', 'error');
      } else {
        swal('Oops', 'Something went wrong!', 'error');
      }
    } catch (err) {
      swal('Oops', 'Something went wrong!', 'error');
    }
  }

  updateState(result) {
    const { translationHistory } = this.state;
    const { text, lang, trans } = result;
    const id = App.generateKey(text);
    const translation = {
      text, lang, trans, id,
    };
    this.setState({ translationHistory: [...translationHistory, translation] });
  }

  render() {
    const { translationHistory } = this.state;
    return (
      <div className="main">
        <div className="container">
          <Translator translate={this.translate} />
          <TranslationHistory history={translationHistory} />
        </div>
      </div>
    );
  }
}

export default App;
