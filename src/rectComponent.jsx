import React from "react";
import { inject, observer } from "mobx-react";

@inject("state")
@observer
export default class RectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);    
  }
  handleMouseDown() {
    this.props.state.updateRectClick(true);
  }
  
  render() {
    return (
      <rect
        onMouseDown={this.handleMouseDown}        
        x={this.props.state.renderingAreaWidth + 30}
        y={20}
        width={this.props.state.componentAreaWidth / 2 - 15}
        height={this.props.state.componentAreaWidth / 2 - 15}
        fill="rgb(100,150,255)"
      />
    );
  }
}
