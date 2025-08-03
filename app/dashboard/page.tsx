import { getSession } from "@/api/auth";
import { getTodos } from "@/api/todos";
import TodoPage from "@/components/TodoPage";

export default async function Dashboard() {
    const user = await getSession();
    const todos = await getTodos();

    if (!user) {
        return (
            <div>
                <h1>Access Denied</h1>
                <p>You must be signed in to view this page.</p>
            </div>
        );
    }   

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Below are your TODOs!</p>
            <TodoPage todos={todos} />
        </div>
    );
}