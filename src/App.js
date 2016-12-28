import React from 'react';
import WebMidi from 'webmidi';
import './App.css';
import { NotePlayer, InputWatcher } from './MIDI'
import ToneWrapper from './tonewrap';


var App = React.createClass({
  getInitialState() {
    return ({output_list: [], output: {id: null, name: null}})
  },
  get_outputs() {
    var outs =[];
    WebMidi.outputs.map((output, i) =>
      outs.push(<option value={output.id} key={i}>{output.name}</option>)
    );
    outs.push(<option value="tone" key="tone">Tone</option>)
    this.setState({output_list: outs});
  },
  handleChange(e) {
    if (e.target.value == "tone"){
      var tw = new ToneWrapper();
      this.setState({output: tw})
    } else {
      this.setState({output: WebMidi.getOutputById(e.target.value)})
    }
    console.log("Output Chosen: " + e.target.value)
  },
  render() {
    return (
      <div className="App">
        <h1>Choose your MIDI output here..</h1>
        <select onChange={this.handleChange}>
        {this.state.output_list}
        </select>
        <button onClick={this.get_outputs}>Get Outputs</button>
        <NotePlayer output={this.state.output}/>
        <InputWatcher output={this.state.output}/>
      </div>
    );
  }
})


export default App;
