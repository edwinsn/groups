import React, { useEffect, useState } from 'react'
import { setTable, resetTable } from './features/table'
import './assets/grid.css'
import { useDispatch } from 'react-redux'

let invalidEntry = false
let refs = []


//change format and order (group its effects)

export default function Structure() {

    let [order, setOrder] = useState(4)
    let [format, setFormat] = useState("String")
    let squares = []
    refs = []

    const dispatch = useDispatch()

    useEffect(() => {


        dispatch(resetTable())

        refs.forEach((input, position) => {

            let isNumber = !isNaN(input.current.value)

            if (input.current.value) {

                dispatch(setTable({
                    j: position % order,
                    i: ~~(position / order),
                    result: isNumber ? Number(input.current.value) : input.current.value.charCodeAt()-97,
                    order
                }))
            }
        })


    }, [order, dispatch])

    useEffect(() => {

        refs.forEach(e => {
            if (e.current.value) {
                e.current.value = format === "String" ? String.fromCharCode(Number(e.current.value) + 97) : e.current.value.charCodeAt() - 97
            }
        })

    }, [format])


    for (let i = 0; i < (order + 1) ** 2; i++) {
        if (i < order + 1) {
            squares.push(<div key={`square-t1${i}`} >{i === 0 ? "*" : (format === "String" ? String.fromCharCode(i + 96) : i - 1)}</div>)
        }
        else if (i % (order + 1) === 0) {
            squares.push(<div key={`square-t2${i / order}`} >{format === "String" ? String.fromCharCode(~~(i / (order + 1)) + 96) : (~~(i / (order + 1)) - 1)}</div>)
        }
        else {
            squares.push(input(refs, squares, order, dispatch, format))
        }
    }

    let grisStyle = {
        gridTemplateColumns: `repeat(${order + 1},8vh)`,
        gridTemplateRows: `repeat(${order + 1},8vh)`
    }

    return (
        <div id="gridand-selector-container" className="flex">

            <select id="structure-selector">
                <option>Grupo</option>
                <option>Anillo</option>
                <option>Campo</option>
            </select>

            <div id="grid-container" className="flex centered">
                <div className="flex">
                    <div id="grid"
                        style={grisStyle}>
                        {squares}
                    </div>
                    <div id="options" style={{ height: 8 * (order + 1) + "vh" }}>
                        <div>
                            <button
                                onClick={() => { setOrder(prev => prev + 1) }}
                                className="changeorder flex centered">+</button>
                            <button
                                onClick={() => { setOrder(prev => prev > 1 ? prev - 1 : 1) }}
                                id="decrease" className="changeorder flex centered">-</button>
                        </div>
                        <select id="format">
                            <option onClick={() => { setFormat("String") }}>a,b</option>
                            <option onClick={() => { setFormat("Number") }}>0,1</option>
                        </select>
                    </div>

                </div>
            </div>
        </div>
    )
}

let input = (refs, squares, order, dispatch, format) => {
    let ref = React.createRef()
    let position = refs.length
    let input =
        (<input
            key={`square-t3${squares.length}`}
            maxLength={format === "String" ? "1" : (order < 10 ? 1 : undefined)}
            ref={ref}
            onChange={(ev) => {

                let value = ev.target.value
                let numericalValue = Number(value)

                if (format === "String") {
                    numericalValue = ev.target.value.charCodeAt() - 97
                }

                if (numericalValue < order && numericalValue >= 0) {
                    dispatch(setTable({
                        j: position % order,
                        i: ~~(position / order),
                        result: numericalValue,
                        order
                    }))
                } else if (value !== '') {

                    dispatch(setTable({
                        j: position % order,
                        i: ~~(position / order),
                        result: numericalValue,
                        order
                    }))

                    ev.target.value = format === "String" ? 'a' : 0
                    invalidEntry = true
                } else {
                    invalidEntry = false
                }
            }}
            onKeyDown={(ev) => {

                switch (ev.key) {
                    case "ArrowLeft":
                        ev.preventDefault()
                        invalidEntry = false
                        refs[position - 1]?.current.focus()
                        break;
                    case "ArrowRight":
                    case "Enter":
                        ev.preventDefault()
                        invalidEntry = false
                        refs[position + 1]?.current.focus()
                        break;
                    case "ArrowDown":
                        ev.preventDefault()
                        invalidEntry = false
                        refs[position + order]?.current.focus()
                        break;
                    case "ArrowUp":
                        ev.preventDefault()
                        invalidEntry = false
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
                        if (!invalidEntry && (format === "String" || order < 10)) {
                            refs[position + 1]?.current.focus()
                        }
                        break;
                }
            }}
        />)
    refs.push(ref)
    return input
}