// I did this in tha browser against the inputs page: https://adventofcode.com/2022/day/3/input
// The inputs is just a <body> element with a single <pre> tag that contains strings split by line breaks
const pre = document.getElementsByTagName("pre");
const allRucksacks = pre[0].innerHTML;

function checkIfRucksackIncludesItem(
    firstCompartment,
    secondCompartment,
    letters
) {
    // I thought about creating a set rather than using string.includes, because searching a set is O(1). However, since we start with a string, we'd need to iterate through it once to create the set, which makes it O(n) for creation plus O(1) for the search, which would be practically bigger and approximately the same. For this reason I will go with string.includes. If I wanted to go through the compartment more than once, I would use a set instead.
    for (let i = 0; i < secondCompartment.length; i++) {
        if (firstCompartment.includes(secondCompartment[i])) {
            letters.push(secondCompartment[i]);
            return;
        }
    }
    console.log("no match found");
    return null;
}

function getPriorityPointsForLetter(letter) {
    let points = null;
    let letterCopy = letter;

    // A = ascii code 65 (since the points start at 27, we use 65 - 27 = )
    // a = ascii code 97 (since the points start at 1, we use 96)
    if (letter === letterCopy.toUpperCase()) {
        points = letter.charCodeAt(letter[0]) - 38;
    } else if (letter === letterCopy.toLowerCase()) {
        points = letter.charCodeAt(letter[0]) - 96;
    }
    return points;
}

function sumPriorities(letters) {
    let priorities = 0;

    for (letter of letters) {
        priorities += getPriorityPointsForLetter(letter);
    }
    return priorities;
}

function checkRucksacksAndSumPoints(allRucksacks) {
    const rucksacksArray = allRucksacks.split("\n");
    const letters = [];
    for (rucksack of rucksacksArray) {
        // I could have modified the original array using splice for more concision but I'm chosing readability.
        let firstCompartment = rucksack.slice(0, rucksack.length / 2);
        const secondCompartment = rucksack.slice(
            rucksack.length / 2,
            rucksack.length
        );
        checkIfRucksackIncludesItem(
            firstCompartment,
            secondCompartment,
            letters
        );
    }
    return sumPriorities(letters);
}

// time complexity: O(n)
// we have two processes: for the first, we go through each line and iterate through half of each line, checking the second half against the first. This would be a time complexity of O(n/2), but string.includes is linear, so it's actually O(n). Regardless, using string.includes doesn't impact the approximate time complexity since O(n/2) is around the same as O(n).
// for the second, we go through each letter (one per line) and check it, but since this is faster than the first process, we can ignore it and say that the entire process is O(n)

// space complexity: O(2n) = O(n)
// I made a copy of each line, split into two strings to represent the compartments, so I'm doubling the space used when I did that. That was a concious choice for readability, but if space mattered, I wouldn't have done that.
// I also created a letters array, but that is smaller than the compartments values so the size doesn't matter much.

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw`;

console.group("TESTS");
console.log(
    `the test input returns the correct number: ${
        checkRucksacksAndSumPoints(testInput) === 157
    }`
);
console.log(`part 1: ${checkRucksacksAndSumPoints(allRucksacks)}`);
console.groupEnd();

/*
 some stuff I learned more about:
 I had forgotten that `for in` is different than `for of`
 string.includes usually uses linear search
*/
