// I did this in tha browser against the inputs page: https://adventofcode.com/2022/day/2/input
// The inputs is just a <body> element with a single <pre> tag that contains strings split by line breaks

// get the values and split up each line into its own array
const pre = document.getElementsByTagName("pre");
const matchesFromPage = pre[0].innerHTML;

function getValuePoints(letter) {
    switch (letter) {
        case "C":
            return 3;
        case "B":
            return 2;
        case "A":
            return 1;
    }
}

function getResultsPoints(match) {
    switch (match[2]) {
        case "Z":
            return 6;
        case "Y":
            return 3;
        case "X":
            return 0;
    }
}

function getShapesGuide(match) {
    const theirMove = match[0];

    if (theirMove === "A") {
        // rock
        return { winning: "B", losing: "C", draw: "A" };
    } else if (theirMove === "B") {
        // paper
        return { winning: "C", losing: "A", draw: "B" };
    } else if (theirMove === "C") {
        // scissors
        return { winning: "A", losing: "B", draw: "C" };
    }
}

function calculateScore(matches) {
    // expect matches to be a giant string of matches, each person's shape separated by a space and each match separated by a line break
    matches = matches.split("\n");
    let points = 0;
    matches.map((match) => {
        if (match === "") {
            return;
        }
        // result points
        points += getResultsPoints(match);

        // value points based on the shape that you choose
        const shape = getShapesGuide(match);
        if (match[2] === "X") {
            points += getValuePoints(shape.losing);
        } else if (match[2] === "Y") {
            points += getValuePoints(shape.draw);
        } else if (match[2] === "Z") {
            points += getValuePoints(shape.winning);
        }
    });
    console.log(`your points: ${points}`);
    return points;
}

// Time complexity: O(n/2), so O(n).
// Space complexity: O(n)

console.group("Tests");
console.log(
    `scores test input correctly: ${calculateScore("A Y\nB X\nC Z") === 12}`
);
console.groupEnd();

calculateScore(matchesFromPage);
