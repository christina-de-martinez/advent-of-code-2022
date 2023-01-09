/*
map is O(n) and if I put a for loop inside but only do the number of moves, it can be n * biggest number of moves?
goal: o(n)

my goal was O(n) time and space complexity. For this algorithm, I used the following actions-
for the crates input:
* a while loop that operates based on the number of piles, to divide the boxes into horizontal groupings. The more crate stacks we're given, the bigger this will be, but if we have only a few stacks that are super tall, this won't happen many times. I think it's still O(n) although the slope can vary.
* a while loop that will iterate through all horizontalGroupings using map. The more crate stacks we're given, the bigger this will be, but it still directly depends on the input size, so I think this is O(n) just like the above one.
O(n) + O(n) = O(2n) = O(n)

for the moves input:
* I map over the moves and perform them each, which would be O(n)
O(n)

O(n) + O(n) = O(n), so I think I accomplished my goal!
*/

const pre = document.getElementsByTagName("pre");
const input = pre[0].innerHTML;

const testInput = `    [D]    \n[N] [C]    \n[Z] [M] [P]\n 1   2   3 \n\nmove 1 from 2 to 1\nmove 3 from 1 to 3\nmove 2 from 2 to 1\nmove 1 from 1 to 2`;
const [crates, movesString] = input.split(`\n\n`);
const moves = movesString.split(`\n`);

const [cratesString, cratePileNumbers] = crates.split(" 1");

const allCrates = cratePileNumbers.trim().split(" ");
const numberOfPiles = allCrates[allCrates.length - 1];

const cratesArray = cratesString.match(/.{1,4}/g);

const horizontalGroupings = [];
while (cratesArray.length > 0) {
    horizontalGroupings.push(cratesArray.splice(0, numberOfPiles));
}

let warehouse = [];
while (horizontalGroupings.length > 0) {
    horizontalGroupings[horizontalGroupings.length - 1].map((box, index) => {
        let newLength = null;
        const trimmedBox = box.trim();
        if (trimmedBox !== "") {
            if (!warehouse[index]) warehouse[index] = [];
            newLength = warehouse[index].push(
                box.trim().replace(/[\[\]']+/g, "")
            );
        }
    });
    horizontalGroupings.pop();
}

moves.map((move) => {
    const trimmedMove = move.trim();
    if (trimmedMove !== "") {
        // this is necessary because moves can have more than one digit
        move = move.replace("move ", "");
        move = move.replace(" from ", ",");
        move = move.replace(" to ", ",");
        move = move.split(",");
        const numOfMoves = parseInt(move[0]);
        const origin = parseInt(move[1] - 1);
        const destination = parseInt(move[2] - 1);

        let boxesToMove = warehouse[origin].splice(
            warehouse[origin].length - numOfMoves,
            numOfMoves
        );
        warehouse[destination] = warehouse[destination].concat(boxesToMove);
    }
});

let topBoxes = "";
warehouse.map((boxes) => {
    topBoxes += boxes[boxes.length - 1];
});

console.log(`part 2: ${topBoxes}`);
