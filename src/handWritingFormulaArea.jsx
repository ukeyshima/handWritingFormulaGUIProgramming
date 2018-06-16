import React from "react";
import { inject, observer } from "mobx-react";
import * as MyScriptJS from "myscript/src/myscript";
import "myscript/dist/myscript.min.css";
import latex2js from "./latexToJs";
import katex from "katex";

@inject("state")
@observer
export default class HandWritingFormulaArea extends React.Component {
  constructor(props) {
    super(props);
    this.handleConvert = this.handleConvert.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
    this.width = window.innerWidth;    
  }
  componentDidMount() {
    this.editor = MyScriptJS.register(this.refs.editor, {
      recognitionParams: {
        type: "MATH",
        protocol: "WEBSOCKET",
        apiVersion: "V4",
        server: {
          scheme: "https",
          host: "webdemoapi.myscript.com",
          applicationKey: "331b4bdf-7ace-4265-94f1-b01504c78743",
          hmacKey: "44f4f4ce-fd0f-48a1-b517-65d2b9465413"
        }
      }
    });
    function cleanLatex(latexExport) {
      if (latexExport.includes("\\\\")) {
        const steps = "\\begin{align*}" + latexExport + "\\end{align*}";
        return steps
          .replace("\\overrightarrow", "\\vec")
          .replace("\\begin{aligned}", "")
          .replace("\\end{aligned}", "")
          .replace("\\llbracket", "\\lbracket")
          .replace("\\rrbracket", "\\rbracket")
          .replace("\\widehat", "\\hat")
          .replace(new RegExp("(align.{1})", "g"), "aligned");
      }
      return latexExport
        .replace("\\overrightarrow", "\\vec")
        .replace("\\llbracket", "\\lbracket")
        .replace("\\rrbracket", "\\rbracket")
        .replace("\\widehat", "\\hat")
        .replace(new RegExp("(align.{1})", "g"), "aligned");
    }

    const resultElement = this.refs.result;
    const convertElement = this.refs.convert;
    this.refs.editor.addEventListener("exported", e => {
      const exports = e.detail.exports;
      if (exports && exports["application/x-latex"]) {
        convertElement.disabled = false;
        katex.render(cleanLatex(exports["application/x-latex"]), resultElement);
        resultElement.innerHTML =
          "<span>" + exports["application/x-latex"] + "</span>";
        this.props.state.updateFormulaCode(
          latex2js(exports["application/x-latex"])
        );
      } else if (exports && exports["application/mathml+xml"]) {
        convertElement.disabled = false;
        resultElement.innerText = exports["application/mathml+xml"];
      } else if (exports && exports["application/mathofficeXML"]) {
        convertElement.disabled = false;
        resultElement.innerText = exports["application/mathofficeXML"];
      } else {
        convertElement.disabled = true;
        resultElement.innerHTML = "";
      }
    });
  }

  handleConvert(e) {
    this.editor.convert();
  }
  handleUndo() {
    this.editor.undo();
  }
  handleRedo() {
    this.editor.redo();
  }
  render() {
    return (
      <div
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        ref="handWritingFormulaArea"
        id="handWritingFormulaArea"
      >
        <div ref="result" id="result" />
        <button
          className="handWritingFormulaAreaButton"
          id="convertButton"
          ref="convert"
          onClick={this.handleConvert}
        >
          convert
        </button>
        <button
          className="handWritingFormulaAreaButton"
          id="undoButton"
          ref="undo"
          onClick={this.handleUndo}
        >
          undo
        </button>
        <button
          className="handWritingFormulaAreaButton"
          id="redoButton"
          ref="redo"
          onClick={this.handleRedo}
        >
          redo
        </button>
        <div id="handWritingFormulaEditor" ref="editor" />
      </div>
    );
  }
}
