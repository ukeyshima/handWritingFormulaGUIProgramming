import React from "react";
import { inject, observer } from "mobx-react";
import RectComponent from "./rectComponent.jsx";
import CircleComponent from "./circleComponent.jsx";

@inject("state")
@observer
export default class ComponentArea extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
      <rect  x={this.props.state.renderingAreaWidth+20}
      y={10}
      width={this.props.state.componentAreaWidth}
      height={window.innerHeight-100}
      fill="#ccc"/>
      <RectComponent/>
      <CircleComponent/>
      </React.Fragment> 
    );
  }
}
