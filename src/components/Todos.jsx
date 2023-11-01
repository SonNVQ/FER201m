import { Button, Table } from "react-bootstrap";

export default function Todos({
    todos,
    getUserNameByUserId,
    onTodoStatusChange,
    onSortByTitleAscending
}) {
    return (
        <>
            <h2 className="text-center">Todos</h2>
            <div className="mb-3">
                <span className="mr-2">Sort:</span>
                <Button variant="primary" onClick={onSortByTitleAscending}>
                    Ascending by Title
                </Button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>User</th>
                        <th>Completed</th>
                        <th>Change status</th>
                    </tr>
                </thead>
                <tbody>
                    {todos &&
                        todos.map((todo, index) => (
                            <tr key={todo.id}>
                                <td>{index + 1}</td>
                                <td>{todo?.title}</td>
                                <td>{getUserNameByUserId(todo.userId)}</td>
                                <td>
                                    {todo.completed ? (
                                        <span className="text-primary">
                                            Finished
                                        </span>
                                    ) : (
                                        <span className="text-danger">
                                            Unfinished
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <Button
                                        variant="success"
                                        onClick={() =>
                                            onTodoStatusChange(
                                                todo.id,
                                                !!!todo.completed
                                            )
                                        }
                                    >
                                        Change
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    );
}
