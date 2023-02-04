import { css } from 'styled-components';

const button = css`
  color: var(--first-color);
  background-color: transparent;
  border: 1px solid var(--first-color);
  border-radius: var(--border-radius);
  font-size: var(--normal-font-size);
  font-family: var(--font-mono);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  padding: 1.25rem 1.75rem;

  &:hover,
  &:focus,
  &:active {
    background-color: var(--first-color-light);
    outline: none;
  }
  &:after {
    display: none !important;
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);
    &:hover,
    &:active,
    &:focus {
      color: var(--first-color);
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    position: relative;
    transition: var(--transition);
    color: var(--first-color);
    &:hover,
    &:focus,
    &:active {
      color: var(--first-color);
      outline: 0;
      &:after {
        width: 100%;
      }
      & > * {
        color: var(--first-color) !important;
        transition: var(--transition);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background-color: var(--first-color);
      transition: var(--transition);
      opacity: 0.5;
    }
  `,

  button,

  smallButton: css`
    color: var(--first-color);
    background-color: transparent;
    border: 1px solid var(--first-color);
    border-radius: var(--border-radius);
    padding: 0.75rem 1rem;
    font-size: var(--smaller-font-size);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
      background-color: var(--first-color-light);
      outline: none;
    }
    &:after {
      display: none !important;
    }
  `,

  bigButton: css`
    color: var(--first-color);
    background-color: transparent;
    border: 1px solid var(--first-color);
    border-radius: var(--border-radius);
    padding: 1.25rem 1.75rem;
    font-size: var(--small-font-size);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
      background-color: var(--first-color-light);
      outline: none;
    }
    &:after {
      display: none !important;
    }
  `,

  boxShadow: css`
    box-shadow: 0 10px 30px -15px var(--first-color-alt);
    transition: var(--transition);

    &:hover,
    &:focus {
      box-shadow: 0 20px 30px -15px var(--first-color-alt);
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--h1-font-size);
    li {
      position: relative;
      padding-left: 2rem;
      margin-bottom: var(--mb-0-75);
      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--first-color);
      }
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
};

export default mixins;
