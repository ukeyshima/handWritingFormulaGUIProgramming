import React from "react";
import { inject, observer } from "mobx-react";

@inject("state")
@observer
export default class RenderingArea extends React.Component {
  constructor(props) {
    super(props);
    this.handlePushRectObject = this.handlePushRectObject.bind(this);
    this.execute = this.execute.bind(this);
    this.htmlText = `
    <!DOCTYPE html>
    <html lang="ja">
        <head>
            <meta charset="utf-8">
            <style>
                body{
                    width:100vw;
                    height:100vh;
                    margin:0;
                }
                #canvas{
                    width:100%;
                    height:100%;
                }
            </style>
        </head>
        <body>
            <canvas id="canvas"></canvas>
            <script></script>
        </body>
    </html>
    `;
  }
  componentDidMount() {
    this.props.state.updateHandlePushRectObject(this.handlePushRectObject);
  }
  handlePushRectObject() {
    const temp = this.props.state.tempRenderingObject;
    console.log(temp);
    const jsText = `
      const canvas=document.getElementById("canvas");
      console.log(canvas);
      canvas.width=window.innerWidth;
      canvas.height=window.innerHeight;
      const context=canvas.getContext("2d");
      const startTime=new Date().getTime();
      context.fillStyle="#fff";
      context.fillRect(0,0,canvas.width,canvas.height);
      const animation=()=>{
        const t=(new Date().getTime()-startTime)/1000;
        context.fillStyle="rgb("+${temp.red}*255+","+${temp.green}*255+","+${
      temp.blue
    }*255+")";
        context.fillRect(${temp.left}*window.innerWidth,${
      temp.top
    }*window.innerHeight,${temp.width}*window.innerWidth,${
      temp.height
    }*window.innerHeight)
        console.log(${temp.left}*window.innerWidth,${
      temp.top
    }*window.innerHeight,${temp.width}*window.innerWidth,${
      temp.height
    }*window.innerHeight);
        console.log("rgb("+${temp.red}*255+","+${temp.green}*255+","+${
      temp.blue
    }*255+")");
        requestAnimationFrame(animation);
      }
      animation();
      `;
    this.execute(jsText);
  }
  execute(text) {
    const domParser = new DOMParser();
    let document_obj = null;
    const textFile = this.htmlText;
    try {
      document_obj = domParser.parseFromString(textFile, "text/html");
      if (document_obj.getElementsByTagName("parsererror").length) {
        document_obj = null;
      }
    } catch (e) {
      console.log(e);
    }
    if (document_obj) {
      const scripts = document_obj.getElementsByTagName("script");
      const blob = new Blob([text], {
        type: "application/javascript"
      });
      scripts[0].src = URL.createObjectURL(blob);
    }
    const blob = new Blob([document_obj.documentElement.outerHTML], {
      type: "text/html"
    });
    this.refs.iframeArea.contentWindow.location.replace(
      URL.createObjectURL(blob)
    );
  }
  render() {
    return (
      <iframe
        id="iframeArea"
        ref="iframeArea"
        style={{
          backgroundColor: "#fff",
          width: this.props.state.renderingAreaWidth,
          height: window.innerHeight - 100
        }}
      />
    );
  }
}
