// I did this in tha browser against the inputs page: https://adventofcode.com/2022/day/2/input
// The inputs is just a <body> element with a single <pre> tag that contains strings split by line breaks

// get the values and split up each line into its own array
const pre = document.getElementsByTagName("pre");
const matchesFromPage = pre[0].innerHTML;

function getValuePoints(match) {
    // only return the points for your moves
    switch (match[2]) {
        case "Z":
            return 3;
        case "Y":
            return 2;
        case "X":
            return 1;
    }
}

function getWinnerIndex(match) {
    // first convert ABCs to XYZs
    match = match.replace("A", "X"); // rock
    match = match.replace("B", "Y"); // paper
    match = match.replace("C", "Z"); // scissors

    // draw returns null, otherwise return index of winner
    if (match[0] === match[2]) {
        return null;
    } else if (match.indexOf("X") !== -1) {
        if (match.indexOf("Z") !== -1) {
            // rock vs. scissors, rock wins
            return match.indexOf("X");
        } else if (match.indexOf("Y") !== -1) {
            // rock vs. paper, paper wins
            return match.indexOf("Y");
        }
    } else if (match.indexOf("Y") !== -1) {
        // scissors vs. paper, scissors wins
        return match.indexOf("Z");
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
        points += getValuePoints(match);
        const winnerIndex = getWinnerIndex(match);
        if (winnerIndex === null) points += 3;
        if (winnerIndex === 2) points += 6;
    });
    console.log(`your points: ${points}`);
    return points;
}

// Time complexity: O(n/2), so O(n).
// Space complexity: O(n)

console.group("Tests");
console.log(
    `scores test input correctly: ${calculateScore("A Y\nB X\nC Z") === 15}`
);
console.groupEnd();

calculateScore(matchesFromPage);
