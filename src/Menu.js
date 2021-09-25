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
    let modulativityRight, eRight, modulativityLeft, eLeft = false
    let asociativity = false
    let isCyclicRight, isCyclicLeft = false
    let generatorRight, generatorLeft
    let transposedTable

    if (tableIsComplete) {


        transposedTable = transpose(table)

        inversesRight = areInverses(table)
        inversesLeft = areInverses(transposedTable)
        conmutativity = isCommutative(table)
        eLeft = findE(table)
        eRight = findE(transposedTable)
        modulativityRight = eLeft !== false
        modulativityLeft = eRight !== false
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
                type="radio">
            </input>
                <span>Modulatividad
                    {((!modulativityRight || !modulativityLeft) && (modulativityLeft || modulativityLeft)) &&
                        <span>
                            {modulativityLeft ? ` (←{${eLeft}})` : ` (→{${eRight}})`}
                        </span>
                    }
                </span>
            </p>

            <p><input checked={inversesRight || inversesLeft}
                readOnly
                type="radio"></input>
                <span>Inversos
                    {((!inversesRight || !inversesLeft) && (inversesRight || inversesLeft)) &&
                        <span>
                            {inversesRight ? " →" : " →"}
                        </span>
                    }
                </span>
            </p>
            {/*depurar tabla*/}
            <h2>Otras propiedades</h2>
            <p><input checked={isCyclicRight || isCyclicLeft}
                readOnly
                type="radio"></input>
                <span>Cíclico
                    {(!isCyclicLeft || !isCyclicRight) &&
                        <span>
                            {generatorRight ? `${generatorRight}` : `${generatorLeft}`}
                        </span>
                    }</span>
            </p>
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