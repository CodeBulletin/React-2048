import React, { useState } from 'react'
import Row from './Row';

import "../componentscss/Board.css"


const Board = (props) => {

    return (
        <div className="Board">
        {
            props.board.map((row, i) => {
                return (
                    <Row row={row} idx={i} key={`R${i}`}/>
                )
            })
        }
        </div>
    )
}

export default Board