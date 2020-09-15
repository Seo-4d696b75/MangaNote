import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


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
        //console.log(eventKey);
        props.userChange(eventKey);
        //console.log(props.selectedUser);
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
        <DropdownItem eventKey={1}>1</DropdownItem>
        <DropdownItem eventKey={2}>2</DropdownItem>
        <DropdownItem eventKey={3}>3</DropdownItem>
        </DropdownButton>
        
        </ButtonGroup>
    )
}

export default Menu;