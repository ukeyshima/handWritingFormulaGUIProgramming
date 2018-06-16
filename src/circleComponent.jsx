import React from "react";
import { inject, observer } from "mobx-react";

@inject("state")
@observer
export default class CircleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }
  handleMouseDown() {
    this.props.state.updateCircleClick(true);
  }
  render() {
    return (
      <circle
        onMouseDown={this.handleMouseDown}
        cx={
          this.props.state.renderingAreaWidth +
          40 +
          (this.props.state.componentAreaWidth / 2 - 15) +
          (this.props.state.componentAreaWidth / 2 - 15) / 2
        }
        cy={20 + (this.props.state.componentAreaWidth / 2 - 15) / 2}
        r={(this.props.state.componentAreaWidth / 2 - 15) / 2}
        fill="rgb(100,150,255)"
      />
    );
  }
}
