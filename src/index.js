import "./index.css"
import "./web"

import { createStore } from "redux"

const reducer = (state = { color: "white" }, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { color: action.color }
    default:
      return state
  }
}

const store = createStore(reducer)

const red = () => {
  const { color } = store.getState();
  document.getElementById("red").innerHTML = `
    <div class="container" style="background-color:${color}">
      <h1>RED</h1>
      <input type="button" value="change" class="redBtn">
    </div>
    `
  document.querySelector(".redBtn").addEventListener("click", () => {
    store.dispatch({ type: "CHANGE_COLOR", color: "red" })
  })
}
store.subscribe(red)

const green = () => {
  const { color } = store.getState();
  document.getElementById("green").innerHTML = `
    <div class="container" style="background-color:${color}">
      <h1>GREEN</h1>
      <input type="button" value="change" class="greenBtn">
    </div>
    `
  document.querySelector(".greenBtn").addEventListener("click", () => {
    store.dispatch({ type: "CHANGE_COLOR", color: "green" })
  })
}
store.subscribe(green)

const blue = () => {
  const { color } = store.getState();
  document.getElementById("blue").innerHTML = `
    <div class="container" style="background-color:${color}">
      <h1>BLUE</h1>
      <input type="button" value="change" class="blueBtn">
    </div>
    `
  document.querySelector(".blueBtn").addEventListener("click", () => {
    store.dispatch({ type: "CHANGE_COLOR", color: "blue" })
  })
}
store.subscribe(blue)

function init() {
  red()
  green()
  blue()
}

init()