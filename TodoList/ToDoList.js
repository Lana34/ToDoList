const head = document.querySelector('.head')
const dateBlock = document.querySelector('.dateBlock')
const dateItem = document.querySelector('.date__item')
const dateDay = document.querySelector('.date__day')
const dateClock = document.querySelector('.date__clock')

dateItem.innerText = new Date().toLocaleDateString()

window.onload = function () {
  window.setInterval(function () {
    let now = new Date();
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const days = now.getDay()
    dateDay.innerText = dayOfWeek[days]
    dateClock.innerText = now.toLocaleTimeString()
  }, 0)
}


const BtnAdd = document.querySelector('.btn__add')
const inputAdd = document.querySelector('.input__add')
const todoWrap = document.querySelector('.todo__wrap')


let tasks

const localStr = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))


function Task(description) {
  this.description = description
  this.completed = false
}


function fillTodoList() {
  todoWrap.innerHTML = ""
  tasks.forEach((el, index) => {
    const dscr = document.createElement('p')
    dscr.classList.add('description')
    dscr.innerText = el.description

    let todoItem = document.createElement('div')
    todoItem.classList.add('todo__item')

    const complete = document.createElement('input')
    complete.setAttribute('type', 'checkbox')
    complete.classList.add('task__complete')

    if (el.completed) {
      complete.checked = 1 
       todoItem.classList.add('checked')
    } else {
      complete.checked = 0 
      todoItem.classList.remove('checked')
    }

    complete.addEventListener('click', () => {
      taskComplete(index)
    })

    const delTask = document.createElement('button')
    delTask.classList.add('task__delete')
    delTask.innerText = 'Delete'

    delTask.addEventListener('click', () => {
      deleteTask(index)
    })

    todoItem.append(complete)
    todoItem.append(dscr)
    todoItem.append(delTask)
    todoWrap.append(todoItem)
  })
}

fillTodoList()


BtnAdd.addEventListener('click', () => {
  tasks.push(new Task(inputAdd.value))
  localStr()
  fillTodoList()
  inputAdd.value = ''
  getTotal()
  getInProgress()
})


let todoItemEl = []
todoItemEl = document.querySelectorAll('.todo__item')


const taskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed
  if (tasks[index].completed) {
    todoItemEl[index].classList.add('checked')
  }
   else {
    todoItemEl[index].classList.remove('checked')
  }
  localStr()
  fillTodoList()
  getComplete()
  getInProgress()
}


const deleteTask = (index) => {
  // setTimeout(() => {
    tasks.splice(index, 1)
    localStr()
    fillTodoList()
  // }, 500)
  getTotal()
  getComplete()
  getInProgress()
}


const deleteLastBtn = document.querySelector('.del__last')
deleteLastBtn.addEventListener('click', () => {
  deleteLast()
})


function deleteLast() {
  setTimeout(() => {
    tasks.pop()
  }, 500)
  localStr()
  fillTodoList()
  getTotal()
  getComplete()
  getInProgress()
}


const deleteAllBtn = document.querySelector('.del__all')
deleteAllBtn.addEventListener('click', () => {
  deleteAll()
})


function deleteAll() {
  setTimeout(() => {
    tasks.length = 0
    localStr()
  fillTodoList()
  }, 500)
  getTotal()
  getComplete()
  getInProgress()
}


const total = document.querySelector('.total__amount')


function getTotal() {
  total.innerText = 'Total:' + ' ' + `${tasks.length}`
  fillTodoList()
  localStr()
}
getTotal()


const complAmount = document.querySelector('.compl__amount')


function getComplete() {
  const complArr = tasks.filter(function (task) {
    return task.completed == true
  })
  complAmount.innerText = 'Completed:' + ' ' + `${complArr.length}`
}

getComplete()


const inProgress = document.querySelector('.progress__amount')

function getInProgress() {
  const inProgressArr = tasks.filter(function (task) {
    return task.completed != true
  })

  inProgress.innerText = 'In progress:' + ' ' + `${inProgressArr.length}`
}
getInProgress()


const search = document.querySelector('.search__item')
let searchArr

search.addEventListener('input', (event) => {
  searchArr = tasks.filter(task => {
    return task.description.includes(event.target.value)
  })

  if (searchArr.length) {
    todoWrap.innerHTML = ''
    searchArr.forEach((el, index) => {
      const dscr = document.createElement('p')
      dscr.classList.add('description')
      dscr.innerText = el.description

      let todoItem = document.createElement('div')
      todoItem.classList.add('todo__item')

      if (el.completed) {
        todoItem.classList.add('checked')
      }

      const complete = document.createElement('input')
      complete.setAttribute('type', 'checkbox')
      complete.classList.add('task__complete')

      if (el.completed) {
        complete.checked = 1
      } else {
        complete.checked = 0
      }

      complete.addEventListener('click', () => {
        searchComplete(index)
        getComplete()
        getInProgress()
      })

      const delTask = document.createElement('button')
      delTask.classList.add('task__delete')
      delTask.innerText = 'Delete'

      todoItem.append(complete)
      todoItem.append(dscr)
      todoItem.append(delTask)
      todoWrap.append(todoItem)
    })
  }
})


const searchComplete = index => {
  searchArr[index].completed = !searchArr[index].completed
  if (searchArr[index].completed) {
    todoItemEl[index].classList.add('checked')
  } else {
    todoItemEl[index].classList.remove('cheked')
  }
  fillTodoList()
  localStr()
}


const showComplete = document.querySelector('.show__complete')
let showArrComplete


showComplete.addEventListener('click', () => {
  showArrComplete = tasks.filter(function (task) {
    return task.completed == true
  })
  if (showArrComplete.length) {
    todoWrap.innerHTML = ''
    showArrComplete.forEach((el, index) => {
      const dscr = document.createElement('p')
      dscr.classList.add('description')
      dscr.innerText = el.description

      let todoItem = document.createElement('div')
      todoItem.classList.add('todo__item')

      if (el.completed) {
        todoItem.classList.add('checked')
      }

      const complete = document.createElement('input')
      complete.setAttribute('type', 'checkbox')
      complete.classList.add('task__complete')

      if (el.completed) {
        complete.checked = 1
      } else {
        complete.checked = 0
      }

      complete.addEventListener('click', () => {
        showhTaskComplete(index)
        getComplete()
        getInProgress()
      })

      const delTask = document.createElement('button')
      delTask.classList.add('task__delete')
      delTask.innerText = 'Delete'

      todoItem.append(complete)
      todoItem.append(dscr)
      todoItem.append(delTask)
      todoWrap.append(todoItem)
    })
  }
})


const showhTaskComplete = index => {
  showArrComplete[index].completed = !showArrComplete[index].completed
  if (showArrComplete[index].completed) {
    todoItemEl[index].classList.add('checked')
  } else {
    todoItemEl[index].classList.remove('cheked')
  }
  fillTodoList()
  localStr()
}


const showAll = document.querySelector('.show__all')

showAll.addEventListener('click', () => {
  fillTodoList()
  localStr()
})