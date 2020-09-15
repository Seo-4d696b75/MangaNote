import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import Dialog from '@material-ui/core/Dialog';

function Menu(props) {
    
    const style = {
        color: "red",
        position: "absolute",
        top: `95%`,
        left: `30%`,
        
      };
    
    const handleCommentChange = () =>{
        props.commentChange();
        props.menuChange();
    }

    const handleUserChange = (eventKey) =>{
        console.log(eventKey);
        props.userChange(eventKey);
        props.menuChange();
    }
    

    return(
        
        <ButtonGroup
        style = {style}
        >
        <Button variant="secondary" onClick={handleCommentChange}>
        コメント表示切り替え
        </Button>

        <DropdownButton
        key="down"
        title={props.selectedUser}
        variant="secondary"
        onSelect = {(eventKey) => handleUserChange(eventKey)}
        >
        <DropdownItem eventKey="1">user_id:1</DropdownItem>
        <DropdownItem eventKey="2">user_id:2</DropdownItem>
        <DropdownItem eventKey="3">user_id:3</DropdownItem>
        </DropdownButton>
        
        </ButtonGroup>
    )
}

export default Menu;