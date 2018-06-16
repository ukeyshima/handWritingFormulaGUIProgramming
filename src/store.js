import { observable, computed, action } from "mobx";

class State {
  @observable runButton = null;
  @action.bound
  updateRunButton(element) {
    this.runButton = element;
  }
  @observable stopButton = null;
  @action.bound
  updateStopButton(element) {
    this.stopButton = element;
  }
  @action.bound
  sizeChange(num, width) {
    this.renderingObject[num].width = width;
  }
  @action.bound
  scrolling(num, bool) {
    this.renderingObject[num].scrolling = bool;
  }
  @observable
  runButtonColor = {
    backgroundColor: "#eee",
    fontColor: "#e38"
  };
  @action.bound
  updateRunButtonColor(obj) {
    this.runButtonColor = obj;
  }
  @observable renderingAreaWidth = (window.innerWidth * 3) / 4;
  @action.bound
  updateRenderingAreaWidth(width) {
    this.renderingAreaWidth = width;
  }
  @observable componentAreaWidth = window.innerWidth / 4 - 30;
  @observable propertyAreaWidth = window.innerWidth / 4 - 50;
  @observable rectClick = false;
  @action.bound
  updateRectClick(bool) {
    this.rectClick = bool;
  }
  @observable circleClick = false;
  @action.bound
  updateCircleClick(bool) {
    this.circleClick = bool;
  }
  @observable rectPropertyChangeFlag = false;
  @action.bound
  updateRectPropertyChangeFlag(bool) {
    this.rectPropertyChangeFlag = bool;
  }
  @observable formulaCode = "";
  @action.bound
  updateFormulaCode(code) {
    this.formulaCode = code;
  }
  @observable
  tempRenderingObject = {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    red: 0,
    green: 0,
    blue: 0
  };
  @action.bound
  updateTempRenderingObject(key, value) {
    this.tempRenderingObject[key] = value;
  }
  @observable renderingObject = [];
  @computed
  get popRenderingObject() {
    return this.renderingObject.pop();
  }
  @action.bound
  pushRenderingObject(obj) {
    this.renderingObject.push(obj);
  }
  @observable time = 0;
  @observable requestId = 0;
  @action.bound
  updateTime(id, time) {
    this.requestId = id;
    this.time = time;
  }
  @action.bound
  cancelAnimation() {
    cancelAnimationFlame(this.requestId);
  }
  @observable handlePushRectObject = null;
  @action.bound
  updateHandlePushRectObject(func) {
    this.handlePushRectObject = func;
  }
}
export default State;
