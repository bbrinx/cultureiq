import { connect } from 'react-redux'
import TranslationHistoryView from '../views/TranslationHistoryView';

const mapStateToProps = (state) => {
  return {
    history: state.history
  }
}

export default connect(
  mapStateToProps
)(TranslationHistoryView)
