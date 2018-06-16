import React from "react";
import { inject, observer } from "mobx-react";
import HandWritingFormulaArea from "./HandWritingFormulaArea.jsx";

@inject("state")
@observer
export default class rectPropertyArea extends React.Component {
  constructor(props) {
    super(props);
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleTopClick = this.handleTopClick.bind(this);
    this.handleWidthClick = this.handleWidthClick.bind(this);
    this.handleHeightClick = this.handleHeightClick.bind(this);
    this.handleRedClick = this.handleRedClick.bind(this);
    this.handleGreenClick = this.handleGreenClick.bind(this);
    this.handleBlueClick = this.handleBlueClick.bind(this);
    this.handleOKClick = this.handleOKClick.bind(this);
    this.state={
      left:0,top:0,width:0,height:0,red:1,green:1,blue:1
    }
  }
  handleLeftClick() {    
    this.props.state.updateTempRenderingObject("left",this.props.state.formulaCode);
    this.setState({
      left:this.props.state.formulaCode
    })
  }
  handleTopClick() {
    this.props.state.updateTempRenderingObject("top",this.props.state.formulaCode);
    this.setState({
      top:this.props.state.formulaCode
    })
  }
  handleWidthClick() {
    this.props.state.updateTempRenderingObject("width",this.props.state.formulaCode);
    this.setState({
      width:this.props.state.formulaCode
    })
  }
  handleHeightClick() {
    this.props.state.updateTempRenderingObject("height",this.props.state.formulaCode);
    this.setState({
      height:this.props.state.formulaCode
    })
  }
  handleRedClick() {
    this.props.state.updateTempRenderingObject("red",this.props.state.formulaCode);
    this.setState({
      red:this.props.state.formulaCode
    })
  }
  handleGreenClick() {
    this.props.state.updateTempRenderingObject("green",this.props.state.formulaCode);
    this.setState({
      green:this.props.state.formulaCode
    })
  }
  handleBlueClick() {
    this.props.state.updateTempRenderingObject("blue",this.props.state.formulaCode);
    this.setState({
      blue:this.props.state.formulaCode
    })
  }
  handleOKClick() {        
    this.props.state.handlePushRectObject();
  }
  render() {
    return (
      <div
        className="propertyArea"
        id="rectPropertyArea"
        style={{
          width: this.props.state.propertyAreaWidth,
          height: window.innerHeight - 100,
          position: "absolute",
          left:
            this.props.state.renderingAreaWidth +
            this.props.state.componentAreaWidth +
            30,
          top: 90,
          backgroundColor: "#aaa"
        }}
      >
        <button onClick={this.handleLeftClick}>left</button>
        {this.state.left}
        <br />
        <button onClick={this.handleTopClick}>top</button>
        {this.state.top}
        <br />
        <button onClick={this.handleWidthClick}>width</button>
        {this.state.width}
        <br />
        <button onClick={this.handleHeightClick}>height</button>
        {this.state.height}
        <br />
        <button onClick={this.handleRedClick}>r</button>
        {this.state.red}
        <br />
        <button onClick={this.handleGreenClick}>g</button>
        {this.state.green}
        <br />
        <button onClick={this.handleBlueClick}>b</button>
        {this.state.blue}
        <br />
        <button onClick={this.handleOKClick}>OK</button>
        <HandWritingFormulaArea />
      </div>
    );
  }
}
