import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppTable from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const App = () => (
  <MuiThemeProvider>
    <AppTable />
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
