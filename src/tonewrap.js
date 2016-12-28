import Tone from 'tone';

export default

class ToneWrapper {
  constructor(){
    this.synth = new Tone.Synth().toMaster();
    this.name = "Tone Synth"
  }

  playNote(note, channel){
    this.synth.triggerAttackRelease(note, "8n");
  }
}
