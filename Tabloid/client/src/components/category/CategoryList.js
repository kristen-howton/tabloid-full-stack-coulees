import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Category from './Category';
import { CategoryContext } from '../../providers/CategoryProvider';
import { Button, Modal, ModalHeader, ModalBody, ListGroup } from 'reactstrap';
import { CategoryForm } from './CategoryForm';

const CategoryList = () => {
    const { categories, getAllCategory } = useContext(CategoryContext);

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const renderListItem = (category) => {
        if(category.id > 0){
            return (<div className = "container fluid categoryContainer">
                     <Category Key = {category.id} category={category} />
                    </div>)
        }
    }
    
    useEffect(() => {
        getAllCategory()       
    }, []);
    console.log('-->',categories)
    return (
        <>
            {/* <Link to={`/addCategory`}>Add New Category</Link> */}
            <Button onClick = {toggle} color = "info" size = "sm" className = "addNewCategory">Create Category</Button>
            <div>
                {
                    (categories.length) 
                    ? categories.map((category) => (
                        renderListItem(category)
                    )) 
                    : <div className="alert alert-secondary mt-1" role="alert"> No categories were found.</div>
                }
            </div>
            <Modal isOpen = {modal} toggle = {toggle} className = "modal-md">
                <ModalBody>
                    <CategoryForm toggle= {toggle} />
                </ModalBody>
            </Modal> 
        </>
    );
}

export default CategoryList