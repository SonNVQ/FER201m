import { Form } from "react-bootstrap";

export default function CompletedFilter({ className, onCompleteChange }) {
    return (
        <div className={className}>
            <h2>Completed</h2>
            <Form>
                <Form.Check
                    type="radio"
                    name="filter"
                    value={1}
                    onChange={onCompleteChange}
                    label="Finished"
                />
                <Form.Check
                    type="radio"
                    name="filter"
                    value={-1}
                    onChange={onCompleteChange}
                    label="UnFinished"
                />
                <Form.Check
                    type="radio"
                    name="filter"
                    value={0}
                    onChange={onCompleteChange}
                    label="All"
                />
            </Form>
        </div>
    );
}
