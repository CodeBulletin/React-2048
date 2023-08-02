import React from 'react'
import Tile from './Tile'
import "../componentscss/Row.css"

const Row = (props) => {

    return (
        <div className="Row">
        {
            props.row.map((value, i) => {
                return (
                    <Tile value={value} key={`C${props.idx}${i}`}/>
                )
            })
        }
        </div>
    )
}

export default Row