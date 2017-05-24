import React from 'react';

const Loading = (props) => (
  <div className="loader">
      <span className="loader-inner">{props.text}</span>
  </div>
);

export default Loading;