"use server";

import db from "@/db/postgres";
import { getSession } from "./auth";

export const createTodo = async (formData: FormData) => {
    const user = await getSession();
    if (!user) {
        return;
    }
    return db.todo.create({
        data: {
            title: formData.get("title") as string,
            userId: user.id,
        }
    });
}

export const completeTodo = async (todoId: string) => {
    const user = await getSession();
    if (!user) {
        return;
    }
    return db.todo.update({
        where: { id: todoId, userId: user.id },
        data: { completed: true },
    });
}

export const getTodos = async () => {
    const user = await getSession();
    if (!user) {
        return [];
    }
    return db.todo.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
    });
}