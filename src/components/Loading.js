import React from 'react';

const Loading = ({text}) => (
  <div className="loader">
      <span className="loader-inner">{text}</span>
  </div>
);

export default Loading;