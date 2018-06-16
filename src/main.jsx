import "./style.scss";
import React from "react";
import ReactDOM from "react-dom";
import Header from "./header.jsx";
import RunAndStop from "./runAndStop.jsx";
import Editor from "./editor.jsx";
import { Provider, inject, observer } from "mobx-react";
import State from "./store.js";

const stores = {
  state: new State()
};


class HandWritingFormulaProgramming extends React.Component {
  constructor(props) {
    super(props);
  }  
  render() {
    return (
      <Provider {...stores}>
        <React.Fragment>     
          <Header/>     
          <RunAndStop /> 
          <Editor/>                   
        </React.Fragment>
      </Provider>
    );
  }
}


ReactDOM.render(  
    <HandWritingFormulaProgramming/>,
  document.getElementById("root")
);