import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './components/MainPage';
import BlogListPage from './components/BlogListPage';
import ContentPage from './components/ContentPage';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';
import ContactUsPage from './components/ContactUsPage';
import Login from './components/Login';
import EditPage from './components/EditPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route
            path="/:collection/:id/edit"
            exact={true}
            render={(routeProps) => (
              <EditPage
                path={`${routeProps.match.params.collection}/${routeProps.match.params.id}`}
                key={`${routeProps.match.params.collection}/${routeProps.match.params.id}`}
              />
            )}
          />
          <Route
            path="/:id/edit"
            exact={true}
            render={(routeProps) => (
              <EditPage path={`${routeProps.match.params.id}`} key={routeProps.match.params.id} />
            )}
          />
          <Route
            path="/:collection/:id"
            exact={true}
            render={(routeProps) => (
              <ContentPage
                path={`${routeProps.match.params.collection}/${routeProps.match.params.id}`}
                key={`${routeProps.match.params.collection}/${routeProps.match.params.id}`}
              />
            )}
          />
          <Route path="/blog" exact={true}>
            <BlogListPage />
          </Route>
          <Route path="/login" exact={true}>
            <Login />
          </Route>
          <Route path="/contact" exact={true}>
            <ContactUsPage />
          </Route>
          <Route
            path="/:id"
            exact={true}
            render={(routeProps) => (
              <ContentPage path={`${routeProps.match.params.id}`} key={routeProps.match.params.id} />
            )}
          />
          <Route path="/" exact={true}>
            <MainPage />
          </Route>
          <Route path="/home" exact={true}>
            <Redirect to="/" />
          </Route>
          <Route path="/">
            <PageNotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
