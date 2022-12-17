// I did this in tha browser against the inputs page: https://adventofcode.com/2022/day/3/input
// The inputs is just a <body> element with a single <pre> tag that contains strings split by line breaks
const pre = document.getElementsByTagName("pre");
const allRucksacks = pre[0].innerHTML;

function checkIfRucksackIncludesItem(
    firstString = "",
    secondString = "",
    letters
) {
    // I thought about creating a set but thought that it wouldn't make a big difference in speed (I was wrong, I discovered after a convo with Jacob.). I guess I should refactor to use map...
    for (let i = 0; i < secondString.length; i++) {
        if (firstString.includes(secondString[i])) {
            letters.push(secondString[i]);
        }
    }
    return;
}

function getPriorityPointsForLetter(letter) {
    if (!letter) return 0;
    let points = null;
    let letterCopy = letter;

    // A = ascii code 65 (since the points start at 27, we use 65 - 27 = )
    // a = ascii code 97 (since the points start at 1, we use 96)
    if (letter === letterCopy.toUpperCase()) {
        points = letter.charCodeAt(0) - 38;
    } else if (letter === letterCopy.toLowerCase()) {
        points = letter.charCodeAt(0) - 96;
    }
    return points;
}

function compareThreeRucksacks(arrayOfRucksacks) {
    const letters = [];
    // if there's only one common letter, we can probably assume that that's the one, but I guess we should check for good measure
    checkIfRucksackIncludesItem(
        arrayOfRucksacks[0],
        arrayOfRucksacks[1],
        letters
    );

    let letterString = "";
    for (let j = 0; j < letters.length; j++) {
        letterString = letterString.concat(letters[j]);
    }
    const lettersInAllThree = [];
    checkIfRucksackIncludesItem(
        arrayOfRucksacks[2],
        letterString,
        lettersInAllThree
    );
    // we can assume that there is only one. If this was real life, I would have validated this, stopped when we found the first letter that matches, etc.
    return lettersInAllThree[0];
}

function findBadgeType(allRucksacks, points, indexStart) {
    let currentRucksacks = [];
    while (indexStart < allRucksacks.length) {
        currentRucksacks = [];
        for (let i = indexStart; i < indexStart + 3; i++) {
            currentRucksacks.push(allRucksacks[i]);
        }
        points += getPriorityPointsForLetter(
            compareThreeRucksacks(currentRucksacks)
        );
        indexStart += 3;
    }
    return points;
}

function partTwo(allRucksacks) {
    const rucksacksArray = allRucksacks.split("\n");
    rucksacksArray.pop(); // because I'm running it in the browser, it gives me an extra blank line that I don't want to deal with
    points = findBadgeType(rucksacksArray, 0, 0);
    return points;
}

// time complexity: O(n^2)?
// I go through each line (in groups of 3), comparing the first line to the second using string.includes (linear search). Then I compare the commonalities between the two to the third string (another linear search). I think that's O(n^2).
// space complexity: O(n)

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw`;

console.log(`part 2: ${partTwo(allRucksacks)}`);

/*
 some stuff I learned more about:
 I had forgotten that `for in` is different than `for of`
 string.includes usually uses linear search
*/
