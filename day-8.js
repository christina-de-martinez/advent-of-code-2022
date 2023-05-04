const pre = document.getElementsByTagName("pre");
const realInput = pre[0].innerHTML;
// const exampleInput = `30373\n25512\n65332\n33549\n35390`;

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

function checkRow(row, reverse = false) {
    if (row.length <= 0) return;
    // for each row, reduce and keep track of the highest number
    // when you encounter a new highest number, add 1 to visible trees and keep the new highest number as the new standard
    let tallestTreeSoFar = parseInt(reverse ? row[row.length - 1] : row[0]);
    // const visibleTreeLocations = [reverse ? row.length - 1 : 0];
    const visibleTreeLocations = [];

    return row.reduce((acc, curr, idx) => {
        const currentTreeHeight = parseInt(curr);
        if (currentTreeHeight > tallestTreeSoFar) {
            tallestTreeSoFar = currentTreeHeight;
            visibleTreeLocations.push(reverse ? row.length - idx - 1 : idx);
        }
        return visibleTreeLocations;
    });
}

function scan(row) {
    // forward
    const visibleTreeLocationsForward = checkRow(row);

    // backward
    const reversedRow = row.slice().reverse();
    const visibleTreeLocationsReverse = checkRow(reversedRow, true);

    if (!visibleTreeLocationsForward || !visibleTreeLocationsReverse) {
        return;
    }
    const allVisibleTreeLocations = [
        ...visibleTreeLocationsForward,
        ...visibleTreeLocationsReverse,
    ];
    // remove duplicates using a set
    if (!allVisibleTreeLocations) return;
    const visibleTrees = [...new Set(allVisibleTreeLocations)];
    return visibleTrees;
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

    // scan horizontally
    // keep track of locations of visible trees as they're found
    const visibleTreeLocations = {};
    for (let i = 1; i < matrix.length - 1; i++) {
        visibleTreeLocations[i] = new Set(scan(matrix[i]));
    }

    // build columns and scan vertically
    for (let k = 1; k < matrix[0].length - 1; k++) {
        const column = [];
        for (let j = 0; j < matrix.length; j++) {
            column.push(matrix[j][k]);
        }
        const verticalPositions = scan(column);
        if (!verticalPositions) return;
        visibleTreeLocations[k].add(...verticalPositions);
    }
    console.log(visibleTreeLocations);

    // remove first and last trees since we already accounted for them (the whole point of that was to avoid doing extra work but now we have to do extra work. lol.)
    for (const [key, value] of Object.entries(visibleTreeLocations)) {
        value.delete(0);
        value.delete(matrix[0].length - 1);
        visibleTrees += value.size;
    }

    return visibleTrees;
}

const visibleTrees = part1(realInput);
// const visibleTrees = part1(exampleInput);
console.log(visibleTrees);
