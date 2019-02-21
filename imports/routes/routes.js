import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from './../ui/Signup';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';


window.browserHistory = browserHistory;
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];
/**
 * onEnterPublicPage and onEnterPrivatePage fixed the issue when using back/foward button going to the
 * unauth page
 */
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/links');
  }
}
const onEnterPrivatePage = () => {
  if(!Meteor.userId()) {
    browserHistory.replace("/");
  }
}
export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
    // console.log('isUnauthenticatedPage', isUnauthenticatedPage);
    if (isUnauthenticatedPage && isAuthenticated) {
      browserHistory.replace('/links');
    } else if (isAuthenticatedPage && !isAuthenticated) {
      browserHistory.replace('/');
    }
}
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage} />
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage} />
    <Route path="*" component={NotFound} />
  </Router>
);