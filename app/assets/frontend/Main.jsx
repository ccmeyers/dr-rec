import React from 'react';
import Index from './components/Index';

let documentReady = () => {
  React.render(
    <Index />,
    document.getElementById('react')
  )
};

$(documentReady);
