import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Header from './header';
import meta from '../data/meta'

const Layout = ({ children }) => {
  const content = (
    <div id="wrapper" className="page">
      <Header>
        <div>{children}</div>
      </Header>
    </div>
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
