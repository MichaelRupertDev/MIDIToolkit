import React, { Component } from 'react';
import WebMidi from 'webmidi'
export default

class NotePlayer extends Component {
  clickHandler  = () => {
    console.log("Played C5 on " + this.props.output)
    this.props.output.playNote("C3", 1);
  }

  render(){
    var msg = "Please choose an output"
    if(this.props.output.name){
      msg = "Play C Major on " + this.props.output.name
    }
    return (
      <div>
        <button onClick={this.clickHandler}>{msg}</button>
      </div>
    )};
}

class InputWatcher extends Component {
  constructor(props) {
    super(props)
    this.state = {input_list: [], input: {id: null, name: null}}
  }

  get_inputs = () => {
    var ins = [];
    WebMidi.inputs.map((input, i) =>
      ins.push(<option value={input.id} key={i}>{input.name}</option>)
    );
    this.setState({input_list: ins});
  }

  handleChange = (e) => {
      var input = WebMidi.getInputById(e.target.value)
      this.setState({input: input})
      var cb = null;
      input.addListener('noteon', "all",
         cb = (e, output) => {
          this.props.output.playNote(e.note.name + e.note.octave)
          console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
        })
      console.log("Input Chosen: " + e.target.value)
  }

  render() {
    return (
      <div className="App">
        <h4>Choose your MIDI Input here..</h4>
        <select onChange={this.handleChange}>
        {this.state.input_list}
        </select>
        <button onClick={this.get_inputs}>Get Inputs</button>
      </div>
      )
    }
}

export {InputWatcher, NotePlayer}
