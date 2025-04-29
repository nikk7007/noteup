
export class App {
  static get getData() {
    return JSON.parse(localStorage.getItem("data"))
  }

  static setData(data) {
    localStorage.setItem('data', JSON.stringify(data))
  }

  static removeData(title) {
    const data = App.getData
    delete data[title]
    App.setData(data)
  }

  static renderSavedData() {
    const data = App.getData
    Object.keys(data).forEach(title => {
      App.renderCard(title, data)
    })
  }

  static update() {
    const main = document.querySelector('main')
    const a = main.querySelectorAll("main > *")
    a.forEach(e => {
      main.removeChild(e)
    })
    App.renderSavedData()
  }

  static renderTask(nameTask, tasksContainer, value = false) {
    const id = nameTask.replaceAll(' ', '_')
    nameTask = nameTask.replaceAll('_', ' ')

    const newTask = document.createElement('div')
    newTask.classList.add('task')

    const input = document.createElement('input')
    input.type = 'checkbox'
    input.name = id
    input.id = id
    input.checked = value
    input.addEventListener('change', App.listeningChecks)

    const label = document.createElement('label')
    label.textContent = nameTask
    label.setAttribute('for', id)
    newTask.append(input, label)


    tasksContainer.append(newTask)
  }

  static renderCard(title, savedData = {}) {
    const sec = document.createElement('section')
    sec.classList.add('card')
    const h2 = document.createElement('h2')
    h2.textContent = title;
    const del = document.createElement('input')
    del.type = 'button'
    del.value = 'x'
    del.addEventListener('click', App.removeCard)
    const tasks = document.createElement('div')
    tasks.classList.add('tasks')

    if (savedData[title] !== null && savedData[title] !== undefined) {
      Object.keys(savedData[title]).forEach(t => {
        App.renderTask(t, tasks, savedData[title][t])
      })
    }

    const addTask = document.createElement('div')
    addTask.classList.add('addTask')
    const text = document.createElement('input')
    text.type = 'text'
    text.placeholder = 'Adcionar nova tarefa'
    const btn = document.createElement('input')
    btn.type = 'button'
    btn.value = '+'
    btn.addEventListener('click', ev => {
      if (text.value !== '') {
        App.createTask(text.value, tasks)
        text.value = ''
      }
    })

    addTask.append(text, btn)
    sec.append(h2, del, tasks, addTask)
    document.querySelector('main').append(sec)

  }


  static createCard(ev) {
    const title = ev.target.parentElement.querySelector("input[type=text]");
    if (title.value !== '') {
      App.renderCard(title.value)

      // salvando no local storage
      const data = App.getData
      data[title.value] = {}
      App.setData(data)
      title.value = ''
    }
  }

  static createTask(nameTask, tasksContainer) {
    App.renderTask(nameTask, tasksContainer)

    // salvando no local storage
    const id = nameTask.replaceAll(' ', '_')
    const curCard = tasksContainer.parentElement.querySelector('h2').textContent

    const data = App.getData
    data[curCard][id] = false
    App.setData(data)
  }


  static listeningChecks(ev) {
    const card = ev.target.parentElement.parentElement.parentElement.querySelector('h2').textContent
    const task = ev.target.id

    const data = App.getData
    data[card][task] = ev.target.checked
    App.setData(data)

  }

  static removeCard(ev) {
    const card = ev.target.parentElement.querySelector('h2').textContent
    App.removeData(card)
    App.update()
  }

}