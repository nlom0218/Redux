import "./index.css"

import { createStore } from "redux"

const container = [...document.querySelectorAll(".container")]

const reducer = (state = { color: "white" }, action) => {
  switch (action.type) {
    case "RED":
      return { color: "red" }
    case "GREEN":
      return { color: "green" }
    case "BLUE":
      return { color: "blue" }
    default:
      return state
  }
}

let store = createStore(reducer)

const changeColor = (e) => {
  store.dispatch({ type: e.target.name.toUpperCase() })
  const { color } = store.getState()
  container.map((item) => item.style.backgroundColor = color)
}

function init() {
  document.querySelector(".redBtn").addEventListener("click", changeColor)
  document.querySelector(".greenBtn").addEventListener("click", changeColor)
  document.querySelector(".blueBtn").addEventListener("click", changeColor)
}

init()