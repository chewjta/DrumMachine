const bankOne = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
{
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];



const bankTwo = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },
{
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }];



const activated = {
  backgroundColor: 'rgb(205,133,63)',
  boxShadow: "0 3px rgb(205,133,63)",
  height: 80,
  marginTop: 15 };


const unactivated = {
  backgroundColor: 'rgb(222,184,135)',
  boxShadow: "3px 3px 5px black",
  marginTop: 10 };


class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonStyle: unactivated };


    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activateButton = this.activateButton.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }

  activateButton() {
    if (this.props.power) {
      this.state.buttonStyle.backgroundColor === 'rgb(205,133,63)' ?
      this.setState({
        buttonStyle: unactivated }) :

      this.setState({
        buttonStyle: activated });

    } else {
      this.state.buttonStyle.marginTop === 15 ?
      this.setState({
        buttonStyle: unactivated }) :

      this.setState({
        padstyle: {
          height: 80,
          marginTop: 15,
          backgroundcolor: 'red',
          boxShadow: '0 3px grey' } });


    }
  }

  playSound(e) {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activateButton();
    setTimeout(() => this.activateButton(), 100);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
  }

  render() {
    return (
      React.createElement("div", { id: this.props.clipId,
        onClick: this.playSound,
        className: "drum-pad",
        style: this.state.buttonStyle },
      React.createElement("audio", { className: "clip", id: this.props.keyTrigger, src: this.props.clip }),
      this.props.keyTrigger));


  }}


class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let padBank;
    this.props.power ?
    padBank = this.props.currentPadBank.map((drumObj, i, Arr) => {

      return (
        React.createElement(DrumPad, {
          clipId: Arr[i].id,
          clip: Arr[i].url,
          keyTrigger: Arr[i].keyTrigger,
          keyCode: Arr[i].keyCode,
          updateDisplay: this.props.updateDisplay,
          power: this.props.power }));


    }) :
    padBank = this.props.currentPadBank.map((drumObj, i, Arr) => {

      return (
        React.createElement(DrumPad, {
          clipId: Arr[i].id,
          clip: "#",
          keyTrigger: Arr[i].keyTrigger,
          keyCode: Arr[i].keyCode,
          updateDisplay: this.props.updateDisplay,
          power: this.props.power }));


    });
    return (
      React.createElement("div", { className: "pad-bank" },
      padBank));


  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      display: String.fromCharCode(160),
      currentPadBank: bankOne,
      currentPadBankId: 'Kit 1',
      sliderVal: 0.4 };

    this.displayClipName = this.displayClipName.bind(this);
    this.selectBank = this.selectBank.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.powerControl = this.powerControl.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }
  powerControl() {
    this.setState({
      power: !this.state.power,
      display: String.fromCharCode(160) });

  }

  selectBank() {
    if (this.state.power) {
      this.state.currentPadBankId === 'Kit 1' ?
      this.setState({
        currentPadBank: bankTwo,
        display: 'Kit 2',
        currentPadBankId: 'Kit 2' }) :

      this.setState({
        currentPadBank: bankOne,
        display: 'Kit 1',
        currentPadBankId: 'Kit 1' });

    }
  }

  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name });

    }
  }

  adjustVolume(event) {
    if (this.state.power) {
      this.setState({
        sliderVal: event.target.value,
        display: "Volume: " + Math.round(event.target.value * 100) });

      setTimeout(() => this.clearDisplay(), 1000);
    }
  }

  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160) });

  }


  render() {
    const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach(sound => {
      sound.volume = this.state.sliderVal;
    });

    const selectBankStyle = this.state.currentPadBank === bankOne ? {
      float: 'left',
      color: 'rgb(165,42,42)' } :
    {
      float: 'right',
      backgroundColor: 'rgb(222,184,135)' };


    const powerstyle = this.state.power ? {
      color: '#a1f20a' } :
    { color: 'gray' };

    const themeStyle = this.state.power ?
    this.state.currentPadBank === bankOne ?
    { color: 'rgb(160,82,45)' } : { color: 'rgb(165,42,42)' } :
    { color: 'rgb(255,222,173)' };


    return (
      React.createElement("div", { id: "drum-machine", className: "inner-container", style: themeStyle },
      React.createElement(PadBank, {
        power: this.state.power,
        updateDisplay: this.displayClipName,
        clipvolume: this.state.sliderVal,
        currentPadBank: this.state.currentPadBank }),


      React.createElement("div", { className: "controlPanel" },
      React.createElement("div", { id: "powerandvolume" },
      React.createElement("div", { className: "control" },

      React.createElement("i", { id: "powerbutton", className: "fa fa-power-off", onClick: this.powerControl, style: powerstyle })),

      React.createElement("div", { className: "volume-slider" },

      React.createElement("input", { type: "range", min: "0", max: "1", step: "0.01", value: this.state.sliderVal, onChange: this.adjustVolume }))),


      React.createElement("p", { id: "display" },
      this.state.display),


      React.createElement("div", { className: "control" },
      React.createElement("p", null, "Bank:"),
      React.createElement("div", { onClick: this.selectBank, className: "select" },
      React.createElement("div", { style: selectBankStyle, className: "inner" }))),


      React.createElement("div", { id: "creator" }, "D.M. by Alvis"))));





  }}



ReactDOM.render(
React.createElement(App, null),
document.getElementById('root'));