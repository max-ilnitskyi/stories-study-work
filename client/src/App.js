import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Wrap component with header and footer for all pages
import Page from './components/Page';

// Pages components
import PageContentMain from './components/PageContentMain';
import PageContentMyStories from './components/PageContentMyStories';
import PageContentAllStories from './components/PageContentAllStories';
import PageContentSingleStory from './components/PageContentSingleStory';
import PageContentRegistration from './components/PageContentRegistration';
import PageContentNotFound from './components/PageContentNotFound';

// Component where showed quick messages
import Messages from './components/Messages';

// Global styled styles
import { GlobalStyle } from './styles';

// Redux store
import store from './store';

import {
  headTitleMain as headTitle // Head title for index page (also default)
} from './data';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Page>
            <Helmet>
              <title>{headTitle}</title>
            </Helmet>
            <GlobalStyle />
            <Switch>
              <Route exact path="/" component={PageContentMain} />
              <Route
                path="/my-stories/:page"
                component={PageContentMyStories}
              />
              <Route path="/my-stories" component={PageContentMyStories} />
              <Route
                path="/all-stories/:page"
                component={PageContentAllStories}
              />
              <Route path="/all-stories" component={PageContentAllStories} />
              <Route path="/story/:id" component={PageContentSingleStory} />
              <Route path="/registration" component={PageContentRegistration} />
              <Route component={PageContentNotFound} />
            </Switch>
            <Messages />
          </Page>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
