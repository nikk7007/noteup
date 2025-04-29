import { App } from "./App.js"

document.addEventListener('DOMContentLoaded', () => {
  const data = localStorage.getItem("data")
  if (!data) {
    App.setData({})
  } else {
    App.renderSavedData()
  }
})

document.querySelector('header .addCard input[type=button]')
  .addEventListener('click', App.createCard)


