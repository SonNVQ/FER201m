import { useEffect, useState } from "react";
import Users from "./Users";
import { Col, Row } from "react-bootstrap";
import CompletedFilter from "./CompletedFilter";
import Todos from "./Todos";

export default function Index() {
    const [initTodos, setInitTodos] = useState([]); //cache initial todo list for filtering
    const [users, setUsers] = useState([]);
    const [todos, setTodos] = useState([]);
    const [updateNeeded, setUpdateNeeded] = useState(false); //use for updating completed status
    const [userIdList, setUserIdList] = useState([]); //userIdList for user filtering
    const [completed, setCompleted] = useState(0); //-1: unfinished, 1: completed, 0: all

    useEffect(() => {
        fetch("http://localhost:9999/user")
            .then((response) => response.json())
            .then((data) => setUsers(data));

        fetch("http://localhost:9999/todo")
            .then((response) => response.json())
            .then((data) => {
                setTodos(data);
                setInitTodos(data);
            });
    }, [updateNeeded]);

    //Multi-filter handler
    function filterHandler() {
        //Filter users
        let newTodos = [...initTodos];
        if (userIdList.length > 0) {
            newTodos = initTodos.filter((todo) =>
                userIdList.includes(todo.userId) //Check if userId of the todo is included in userIdList
            );
        }

        //Filter completed
        if (completed === 1) {
            newTodos = newTodos.filter((todo) => todo.completed);
        } else if (completed === -1) {
            newTodos = newTodos.filter((todo) => !todo.completed);
        }

        setTodos(newTodos);
    }

    useEffect(() => {
        filterHandler();
    }, [userIdList, completed, initTodos]);

    //User list checkbox change handler
    function onUserListChangeHandler(event) {
        let newUserIdList = [...userIdList];

        //Changed userId
        let userId = Number(event.target.value);

        //Check if userId is already exists
        if (userIdList.find((id) => id === userId)) {
            //If had then remove from list
            newUserIdList = userIdList.filter((id) => id !== userId);
        } else {
            //If not then add to list
            newUserIdList.push(userId);
        }

        setUserIdList(newUserIdList);
    }

    //Completed filter radio box change handler
    function onCompletedChangeHandler(event) {
        let status = Number(event.target.value);
        setCompleted(status);
    }

    function getUserNameByUserId(userId) {
        if (!users || !userId) return undefined;
        return users.find((user) => user.id === userId)?.name;
    }

    //Completed status change handler
    function onTodoStatusChangeHandler(id, status) {
        console.log(id, status);
        fetch(`http://localhost:9999/todo/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                completed: status
            })
        })
            .then((response) => console.log(response))
            .then(() => setUpdateNeeded(!updateNeeded));
    }

    //Sort by title ascending handler
    function onSortByTitleAscendingHandler() {
        let newTodo = [...todos];
        newTodo.sort((a, b) => a.title.localeCompare(b.title));
        setTodos(newTodo);
    }

    return (
        <>
            <Row className="mt-1">
                <Col md={9}>
                    <Todos
                        getUserNameByUserId={getUserNameByUserId}
                        onTodoStatusChange={onTodoStatusChangeHandler}
                        onSortByTitleAscending={onSortByTitleAscendingHandler}
                        todos={todos}
                    />
                </Col>
                <Col md={3}>
                    <Users
                        users={users}
                        onUserListChange={onUserListChangeHandler}
                    />
                    <CompletedFilter
                        className="mt-3"
                        onCompleteChange={onCompletedChangeHandler}
                    />
                </Col>
            </Row>
        </>
    );
}
