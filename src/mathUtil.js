export function areInverses(M){
    
    let e = findE(M)
    return M.every(  (row)=>  row.some( element=>element===e )  )
}

export function findE(M){
    
    let e = false
    
    M.some( (row, rowIndex)=>{
        
        let isIdentity= row.every((e,i)=>{
            return e===i
            })
        if(isIdentity) e=rowIndex
        return isIdentity
    })
    
    return e
}

//let M = [[0,1,2],[1,1,0],[0,1,1]]
//console.log(areInverses(M))

//M = [[0,1,2],[1,1,0],[2,1,2]]
//console.log(areInverses(M))

export function isCommutative(M){

    for(let i=0;i<M.length;i++){
        for(let j=0;j<i;j++){
            if(M[i][j]!==M[j][i]) return false
        }
    }
    return true
}

//let M=[[1,0,1],[0,1,2],[1,2,3]]
//console.log(isCommutative(M))

export function isAssociative(M){

    let associative=true
    if(M.length!==M[0].length){
        throw (new Error("Matrix isn't square"))
    } 
        
    for (let i=0; i<M.length;i++){
        for( let j=0;j<M.length;j++){
            for (let k=0;k<M.length;k++){
                let right=M[i][M[j][k]]
                let left=M[M[i][j]][k]
                //console.log(`(${i}${j})${k},${right}`)
                //console.log(`(${i}${j})${k},${left}`)
                if(left!==right){
                    associative = false
                    
                }
            }
        }
    }
    return associative
}
    
//let Operation=[[0,1],[0,1]]
//console.log(isAssociative(Operation))


export function cyclic(M){

    //falta distingir de generador a la izquierda de a la derecha
    for (let i=0;i<M.length;i++){
        
        let results=[i]
        let mayBeGenerator=true
        
        for(let j=0; j<M.length-1&&mayBeGenerator; j++){
            
            let n_power=M[results[results.length-1]][i]
            
            if(results.includes(n_power)){
                mayBeGenerator=false
            }
            else{
                results.push(M[results[results.length-1]][i])
            }
        }
        
        if(mayBeGenerator)return i
    }
    
    return false
}

//let op=[[0,0],[0,1]]
//console.log(cyclic(op))