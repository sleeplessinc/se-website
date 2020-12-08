import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import DynamicContentPage from './components/DynamicContentPage';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './components/MainPage';
import bg_question_mark from './images/bg_question_mark.webp';
import BlogListPage from './components/BlogListPage';
import BlogPage from './components/BlogPage';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';
import ContactUsPage from './components/ContactUsPage';
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/faq" exact={true}>
            <DynamicContentPage pageName="faq" title="Frequently Asked Questions" backgroundSource={bg_question_mark} />
          </Route>
          <Route path="/acronyms" exact={true}>
            <DynamicContentPage pageName="acronyms" title="Acronyms" backgroundSource={bg_question_mark} />
          </Route>
          <Route path="/blog/:id">
            <BlogPage />
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
