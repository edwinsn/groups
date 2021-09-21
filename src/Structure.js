import React, { useState } from 'react'
import { setTable } from './features/table'
import './assets/grid.css'
import { useDispatch } from 'react-redux'

export default function Structure() {

    let [order, setOrder] = useState(4)
    let squares = []
    let refs = []
    const dispatch = useDispatch()

    for (let i = 0; i < (order + 1) ** 2; i++) {
        if (i < order + 1) {
            squares.push(<div key={`square-t1${i}`} >{i === 0 ? "*" : String.fromCharCode(i + 96)}</div>)
        }
        else if (i % (order + 1) === 0) {
            squares.push(<div key={`square-t2${i / order}`} >{String.fromCharCode(~~(i / order) + 96)}{ }</div>)
        }
        else {
            squares.push(input(refs, squares, order, dispatch))
        }
    }

    let grisStyle = {
        gridTemplateColumns: `repeat(${order + 1},8vh)`,
        gridTemplateRows: `repeat(${order + 1},8vh)`
    }

    return (
        <div id="gridContainer"
            className="centered-column"
        >
            <div className="flex">
                <select id="structure-selector">
                    <option>Grupo</option>
                    <option>Anillo</option>
                    <option>Campo</option>
                </select>
                <div id="grid"
                    style={grisStyle}>
                    {squares}
                </div>
                <div>
                    <button
                    onClick={()=>{setOrder(prev=>prev+1)}}
                    className="changeorder flex centered-column">+</button>
                    <button
                    onClick={()=>{setOrder(prev=>prev>1?prev-1:1)}}
                    id="decrease" className="changeorder flex centered-column">-</button>
                </div>
            </div>
        </div>
    )
}

let input = (refs, squares, order, dispatch) => {
    let ref = React.createRef()
    let position = refs.length
    let input =
        (<input
            key={`square-t3${squares.length}`}
            maxLength="1"
            ref={ref}
            onChange={(ev) => {
                dispatch(setTable({
                    j: position % order,
                    i: ~~(position / order),
                    result: ev.target.value,
                    order
                }))
            }}
            onKeyDown={(ev) => {
                switch (ev.key) {
                    case "ArrowLeft":
                        ev.preventDefault()
                        refs[position - 1]?.current.focus()
                        break;
                    case "ArrowRight":
                        ev.preventDefault()
                        refs[position + 1]?.current.focus()
                        break;
                    case "ArrowDown":
                        ev.preventDefault()
                        refs[position + order]?.current.focus()
                        break;
                    case "ArrowUp":
                        ev.preventDefault()
                        refs[position - order]?.current.focus()
                        break;
                    default:
                        break;
                }
            }}
            onKeyUp={(ev) => {
                switch (ev.key) {
                    case "Delete":
                    case "Backspace":
                    case "ArrowLeft":
                    case "ArrowRight":
                    case "ArrowDown":
                    case "ArrowUp":
                        break;
                    default:
                        refs[position + 1]?.current.focus()
                        break;
                }
            }}
        />)
    refs.push(ref)
    return input
}