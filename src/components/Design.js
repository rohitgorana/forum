import React, {useState} from 'react'
import {Button} from 'antd'

export const PopButton =  function(props) {
    var styles = {
        background: '#1cb0f6',
        borderBottom: '5px solid #1899d6',
        color: '#fff',
        borderRadius: 15, 
        fontWeight: 700, 
        fontSize: 16,
        marginRight: '10px'
    }
    const type = props.type || 'primary'
    switch(type){
        case 'white' : styles = Object.assign({}, styles,{
            background : '#fffffd',
            borderBottom: '5px solid #e5e5e5',
            color: '#afafaf'
        })
        break;

        case 'primary': 
    }

  return (
        <Button
            size='large'
            onClick={props.onClick}
            style={styles}
        >
            {props.children}
        </Button>
    
  )
}

export const TextButton = function(props){
    
    const [hovering, sethovering] = useState(false)

    const activeColor = props.activeColor || '#1cb0f6'

    return (
        <>
            <div 
                style={{margin: '0px 5px', color: hovering || props.active === true? activeColor: '#999'}} 
                onClick={props.onClick} 
                className='design-text-btn'
                onMouseOver={() => {sethovering(true)}}
                onMouseOut={() => {sethovering(false)}}
                onClick= {props.onClick? props.onClick: () =>{}}
            >
                <span>{props.children}</span>
            </div>
        </>
    )
}
