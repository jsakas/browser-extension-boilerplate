console.log('Starting Browser Extension 👾');

if (!browser) {
  var browser = chrome;
}
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { saveState, loadState } from './localStorage';


const PluginInterface = ({ initialState }) => {
  const [state] = useState(initialState);

  useEffect(() => {
    saveState(state)
  }, [JSON.stringify(state)])

  return (
    <div className="wrapper">
      Plugin Interface Goes Here
    </div>
  )
}

PluginInterface.defaultProps = {
  initialState: {},
};

const container = document.getElementById('component');

const root = createRoot(container!);

container && loadState().then(initialState => {
  root.render(
    <PluginInterface
      initialState={initialState}
    />
  );
});
