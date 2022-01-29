import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Karaoke from './kareoke/Kareoke';
import styles from './main.css';
import Main from './mainMenu/ReduxMainMenu';
import Urls from '../utils/Urls';
import TVPage from './tv/TVPage';
import ToDoPage from './todo/ToDoPage';
import InternetPage from './internet/InternetPage';
import ApplicationActionCreator from '../actionCreators/ApplicationActionCreator';
import WeatherPage from './weather/Main';

class Navigation extends React.Component {
  componentDidUpdate(prevProps) {
    const { history, currentUrl, onUpdateUrl } = this.props;

    if (prevProps.currentUrl !== currentUrl) {
      history.push(currentUrl);
    } else if (window.location.pathname !== currentUrl) {
      onUpdateUrl(window.location.pathname);
    }
  }

  render() {
    return (
      <main className={styles.mainPage}>
        <section className={styles.pageContent}>
          <Switch>
            <Route path={Urls.Kareoke.BASE} component={Karaoke} />
            <Route path={Urls.Tv.TV_MAIN} component={TVPage} />
            <Route path={Urls.ToDo.MAIN} component={ToDoPage} />
            <Route path={Urls.Internet.MAIN} component={InternetPage} />
            <Route path={Urls.Weather.MAIN} component={WeatherPage} />
            <Route exact path={Urls.HOME} component={Main} />
            <Route exact path={Urls.Garden.MENU} component={Main} />
            <Redirect path="*" to={Urls.HOME} />
          </Switch>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUrl: state.application.store.currentUrl.value
});

const mapDispatchToProps = () => ({
  onUpdateUrl: (url) => {
    ApplicationActionCreator.changeUrl(url);
  }
});

const ConnectedNavigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navigation));

export default () => (
  <Router>
    <ConnectedNavigation />
  </Router>
);
