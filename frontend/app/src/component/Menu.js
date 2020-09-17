import React from "react";
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';

function Menu(props) {
    
    const style = {
        position: "absolute",
        top: `85%`,
        left: `75%`,
        
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
    
    const userDropdown = props.users.map((user)=>{
            return(
                <DropdownItem eventKey={user.user_id}>{user.user_id}</DropdownItem>
            )
        }
    )

    return(
        <div style = {style}>

        <Button 
        variant="light" 
        onClick={handleCommentChange}　
        style = {{width:"5rem",height:"5rem"}}
        className ="rounded-circle p-0">
        {props.isCommentAppear
        ? <>💬<p style={{fontsize:"1rem"}}>非表示</p></>
        : <>💬<p style={{fontsize:"1rem"}}>表示</p></>
        }
        </Button>

        <DropdownButton
          key="down"
          title={props.selectedUser}
          variant="secondary"
          onSelect = {(eventKey) => handleUserChange(eventKey)}
          
        >
        {userDropdown}
        </DropdownButton>
        
        </div>
    )
}

export default Menu;