import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import DynamicContentPage from './components/DynamicContentPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import bg_question_mark from './images/bg_question_mark.webp';
import BlogListPage from './components/BlogListPage';
import BlogPage from './components/BlogPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="mt-5">
          <Switch>
            <Route path="/faq">
              <DynamicContentPage
                pageName="faq"
                title="Frequently Asked Questions"
                backgroundSource={bg_question_mark}
              />
            </Route>
            <Route path="/acronyms">
              <DynamicContentPage pageName="acronyms" title="Acronyms" backgroundSource={bg_question_mark} />
            </Route>
            <Route path="/blog/:id">
              <BlogPage />
            </Route>
            <Route path="/blog">
              <BlogListPage />
            </Route>
            <Route path="/">
              <MainPage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
