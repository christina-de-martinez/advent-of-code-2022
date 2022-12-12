// I did this in tha browser against the inputs page: https://adventofcode.com/2022/day/1/input
// The inputs is just a <body> element with a single <pre> tag that contains strings split by line breaks

// get the values
const pre = document.getElementsByTagName("pre");
const text = pre[0].innerHTML;

// split up each elf's inventory into its own array
// entries will be an array of strings (an array containing all elves' inventories)
const entries = text.split(`\n\n`);

// for each elf's inventory, add up the number of calories
// to do this, we need to split by newline, then parseInt and add the totals together
const calorieValues = [];

entries.forEach((entry) => {
    entry = entry.split(`\n`);
    const totalCalories = entry.reduce((prev, current) => {
        const num = parseInt(current);
        if (!!num && typeof num === "number") {
            return prev + num;
        } else return prev;
    }, 0);
    calorieValues.push(totalCalories);
});

// calorieValues should be an array of integers now (the added value of calories for each elf)
// find the index of the biggest number and return it. this will be the elf that has the most calories
const biggestCalorieAmount = Math.max(...calorieValues);
console.log(`answer to part 1: ${biggestCalorieAmount}`);

const sortedCalories = calorieValues.sort((a, b) => b - a);
const topThreeCalorieAmounts =
    sortedCalories[0] + sortedCalories[1] + sortedCalories[2];
console.log(`answer to part 2: ${topThreeCalorieAmounts}`);

// time complexity: O(n)
// space complexity: 2n (therefore O(n)) since i'm doing most variable reassignment in place except for calorieValues (which I did because I don't want to overwrite one type - array - with a different type - number)

console.group("TESTS");
console.log("second elfs calories are 12219", calorieValues[1] === 12219);
console.log(
    "last elfs calories are 46565",
    calorieValues[calorieValues.length - 1] === 46565
);
console.groupEnd();
