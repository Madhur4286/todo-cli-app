import {readFileSync,writeFileSync} from "fs"

export function loadTasks(){
    const data = readFileSync('tasks.json','utf-8')
    return JSON.parse(data);
}

export function saveTasks(tasks){
    writeFileSync('tasks.json',JSON.stringify(tasks,null,2))
}