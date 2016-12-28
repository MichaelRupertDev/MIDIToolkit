import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WebMidi from 'webmidi';
import './index.css';

WebMidi.enable(function (err) {

  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");
  }

});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
