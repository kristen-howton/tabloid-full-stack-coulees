import { PostContext } from "../../providers/PostProvider";
import DatePicker from 'reactstrap-date-picker/lib/DatePicker';
import React, { useContext, useRef, useState, useEffect } from 'react'
import { Form, FormGroup, Input, Row, FormText, Button, Label, Badge, Modal, ModalHeader, ModalBody } from 'reactstrap'
import PostTagForm from './PostTagForm';
import { CategoryContext } from '../../providers/CategoryProvider';

const AddPostForm = () => {
    const { addPost } = useContext(PostContext)
    const { categories, getAllCategory } = useContext(CategoryContext)
    const [publishDate, set] = useState()
    const [categorySelect, setCategorySelection] = useState("");
    const [chosenTags, setChosenTags] = useState([]);

    const handleDateChange = (e) => {
        set(e.target.value)
    }

    const title = useRef()
    const imageUrl = useRef()
    const content = useRef()

    useEffect(() => {
        getAllCategory()
    }, [])

    const handleCategorySelection = (e) => {
        setCategorySelection(e.target.value)
    }
    const handleSubmit = () => {
        const Post = {
            title: title.current.value,
            imageLocation: imageUrl.current.value,
            content: content.current.value,
            publishDateTime: publishDate,
            categoryId: +categorySelect,
            isApproved: true
        }
        if (categorySelect === "") {
            window.alert("You must choose category id")
            return
        }
        if (!Post.title.length) {
            window.alert("Post must have a title.")
            return
        }
        if (!Post.content.length) {
            window.alert("Post must have content.")
            return
        }
        addPost(Post, chosenTags)
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="smallContainer border rounded p-4">
                <Form>
                    <h4>Create a new Post</h4>
                    <Row>
                        <FormGroup className='row col mr-1'>
                            <Input type='text' name='Title' id='postTitle' innerRef={title}
                                placeholder='Title' className='form-control form-control-sm'></Input>
                        </FormGroup>
                        <FormGroup className='row col'>
                            <Input type='text' name='ImageUrl' id='postImageUrl' innerRef={imageUrl}
                                placeholder='Image URL' className='form-control form-control-sm'></Input>
                        </FormGroup>
                    </Row>
                    <FormGroup className='row'>
                        <Input type='textarea' name='Content' id='postContent' innerRef={content}
                            placeholder='Add your content...' className='form-control form-control-sm' rows="10"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for='PublishDate'>Publish Date</Label>
                        <Input type='date' name='PublishDate' id='publishDate' onChange={handleDateChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='categoryId'>Category</Label>
                        <Input type="select" onChange={handleCategorySelection} id="categoryId">
                            <option value="">Please select...</option>
                            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <PostTagForm chosenTags={chosenTags} setChosenTags={setChosenTags} />
                    </FormGroup>
                    <div className='d-flex flex-row-reverse'>
                        <Button color="primary" size='mb-1' onClick={handleSubmit}>Save</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}


export default AddPostForm