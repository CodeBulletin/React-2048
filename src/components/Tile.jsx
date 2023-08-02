import React from 'react'
import "../componentscss/Tile.css"
import { useState, useEffect } from 'react';

const colors = {
    0:    '#00000000',
    2:    '#FFDAB9',
    4:    '#FFC0CB',
    8:    '#ADD8E6',
    16:   '#87CEEB',
    32:   '#98FB98',
    64:   '#90EE90',
    128:  '#E6E6FA',
    256:  '#D8BFD8',
    512:  '#FFFF99',
    1024: '#FFD700',
    2048: '#FFA500', 
}

const Tile = (props) => {

    let col = colors[props.value];
    

    return (
        <div className={'Tile'}>
            <span style={
                {
                    backgroundColor: col
                }
            }>{props.value !== 0 ? props.value : ""}</span>
        </div>
    )
}

export default Tile