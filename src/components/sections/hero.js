import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '../../utils';
import { usePrefersReducedMotion } from '../../hooks';
import { RoughNotation } from 'react-rough-notation';
import { mixins } from '../../styles';
import config from '../../config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 var(--mb-0-5) var(--mb-0-25);
    color: var(--text-color);
    font-family: var(--font-clibre);
    font-size: var(--h1-font-size);
    font-weight: 500;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: var(--mb-0-5);
    margin-bottom: var(--mb-0-5);
    color: var(--text-color);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const StyledEmailLink = styled.a`
  ${mixins.bigButton};
  margin-top: 50px;
  font-family: var(--font-sans);
  font-size: var(--normal-font-size);
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is,</h1>;
  const two = <h2 className="big-heading">Nipuna Upeksha.</h2>;
  const three = <h3 className="big-heading"> 
  <RoughNotation
  animationDuration={1000}
  animationDelay={100}
  strokeWidth={2}
  iterations={4}
  type="circle"
  color={config.colors.accent_color}
  show={true}
>A Programming Enthusiast.</RoughNotation></h3>;
  const four = (
    <>
      <p>
        I'm a graduate from{' '}
        <RoughNotation
          animationDuration={1000}
          animationDelay={100}
          type="highlight"
          color={config.colors.accent_color}
          show={true}
          multiline={true}
        >
          University of Moratuwa
        </RoughNotation>
        , Department of Electronic and Telecommunication Engineering specializing in{' '}
        <RoughNotation
          animationDuration={1000}
          animationDelay={100}
          type="highlight"
          color={config.colors.accent_color}
          show={true}
          multiline={true}
        >
          Biomedical Engineering.
        </RoughNotation>{' '}
        Currently I work as a Software Engineer at{' '}
        <RoughNotation
          animationDuration={1000}
          animationDelay={100}
          type="highlight"
          color={config.colors.accent_color}
          show={true}
        >
          WSO2
        </RoughNotation>{' '}
        while enhancing my skills and competencies, and sharing my knowledge with the Software
        Development community. Currently, my main focus lays in Identity and Access Management while
        integrating customizations to{' '}
        <RoughNotation
          animationDuration={1000}
          animationDelay={100}
          type="highlight"
          color={config.colors.accent_color}
          show={true}
          multiline={true}
        >
          WSO2 Identity Server.
        </RoughNotation>
      </p>
    </>
  );
  const five = <StyledEmailLink href={`mailto:${config.email}`}>Contact Me</StyledEmailLink>;

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
