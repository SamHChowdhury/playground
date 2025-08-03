"use client";

import { createTodo } from "@/api/todos";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending}>
            {pending ? "Creating TODO..." : "Create TODO"}
        </button>
    );
}

export default function CreateTodo({onTodoCreated}: { onTodoCreated: (createdTodo: {
    id: string;
    title: string;
    completed: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}) => void }) {
    const handleCreateTodo = async (formData: FormData) => {
        const createdTodo = await createTodo(formData);
        if (createdTodo) onTodoCreated(createdTodo);
        return;
    };

    return (
        <form action={handleCreateTodo}>
            <fieldset>
                <label>
                    New TODO
                    <input
                        required
                        type="text"
                        name="title"
                        placeholder="Enter a new TODO"
                    />
                </label>
            </fieldset>
            <SubmitButton />
        </form>
    );
}