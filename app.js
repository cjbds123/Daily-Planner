import Lodash from 'lodash'
import wait from 'waait';
import { format } from 'date-fns'
import { makeTask } from "./elements";


const addNewTaskButton = document.querySelector('.addButton');
const addTaskModal = document.querySelector('.addTask')
const cancelTaskModal = document.querySelector('.cancelAddTask')
const modalContainer = document.querySelector('.modalContainer')
const content = document.querySelector('div.content')
const dateHeader = document.querySelector('div.date')


const today = new Date();


let taskList = [];

function setDateHeader(date = today) {
    dateHeader.textContent = `${format(date, 'EEEE')}, ${format(date, 'MMMM')} ${format(date, 'do')}, ${format(date, 'yyyy')}`;
}

function addNewTask() {
    const task = Object.fromEntries([...modalContainer.querySelectorAll('input')].map((input) => [input.name, input.value]))
    if (!task.title)
        return

    const id = (Math.max(taskList.map(task => task.id)) + 1).toString();
    Object.assign(task, { id })
    taskList.push(task);
    document.dispatchEvent(new Event('tasksUpdated'))
    closeModal()
}

function displayTasks() {
    content.innerHTML = taskList.map(task => makeTask(task)).join('');
}

function openModal() {
    modalContainer.classList.add('open')
}

async function closeModal() {
    modalContainer.classList.remove('open')
    await wait(200)
    modalContainer.querySelectorAll('input').forEach(input => { input.value = '' })
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(taskList))
}

function loadFromLocalStorage() {
    const localTasks = JSON.parse(localStorage.getItem('tasks'));
    if (!localTasks.length)
        return
    taskList = localTasks;

}

async function completeTask(e) {
    const clickedElement = e.target.parentElement.parentElement
    if (!clickedElement.classList.contains('element'))
        return
    clickedElement.classList.add('remove')
    await wait(500)
    console.log(clickedElement.id)
    Lodash.remove(taskList, task => task.id === clickedElement.id)
    document.dispatchEvent(new Event('tasksUpdated'))
}

addNewTaskButton.addEventListener('click', openModal)
cancelTaskModal.addEventListener('click', closeModal)
addTaskModal.addEventListener('click', addNewTask)
document.addEventListener('tasksUpdated', displayTasks)
document.addEventListener('tasksUpdated', updateLocalStorage)
content.addEventListener('click', completeTask)


setDateHeader()
loadFromLocalStorage()
displayTasks()