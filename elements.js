export function makeTask(task) {
    const taskHTML = `
    <div class="element" id="${task.id}">
        <div class="elementCompleted">
            <i class="material-icons">check</i>
        </div>
        <div class="elementContent">
            <div class="elementHeading">${task.title}</div>
            <div class="elementDetails">${task.details}</div>
            <div class="elementDueDate">${task.dueDate}</div>
        </div>
    </div>
  `;
    return taskHTML;
}