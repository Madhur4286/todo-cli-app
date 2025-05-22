import { loadTasks, saveTasks } from "./taskUtils.js";


const command = process.argv[2]

const args = process.argv.slice(3)

if (command === 'add') {
    const tasks = loadTasks()
    const taskText = args.join(' ')
    tasks.push({ taskDesc: taskText, completed: false })
    saveTasks(tasks)
    console.log(`✅ Task added: "${taskText}"`);
}

else if (command === "list") {
    const tasks = loadTasks()
    if (tasks.length === 0) {
        console.log('📭 No tasks found.')
    } else {
        console.log('📋 Your Tasks:')
        tasks.forEach((task, index) => {
            const status = task.completed ? '✅' : '❌'
            console.log(`${index + 1}. ${task.taskDesc} [${status}]`)
        });
    }
}

else if (command === "complete" || command === "done") {
    const index = parseInt(args[0]) - 1
    const tasks = loadTasks()

    if (tasks[index]) {
        tasks[index].completed = true
        saveTasks(tasks)
        console.log(`✔️ Marked as completed: "${tasks[index].taskDesc}"`)
    } else {
        console.log('⚠️ Task not found.')
    }
}

else if (command === 'delete' || command === 'remove') {
    const index = parseInt(args[0]) - 1
    const tasks = loadTasks()

    if (tasks[index]) {
        const removed = tasks.splice(index, 1)
        saveTasks(tasks)
        console.log(`🗑️ Deleted task: "${removed[0].taskDesc}"`)
    } else {
        console.log('⚠️ Task not found.')
    }

}

else {
    console.log(`
    ❗Invalid Command ❗ 
❓ Available commands:
  node index.js add "Your task here"
  node index.js list
  node index.js complete <task number>
  node index.js delete <task number>
  `);
}