import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import config, { srConfig } from '../../config';
import sr from '../../utils/sr';
import { usePrefersReducedMotion } from '../../hooks';
import { RoughNotation } from 'react-rough-notation';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-sans);
      font-size: var(--h3-font-size);
      color: var(--first-color-alt);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        top: 0.25rem;
        color: var(--first-color);
        font-size: var(--h3-font-size);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 75%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--first-color);

    &:hover,
    &:focus {
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(50%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--body-color);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--first-color);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Java',
    'Spring',
    'Python',
    'JavaScript (ES6+)',
    'TypeScript',
    'React',
    'Angular',
    'Node.js',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hi! I'm{' '}
              <RoughNotation
                animationDuration={1000}
                animationDelay={100}
                type="highlight"
                color={config.colors.accent_color}
                show={true}
              >
                Nipuna Upeksha
              </RoughNotation>
              , and I love programming and learning new technologies. I started programming back in
              2015 when I was selected to pursue my BSc. (Engineering) in Electronics and
              Telecommunication Engineering specializing in{' '}
              <RoughNotation
                animationDuration={1000}
                animationDelay={100}
                type="highlight"
                color={config.colors.accent_color}
                show={true}
              >
                {' '}
                Biomedical Engineering
              </RoughNotation>{' '}
              at University of Moratuwa
            </p>

            <p>
              Fast-forward to today, I had the privilege of working at{' '}
              <RoughNotation
                animationDuration={1000}
                animationDelay={100}
                type="circle"
                strokeWidth={2}
                color={config.colors.accent_color}
                show={true}
              >
                Sanota
              </RoughNotation>{' '}
              as a Electronic and Software Trainee Developer, and I'm currently working as a
              Software Engineer at{' '}
              <RoughNotation
                animationDuration={1000}
                animationDelay={100}
                strokeWidth={2}
                type="circle"
                color={config.colors.accent_color}
                show={true}
              >
                WSO2.
              </RoughNotation>{' '}
              My main focus these days is building highly scalable, security-oriented{' '}
              <RoughNotation
                animationDuration={1000}
                animationDelay={100}
                type="highlight"
                color={config.colors.accent_color}
                show={true}
              >
                Identity and Access Management
              </RoughNotation>{' '}
              solutions.
            </p>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
