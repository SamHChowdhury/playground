"use client";

import { createTodo } from "@/api/todos";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardTitle } from "./ui/card";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className="w-full text-xl py-4">
            {pending ? "Creating TODO..." : "Create TODO"}
        </Button>
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
        <Card className="max-w-[800px] mx-auto">
            <CardTitle className="text-2xl font-bold text-center">Create TODO</CardTitle>
            <CardContent>
                <form action={handleCreateTodo} className="flex flex-col gap-8 max-w-[650px] mx-auto my-8">
                    <fieldset>
                        <Input
                            required
                            type="text"
                            name="title"
                            placeholder="Enter a new TODO"
                        />
                    </fieldset>
                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    );
}