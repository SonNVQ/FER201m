import { Form } from "react-bootstrap";

export default function Users({ users, onUserListChange }) {
    return (
        <>
            <h2>Users</h2>
            <Form>
                {users &&
                    users.map((user) => (
                        <Form.Check
                            key={user.id}
                            type="checkbox"
                            label={user.name}
                            value={user.id}
                            onChange={onUserListChange}
                            className="mb-2"
                        />
                    ))}
            </Form>
        </>
    );
}
