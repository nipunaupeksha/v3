import React from 'react';
import PropTypes from 'prop-types';
import {
  IconAward,
  IconBookmark,
  IconCode,
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconInstagram,
  IconLinkedin,
  IconLoader,
  IconLogo,
  IconMedium,
  IconStackOverflow,
  IconStar,
  IconTwitter,
} from '.';

const Icon = ({ name }) => {
  switch (name) {
    case 'Award':
      return <IconAward />;
    case 'Bookmark':
      return <IconBookmark />;
    case 'Code':
      return <IconCode />;
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'Fork':
      return <IconFork />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Instagram':
      return <IconInstagram />;
    case 'LinkedIn':
      return <IconLinkedin />;
    case 'Loader':
      return <IconLoader />;
    case 'Logo':
      return <IconLogo />;
    case 'Medium':
      return <IconMedium />;
    case 'StackOverflow':
      return <IconStackOverflow />;
    case 'Star':
      return <IconStar />;
    case 'Twitter':
      return <IconTwitter />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
