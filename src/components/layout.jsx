import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import styled, { ThemeProvider } from 'styled-components';

import Header from './header';
import meta from '../assets/data/meta';
import theme from '../global/theme';

import '../assets/css/reset.css';
import '../assets/css/style.css';

const Body = styled.main`
  width: 60%;
  margin: 0 auto;
  font-family: ${(props) => props.theme.fonts.Text};
`

const Layout = ({ children }) => {
  const content = (
    <ThemeProvider theme={theme}>
      <Body>
        <Header />
        <div style={{ clear: "both" }}>{children}</div>
      </Body>
    </ThemeProvider>
  )

  return (
    <StaticQuery
      query={graphql`query SiteTitleQuery { site { siteMetadata { title } } }`}
      render={data => (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={meta}
          >
            <html lang="en" />
          </Helmet>
          {content}
        </>
      )}
    />
  )
}
export default Layout;
