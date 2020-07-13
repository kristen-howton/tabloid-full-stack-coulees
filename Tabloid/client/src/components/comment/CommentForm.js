import React, { useContext, useRef } from "react";
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardHeader } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";


const CommentForm = ({ toggle }) => {

    const { getAllComments, addComment } = useContext(CommentContext);

    const subject = useRef();
    const content = useRef();

    const submitForm = (e) => {
        e.preventDefault();
        addComment({ subject: subject.current.value })
            .then(getAllComments)
            .then(toggle)
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="postTitle">Subject</Label>
                <Input type="text" name="commentSubject" id="commentSubject" innerRef={subject} placeholder="" />
            </FormGroup>

            <FormGroup>
                <Label for="postTitle">Content</Label>
                <Input type="text" name="commentComment" id="commentComment" innerRef={content} placeholder="" />
            </FormGroup>

            <FormGroup className="text-right">
                <Button
                    type="button"
                    color="secondary"
                    onClick={toggle}
                >Cancel</Button>
                <Button
                    type="submit"
                    color="primary"
                    className="ml-2"
                >Save</Button>
            </FormGroup>
        </Form>
    )

}

export default CommentForm;