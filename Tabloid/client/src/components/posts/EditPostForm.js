import React, { useContext, useRef, useEffect, useState } from 'react'
import { Form, FormGroup, Input, Row, FormText, Button, Label, Spinner } from 'reactstrap'
import { PostContext } from "../../providers/PostProvider";
import { useParams } from 'react-router-dom';

//There are two ways to access this form:
//1) By the post list views; and 2) By the post details view
//The post details view passes in a showEdit function that toggles a modal. Otherwise, showEdit is ignored.
const EditPostForm = ({ showEdit }) => {
    const [ready, set] = useState(false)
    const { post, updatePost, getPost } = useContext(PostContext)
    const { id } = useParams()

    useEffect(() => {
        getPost(id).then(() => set(true))
    }, [])

    const title = useRef()
    const imageUrl = useRef()
    const content = useRef()
    const publishDate = useRef()

    const handleSubmit = () => {
        const Post = {

            title: title.current.value,
            imageLocation: imageUrl.current.value,
            content: content.current.value,
            publishDateTime: publishDate.current.value.length ? publishDate.current.value : null,
            categoryId: 1 //THIS NEEDS TO BE CHANGED ONCE THE CATEGORY REPO/PROVIDER IS CREATED
        }

        if (!Post.title.length) {
            window.alert("Post must have a title.")
            return
        }
        if (!Post.content.length) {
            window.alert("Post must have content.")
            return
        }
        //add back all of the values that the user is not allowed to change (Categories will eventually be changeable)
        Post.id = post.id
        Post.createDateTime = post.createDateTime
        Post.userProfileId = post.userProfileId
        Post.categoryId = post.categoryId
        Post.isApproved = post.isApproved
        updatePost(Post)
        if (showEdit) {
            showEdit(false)
        }
    }

    //setting default value for date
    if (ready === true) {
        return (
            <div className="container border pl-5 pr-5 mt-2 pb-1">
                <Form>
                    <FormText className='h4 text-center'>Edit Post</FormText>
                    <Row>
                        <FormGroup className='row col mr-1'>
                            <Input type='text' name='Title' id='postTitle' innerRef={title} defaultValue={post ? post.title : ''}
                                placeholder='Title' className='form-control form-control-sm'></Input>
                        </FormGroup>
                        <FormGroup className='row col'>
                            <Input type='text' name='ImageUrl' id='postImageUrl' innerRef={imageUrl} defaultValue={post ? post.imageLocation : ''}
                                placeholder='Image URL' className='form-control form-control-sm'></Input>
                        </FormGroup>
                    </Row>
                    <FormGroup className='row'>
                        <Input type='textarea' name='Content' id='postContent' innerRef={content} defaultValue={post ? post.content : ''}
                            placeholder='Add your content...' className='form-control form-control-sm'></Input>
                    </FormGroup>
                    <FormGroup className='text-center'>
                        <Label for='PublishDate'>Choose a Date to Publish Your Post</Label>
                        <Input type='text' name='PublishDate' id='publishDate' innerRef={publishDate} defaultValue={post.publishDateTime ? post.publishDateTime : ""} />
                    </FormGroup>
                    <div className='d-flex flex-row-reverse'>
                        <Button size='sm mb-1' onClick={handleSubmit}>Save</Button>
                    </div>
                </Form>
            </div>
        )
    }
    else return <Spinner />

}

export default EditPostForm