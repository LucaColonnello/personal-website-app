import React from 'react'
import Link from 'gatsby-link'

const Header = () => (
  <div
    style={{
      background: '#0d5f51',
      marginBottom: '1.45rem',
      borderBottom: '4px solid #69afa3'
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          @LucaColonnello
        </Link>
      </h1>
    </div>
  </div>
)

export default Header
