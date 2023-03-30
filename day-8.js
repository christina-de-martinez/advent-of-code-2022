const pre = document.getElementsByTagName("pre");
const realInput = pre[0].innerHTML;
const exampleInput = `30373\n25512\n65332\n33549\n35390`;

function makeMatrix(rows) {
    let matrix = [];
    rows.forEach((row) => {
        const currentRow = row.split("");
        matrix.push(currentRow);
    });
    return matrix;
}

function findTallestTree(row) {
    if (row.length < 1) return null;
    row.sort((a, b) => a - b);
    return row[row.length - 1];
}

function gatherTrees(
    matrix,
    position,
    startingValue,
    endingValue,
    whichPosToReplace
) {
    const row = [];
    for (let i = startingValue; i < endingValue; i++) {
        if (whichPosToReplace === 0) {
            row.push(matrix[position[0]][i]);
        } else {
            row.push(matrix[i][position[1]]);
        }
    }
    return row;
}

function checkRow(matrix, position, direction) {
    let startingValue = null;
    let endingValue = null;
    let whichPosToReplace = 0;
    let isVisible = false;

    if (direction === "left") {
        startingValue = 0;
        endingValue = position[1];
    } else if (direction === "right") {
        startingValue = position[1] + 1;
        endingValue = matrix[position[0]].length;
    } else if (direction === "up") {
        startingValue = 0;
        endingValue = position[0];
        whichPosToReplace = 1;
    } else if (direction === "down") {
        startingValue = position[1] + 1;
        endingValue = matrix[position[1]].length;
        whichPosToReplace = 1;
    }
    const rowToCheck = gatherTrees(
        matrix,
        position,
        startingValue,
        endingValue,
        whichPosToReplace
    );

    if (matrix[position[0]][position[1]] > findTallestTree(rowToCheck)) {
        isVisible = true;
        console.log(
            rowToCheck,
            `${
                matrix[position[0]][position[1]]
            } is taller than ${findTallestTree(
                rowToCheck
            )}, so its visible from ${direction}`
        );
    }
    return isVisible;
}

function checkTree(matrix, position) {
    let isVisible = false;

    isVisible = checkRow(matrix, position, "left");
    if (!isVisible) {
        isVisible = checkRow(matrix, position, "right");
    }
    if (!isVisible) {
        isVisible = checkRow(matrix, position, "up");
    }
    if (!isVisible) {
        isVisible = checkRow(matrix, position, "down");
    }
    console.log("----checking", position);
    return isVisible;
}

function part1(input) {
    const rows = input.split("\n");

    const matrix = makeMatrix(rows);
    console.log(matrix);

    let visibleTrees = 0;

    // all edges are visible
    const horizontalEdges = matrix[0].length * 2;
    const verticalEdges = matrix.length * 2;
    // dont double-count corners
    const allEdges = horizontalEdges + verticalEdges - 4;
    visibleTrees += allEdges;
    // console.log("visible trees from edges", visibleTrees);

    for (let j = 1; j < matrix.length - 1; j++) {
        for (let i = 1; i < matrix[1].length - 1; i++) {
            if (checkTree(matrix, [j, i])) {
                visibleTrees++;
            }
        }
    }
    return visibleTrees;
    // check each tree in matrix (other than the edges) - if checkTree returns true it's visible so you can add it to the count.

    /*
    go from matrix[1][1] to matrix[1][length - 2]
    matrix[2][1] to matrix[2][length - 2] etc.

    and matrix[length -2][1] to matrix[length - 2][length - 2]
    */
}

const visibleTrees = part1(realInput);
console.log(visibleTrees);
