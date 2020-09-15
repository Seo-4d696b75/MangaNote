import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import Button from 'react-bootstrap/Button';
import ModalDialog from 'react-bootstrap/ModalDialog'
//import Dialog from '@material-ui/core/Dialog';

function Menu(props) {
    
    const handleCommentChange = () =>{
        props.commentChange();
        props.menuChange();
    }

    const handleUserChange = () =>{
        props.userChange();
        props.menuChange();
    }
    

    return(
        
        
        <Modal
          show={true}
          onHide={props.menuChange}
          backdrop="static"
          keyboard={true}
          centered = {true}
        >
            <ModalHeader closeButton></ModalHeader>
            <Button variant="secondary" onClick={handleCommentChange}>
            コメント表示切り替え
            </Button>
            <Button variant="secondary" onClick={props.menuChange}>
            ユーザー切り替え
            </Button>
        </Modal>
    
    )
}

export default Menu;