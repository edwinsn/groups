import React from 'react'
import { useSelector } from 'react-redux'
import store from './store'
import { areInverses, isCommutative, findE, isAssociative, cyclic } from './mathUtil'
import './assets/menu.css'

export default function Menu() {

    const tableIsComplete = useSelector((state) => state.table.value.isComplete)
    let table = store.getState().table.value.elements

    let inversesRight, inversesLeft = false
    let conmutativity = false
    let modulativityRight, modulativityLeft = false
    let asociativity = false
    let isCyclicRight, isCyclicLeft = false
    let generatorRight, generatorLeft
    let transposedTable

    if (tableIsComplete) {

        transposedTable = transpose(table)

        inversesRight = areInverses(table)
        inversesLeft = areInverses(transposedTable)
        conmutativity = isCommutative(table)
        modulativityRight = findE(table) !== false
        modulativityLeft = findE(transposedTable) !== false
        asociativity = isAssociative(table)
        generatorRight = cyclic(table)
        generatorLeft = cyclic(transposedTable)
        isCyclicRight = generatorRight !== false
        isCyclicLeft = generatorLeft !== false
    }

    return (
        <div id="menu">
            <h1>Grupo</h1>
            <h2>Propiedades</h2>
            <p><input checked={asociativity}
                readOnly
                type="radio"></input> Asociatividad</p>
            <p><input checked={modulativityRight || modulativityLeft}
                readOnly
                type="radio"></input>Modulatividad {modulativityRight?"a la derecha ":""}{modulativityLeft?"a la izquierda":""}</p>
            <p><input checked={inversesRight || inversesLeft}
                readOnly
                type="radio"></input>Inversos {inversesRight?"A la Derecha":""} { inversesLeft?"A la izquierda":""}</p>
                {/*depurar tabla*/}
            <h2>Otras propiedades</h2>
            <p><input checked={isCyclicRight || isCyclicLeft}
                readOnly
                type="radio"></input>Cíclico {generatorRight?`a la derecha: ${generatorRight}`:""} {generatorLeft?`a la izquierda: ${generatorLeft}`:""}</p>
            <p><input checked={conmutativity}
                readOnly
                type="radio"></input>Abeliano</p>

        </div>
    )
}

const transpose = table => {

    let trasposed = []

    for (let row = 0; row < table.length; row++) {
        for (let column = 0; column < table.length; column++) {
            trasposed[column] = trasposed[column] || []
            trasposed[column][row] = table[row][column]
        }
    }
    return trasposed;
}