import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navigation from './components/Navigation';
import MainPage from './components/MainPage';
import BlogListPage from './components/BlogListPage';
import ContentPage from './components/ContentPage';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';
import ContactUsPage from './components/ContactUsPage';
import Login from './components/Login';
import EditPage from './components/EditPage';
import Announcement from './components/Announcement';
import ListPage from './components/ListPage';
import CollectionType from './enums/CollectionType';
import { URL_BG_COMMUNITY, URL_BG_FILMING, URL_BG_TOOLS } from './utils/constants';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navigation />
        <Announcement />
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

          {/* Handle legacy blog URLs */}
          <Route path="/publications/the_complete_se_guide" exact={true}>
            <Redirect to="/#guide" />
          </Route>
          <Route
            path="/publications/:id"
            exact={true}
            render={(routeProps) => {
              const path = 'blog/' + routeProps.match.params.id.replace(/_/g, '-');
              return <Redirect to={'/' + path} />;
            }}
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

          {/* Handle legacy collection URLs */}
          <Route path="/street-epistemology-frequently-asked-questions-faq" exact={true}>
            <Redirect to="/faq" />
          </Route>
          <Route path="/shop" exact={true}>
            <Redirect to="/#shop" />
          </Route>

          <Route path="/blog" exact={true}>
            <BlogListPage />
          </Route>
          <Route path="/login" exact={true}>
            <Login />
          </Route>
          <Route path="/contact" exact={true}>
            <ContactUsPage />
          </Route>
          <Route path="/community" exact={true}>
            <ListPage key="community" collectionType={CollectionType.Communities} backgroundUrl={URL_BG_COMMUNITY} />
          </Route>
          <Route path="/creators" exact={true}>
            <ListPage key="creators" collectionType={CollectionType.Creators} backgroundUrl={URL_BG_FILMING} />
          </Route>
          <Route path="/resources" exact={true}>
            <ListPage
              key="resources"
              collectionType={CollectionType.Resources}
              backgroundUrl={URL_BG_TOOLS}
              iconCircle={false}
            />
          </Route>
          <Route
            path="/acronyms"
            exact={true}
            render={() => <ContentPage path="acronyms" key="acronyms" showAttribution={false} />}
          />
          <Route path="/faq" exact={true} render={() => <ContentPage path="faq" key="faq" showAttribution={false} />} />
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
