import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright="2025 devforgely"
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/devforgely',
          blankTarget: true,
        },
        {
          key: 'devforgely',
          title: 'devforgely',
          href: 'https://github.com/devforgely',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
