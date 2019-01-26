import React, { Component } from 'react';
import { connect } from 'react-redux'

import { appendTranslation } from "../state/actions";
import TranslatorView from '../views/TranslatorView';


class TranslatorContainer extends Component {
  constructor() {
    super();

    this.state = {
      translation: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
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
      if (!response.ok) {
        console.log('ERROR: ', response.statusText);
        return null;
      }
      const result = await response.json();
      return result;
    } catch (err) {
      console.log('ERROR: ', err);
      return null;
    }
  }

  updateState(result) {
    const { text, lang, trans } = result;
    const id = `${text}_${new Date().getTime()}`;
    const translation = {
      text, lang, trans, id,
    };
    this.setState({translation: trans});
    this.props.appendTranslation(translation);
  }

  async handleSubmit(text) {
    const translation = await this.translate(text);
    if(translation) this.updateState(translation);
  }

  render() {
    return <TranslatorView handleSubmit={this.handleSubmit} translation={this.state.translation} />
  }
}

const mapDispatchToProps = dispatch => ({
  appendTranslation: (translation) => dispatch(appendTranslation(translation))
})

export default connect(
  null,
  mapDispatchToProps
) (TranslatorContainer)
