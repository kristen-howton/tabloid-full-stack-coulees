import React, { useContext, useEffect } from "react";
import { Button, Form } from 'reactstrap';
import { CommentContext } from "../../providers/CommentProvider";

const CommentDeleteModal = ({ toggle, comment }) => {

    const { getAllComments, deleteComment } = useContext(CommentContext);

    const submitForm = (e) => {
        e.preventDefault();
        deleteComment(comment.id)
            .then(getAllComments)
            .then(toggle)
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <>
            <Form onSubmit={submitForm}>
                <div class="lead mb-2">Are you sure you wish to delete this comment?</div>
                <div className="text-right">
                    <Button
                        type="button"
                        color="secondary"
                        onClick={toggle}
                    >Cancel</Button>
                    <Button
                        type="submit"
                        color="danger"
                        className="ml-2"
                    >Delete</Button>
                </div>
            </Form>
        </>
    )
}

export default CommentDeleteModal;