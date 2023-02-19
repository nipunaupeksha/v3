import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '../../config';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import sr from '../../utils/sr';
import { usePrefersReducedMotion } from '../../hooks';
import { graphql, useStaticQuery } from 'gatsby';
import { TransitionGroup } from 'react-transition-group';
import { Icon } from '../../components/icons';

const StyledCertificationsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--h1-font-size));
  }

  .archive-link {
    font-family: var(--font-sans);
    font-size: var(--normal-font-size);
    &:after {
      bottom: 0.1em;
    }
  }

  .certifications-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 10px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
    font-family: var(--font-sans);
  }
`;

const StyledCertificate = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .certification-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .certification-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--body-color);
    transition: var(--transition);
    overflow: auto;
  }

  .certification-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 10px;

    .award {
      color: var(--first-color);
      svg {
        width: 20px;
        height: 20px;
      }
    }

    .certification-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--first-color);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .certification-title {
    margin: 0 0 10px;
    color: var(--first-color);
    font-size: var(--h2-font-size);

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .certification-description {
    color: var(--text-color);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .certification-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      color: var(--first-color);
      font-size: var(--smaller-font-size);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }

  .certification-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }

    a {
      width: 100%;
      height: 100%;
      background-color: var(--body-color);
      border-radius: var(--border-radius);
      vertical-align: middle;

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before,
        .img {
          background: transparent;
          filter: none;
        }
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(50%);
      }
    }
  }
`;

const Certifications = () => {
  const data = useStaticQuery(graphql`
    query {
      certifications: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/certifications/" }
          frontmatter: { showInCertifications: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              issuer
            }
            html
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealCertifications = useRef([]);
  const revealArchiveLink = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  useEffect(() => {
    if (prefersReducedMotion) return;
    sr.reveal(revealTitle.current, srConfig());
  }, []);
  const GRID_LIMIT = 6;
  const certificates = data.certifications.edges.filter(({ node }) => node);
  const firstSix = certificates.slice(0, GRID_LIMIT);
  const certificationsToShow = showMore ? certificates : firstSix;

  const certificatesInner = node => {
    const { frontmatter, html } = node;
    const { title, issuer, cover } = frontmatter;
    const image = getImage(cover);

    return (
      <div className="certification-inner">
        <header>
          <div className="certification-top">
            <div className="award">
              <Icon name="Award" />
            </div>
          </div>

          <h3 className="certification-title">{title}</h3>

          <div className="certification-description" dangerouslySetInnerHTML={{ __html: html }} />
        </header>

        <div className="certification-image">
          <a href="#">
            <GatsbyImage image={image} alt={title} className="img" />
          </a>
        </div>

        <footer>
          {issuer && (
            <ul className="certification-tech-list">
              <li>{issuer}</li>
            </ul>
          )}
        </footer>
      </div>
    );
  };

  return (
    <StyledCertificationsSection id="certifications">
      <h2 ref={revealTitle}>Certifications</h2>

      <ul className="certifications-grid">
        {prefersReducedMotion ? (
          <>
            {certificationsToShow &&
              certificationsToShow.map(({ node }, i) => (
                <StyledCertificate key={i}>{certificatesInner(node)}</StyledCertificate>
              ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {certificationsToShow &&
              certificationsToShow.map(({ node }, i) => (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}
                >
                  <StyledProject
                    key={i}
                    ref={el => (revealCertifications.current[i] = el)}
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}
                  >
                    {projectInner(node)}
                  </StyledProject>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </ul>
      <button className="more-button" onClick={() => setShowMore(!showMore)}>
        Show {showMore ? 'Less' : 'More'}
      </button>
    </StyledCertificationsSection>
  );
};

export default Certifications;
