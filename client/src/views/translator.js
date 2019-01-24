import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Translator extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
    this.onEnterPress = this.onEnterPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onEnterPress(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      this.handleSubmit(e);
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }


  handleSubmit(e) {
    e.preventDefault();
    const { text } = this.state;
    const { translate } = this.props;
    if (!text) return;
    translate(text);
    this.setState({ text: '' });
  }

  render() {
    const { text } = this.state;
    return (
      <div className="wrapper translator">
        <form onSubmit={this.handleSubmit}>
          <textarea value={text} type="text" name="text" onChange={this.handleChange} onKeyDown={this.onEnterPress} />
          <button type="submit" value="submit">Translate</button>
        </form>
        
      </div>
    );
  }
}

Translator.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default Translator;
