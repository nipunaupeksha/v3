import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  About,
  Hero,
  Jobs,
  Layout,
  Featured,
  Projects,
  Contact,
  Certifications,
} from '../components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <Jobs />
      <Featured />
      <Projects />
      <Certifications />
      <Contact />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
