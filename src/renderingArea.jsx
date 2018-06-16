import React from "react";
import { inject, observer } from "mobx-react";

@inject("state")
@observer
export default class RenderingArea extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (            
      <rect
        x={10}
        y={10}
        width={this.props.state.renderingAreaWidth}
        height={window.innerHeight - 100}
        fill="rgba(0,0,0,0)"
      />      
    );
  }
}
