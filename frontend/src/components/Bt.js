import React  from "react";
import Button from 'react-bootstrap/Button';


function buttonClick(){
    console.log("Button is clicked");
    alert("Button is clicked");
  }

export default function Bt() {
    return   (
        <div className="mb-2">
        
        <Button  onClick={buttonClick} variant="secondary" size="lg">
         Click
        </Button>
      </div>



 
       
    ) 
    
        
    
}