import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

const translationHistory = (props) => {
  const { history } = props;
  return (
    <div className="wrapper translationhistory">
      <h3>Translated Words: </h3>
      <table className="results">
        <thead>
          <tr>
            <th>Original</th>
            <th>Detected Language</th>
            <th>Translation</th>
          </tr>
        </thead>
        <tbody>
          {history.map(translation => (
            <tr key={translation.id}>
              <td>{translation.text}</td>
              <td>{translation.lang}</td>
              <td>{translation.trans}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <NavLink className="navlink" to="/">Translator</NavLink>
    </div>
  );
};

translationHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object], [])).isRequired,
};

export default translationHistory;
