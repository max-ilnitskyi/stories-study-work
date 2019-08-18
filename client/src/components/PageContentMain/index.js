import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PageContentWrap from '../PageContentWrap';
import TextLink from '../TextLink';
import Paragraph from '../Paragraph';

import { user } from '../../store/user/selectors';

import { allStoriesLink, myStoriesLink, registrationLink } from '../../data';

class PageContentMain extends React.Component {
  render() {
    return (
      <PageContentWrap>
        <Paragraph>
          This is website where you can{' '}
          <TextLink to={allStoriesLink.href}>
            read stories of other people.
          </TextLink>
        </Paragraph>

        {!this.props.user && (
          <Paragraph>
            To post your own stories you need sign in with form at the upper
            right corner (or{' '}
            <TextLink to={registrationLink.href}>create new account</TextLink>{' '}
            if you have not any yet).
          </Paragraph>
        )}

        {this.props.user && (
          <Paragraph>
            Also you can{' '}
            <TextLink to={myStoriesLink.href}>post your own stories.</TextLink>
          </Paragraph>
        )}
      </PageContentWrap>
    );
  }
}

PageContentMain.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired
  })
};

const mapStateToProps = state => ({
  user: user(state)
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContentMain);
