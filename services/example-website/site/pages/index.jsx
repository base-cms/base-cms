import React from 'react';
import Link from 'next/link';

const IndexPage = () => (
  <div>
    <h1>Default Home Page</h1>
    <p>
      <Link href="/test">
        <a>Test Page</a>
      </Link>
    </p>
  </div>
);

export default IndexPage;
