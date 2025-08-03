"use client";

import CreateTodo from "@/components/CreateTodo";
import { useState } from "react";
import { completeTodo } from "@/api/todos";

interface Todo {
    id: string;
    title: string;
    completed: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export default function TodoPage({todos}: { todos: Array<Todo> }) {
    const [todoList, setTodoList] = useState(todos)
    const onCompleted = async (todoId: string) => {
        const completedTodo = await completeTodo(todoId);
        console.log("Completed Todo:", completedTodo);
        if (completedTodo) {
            setTodoList(todoList.map(todo => 
                todo.id === todoId ? { ...todo, completed: true } : todo
            ));
        }
        return;
    };

    return (
        <>
            <article className="max-w-[800px] m-auto">
                <CreateTodo onTodoCreated={(todo) => { setTodoList([todo, ...todoList]) }} />
            </article>
            <div className="m-auto max-w-[800px]">
                {todoList.map(todo => (
                    <li key={todo.id} style={{
                        textDecoration: todo.completed ? "line-through" : "none",
                        color: todo.completed ? "gray" : "black",
                    }} className="flex gap-3">
                        {todo.title}
                        {!todo.completed && <a href="#" onClick={async () => onCompleted(todo.id)}>x</a>}
                    </li>
                ))}
            </div>
        </>
    );
}