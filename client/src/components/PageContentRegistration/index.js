import React from 'react';
// import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PageContentWrap from '../PageContentWrap';
import FormRegistration from '../FormRegistration';
import Paragraph from '../Paragraph';
import TextLink from '../TextLink';

import { user } from '../../store/user/selectors';

import { allStoriesLink, myStoriesLink } from '../../data';

class PageRegistration extends React.Component {
  render() {
    return (
      <PageContentWrap>
        <Helmet>
          <title>Registration</title>
        </Helmet>

        {this.props.user && (
          <Paragraph>
            You are logged in.{' '}
            <TextLink to={myStoriesLink.href}>Post your own stories</TextLink>{' '}
            or{' '}
            <TextLink to={allStoriesLink.href}>
              read stories of other people.
            </TextLink>
          </Paragraph>
        )}

        {!this.props.user && <FormRegistration />}
      </PageContentWrap>
    );
  }
}

PageRegistration.propTypes = {
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
)(PageRegistration);
