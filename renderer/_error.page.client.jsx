export { render };

import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { PageLayout } from './PageLayout';

async function render() {
  hydrateRoot(
    document.getElementById('page-view'),
    <PageLayout>
      <div>:(</div>
    </PageLayout>
  );
}
