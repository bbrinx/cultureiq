import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

class TranslatorView extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      trans: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.text);
  }

  render() {
    const { text } = this.state;
    const { translation } = this.props;

    return (
      <div className="wrapper translator">
        <form onSubmit={this.handleSubmit}>
          <textarea 
            placeholder="Text..." 
            value={text} 
            name="text" 
            id="text" 
            onChange={this.handleChange} 
            onKeyPress={(e) => (e.key === 'Enter' ? this.handleSubmit(e) : null)}
          />
          <button type="submit" value="submit">Translate</button>
        </form>
        <div className="translation">{translation}</div>
        <NavLink className="navlink" to="/history">See Translation History</NavLink>
      </div>
    );
  }
}

TranslatorView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default TranslatorView;
