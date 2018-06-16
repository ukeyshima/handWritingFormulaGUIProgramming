import React from "react";
import RenderingArea from "./renderingArea.jsx";
import ComponentArea from "./componentArea.jsx";
import IframeArea from "./IframeArea.jsx";
import { inject, observer } from "mobx-react";
import RectPropertyArea from "./rectPropertyArea.jsx";

@inject("state")
@observer
export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.state = {
      mouseX: 0,
      mouseY: 0
    };
  }
  handleMouseMove(e) {
    const event = e.nativeEvent;
    this.setState({
      mouseX: event.clientX,
      mouseY: event.clientY - 85
    });
  }
  handleMouseUp() {
    if (this.props.state.rectClick) {
      const renderingAreaWidth = this.props.state.renderingAreaWidth;
      this.props.state.updateRenderingAreaWidth(
        renderingAreaWidth - this.props.state.propertyAreaWidth - 10
      );
      this.props.state.updateRectPropertyChangeFlag(true);
      this.props.state.updateRectClick(false);
      this.props.state.updateTempRenderingObject("type", "rect");
    }
    this.props.state.updateCircleClick(false);
  }
  render() {
    return (
      <React.Fragment>
        <IframeArea/>      
        <svg        
        xmlns="http://www.w3.org/2000/svg"        
          id="editor"
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        >
          <RenderingArea />
          <ComponentArea />
          {(() => {
            if (this.props.state.rectClick) {
              return (
                <rect
                  x={
                    this.state.mouseX -
                    (this.props.state.componentAreaWidth / 2 - 15) / 2
                  }
                  y={
                    this.state.mouseY -
                    (this.props.state.componentAreaWidth / 2 - 15) / 2
                  }
                  width={this.props.state.componentAreaWidth / 2 - 15}
                  height={this.props.state.componentAreaWidth / 2 - 15}
                  fill="rgba(100,150,255,0.5)"
                />
              );
            }
            if (this.props.state.circleClick) {
              return (
                <circle
                  cx={this.state.mouseX}
                  cy={this.state.mouseY}
                  r={(this.props.state.componentAreaWidth / 2 - 15) / 2}
                  fill="rgba(100,150,255,0.5)"
                />
              );
            }
          })()}
          {this.props.state.renderingObject.map((e, i, a) => {
            return (
              <rect
                key={i}
                x={(() => {
                  const t = this.props.state.time;
                  return eval(`e.left * this.props.state.renderingAreaWidth;`);
                })()}
                y={e.top * window.innerWidth}
                width={e.width * this.props.state.renderingAreaWidth}
                height={e.height * window.innerWidth}
                fill={
                  "rgb(" +
                  e.red * 255 +
                  "," +
                  e.green * 255 +
                  "," +
                  e.blue * 255 +
                  ")"
                }
              />
            );
          })}
        </svg>
        {(() => {
          if (this.props.state.rectPropertyChangeFlag) {
            return <RectPropertyArea />;
          }
        })()}
      </React.Fragment>
    );
  }
}
