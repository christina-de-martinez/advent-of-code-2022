const testInput = "2-4,6-8\n2-3,4-5\n5-7,7-9\n2-8,3-7\n6-6,4-6\n2-6,4-8\n";
const testInput2 =
    "7-7,8-42\n2-95,2-94\n10-54,33-90\n23-24,24-40\n1-48,12-47\n9-27,9-26\n9-9,9-10\n9-10,12-15\n3-5,3-5\n";

const pre = document.getElementsByTagName("pre");
const inner = pre[0].innerHTML;

function fullyContains(input) {
    input = input.split("\n");
    let count = 0;

    // this is bad
    for (let i = 0; i < input.length - 1; i++) {
        const formattedPair = [];
        const elfStrings = input[i].split(",");
        // '2-4', '6-8'
        for (let j = 0; j < elfStrings.length; j++) {
            formattedPair.push(elfStrings[j].split("-"));
            // ['2','4']
        }
        if (formattedPair !== [""]) {
            let x1 = parseInt(formattedPair[0][0]);
            let x2 = parseInt(formattedPair[0][1]);
            let y1 = parseInt(formattedPair[1][0]);
            let y2 = parseInt(formattedPair[1][1]);
            if (x1 <= y1 && x2 >= y2) {
                // the first group fully contains the second group
                count++;
            } else if (y1 <= x1 && y2 >= x2) {
                // the second group fully contains the first group
                count++;
            }
        }
    }
    return count;
}

console.group("TESTS");
console.log(
    "test input #1 return the correct answer",
    fullyContains(testInput) === 2
);
console.log(
    "test input #2 return the correct answer",
    fullyContains(testInput2) === 5
);
console.groupEnd();

console.group("ANSWERS");
console.log(`part 1: ${fullyContains(inner)}`);
console.groupEnd();

/*
if each input is a pair, e.g. 2-4,6-8, my solution is O(n^2) because I iterate over each of these to split, then split again before comparing. This might be able to be done more elegantly by using reduce?

What I learned:
* I got tripped up for quite some time because I forgot to use parseInt.
* I did not really try to make this solution faster even though I should have.
*/
