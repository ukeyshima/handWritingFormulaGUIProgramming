import React from "react";
import { inject, observer } from "mobx-react";

@inject("state")
@observer
export default class RunButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  componentDidMount() {
    this.props.state.updateRunButton(this.refs.runButton);
  }
  handleClick() {
      const startTime=new Date().getTime();
      const timeStart=()=>{
        const requestId=requestAnimationFlame(timeStart);
        const time=(new Date().getTime()-startTime)*0.001;
        this.props.state.updateTime(requestId,time);
      }
  }

  handleMouseEnter() {
    this.props.state.updateRunButtonColor({
      backgroundColor: "#e38",
      fontColor: "#eee"
    });
  }
  handleMouseLeave() {
    this.props.state.updateRunButtonColor({
      backgroundColor: "#eee",
      fontColor: "#e38"
    });
  }
  render() {
    return (
      <button
        ref="runButton"
        id="run"
        style={{
          backgroundColor: this.props.state.runButtonColor.backgroundColor,
          color: this.props.state.runButtonColor.fontColor
        }}
        onClick={this.handleClick}
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouseEnter}
      >
        ▶︎
      </button>
    );
  }
}
