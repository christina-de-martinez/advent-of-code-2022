// NOTE: this produced a correct answer for the sample dataset, but not for the actual dataset :(
// Due to time constraints, I am moving on for now. At some point I'd like to come back and find the bug...

const pre = document.getElementsByTagName("pre");
const realInput = pre[0].innerHTML;
const exampleTerminal = `$ cd /\n$ ls\ndir a\n14848514 b.txt\n8504156 c.dat\ndir d\n$ cd a\n$ ls\ndir e\n29116 f\n2557 g\n62596 h.lst\n$ cd e\n$ ls\n584 i\n$ cd ..\n$ cd ..\n$ cd d\n$ ls\n4060174 j\n8033020 d.log\n5626152 d.ext\n7214296 k`;

function makeFileStructure(input) {
    input = input.split("\n");

    class TreeNode {
        constructor(value = 0, name = "", parent = null) {
            this.value = value;
            this.name = name;
            this.descendants = [];
            this.parent = parent;
        }
    }

    const root = new TreeNode(0, "root");
    let currentNode = root;

    for (const line of input) {
        if (line === "") {
            console.log("skipping");
        } else if (line.startsWith("dir")) {
            const newDirectoryNode = new TreeNode(
                0,
                line.split(" ")[1],
                currentNode
            );
            currentNode.descendants.push(newDirectoryNode);
        } else if (!line.startsWith("$")) {
            const newFileNode = new TreeNode(
                parseInt(line.split(" ")[0]),
                line.split(" ")[1],
                currentNode
            );
            currentNode.descendants.push(newFileNode);
        } else if (
            line.startsWith("$ cd") &&
            !line.startsWith("$ cd /") &&
            !line.startsWith("$ cd ..")
        ) {
            let directoryName = line.split("$ cd");
            directoryName = directoryName[1].trim();
            const nodeToAddTo = currentNode?.descendants?.find((node) => {
                return node.name === directoryName;
            });
            currentNode = nodeToAddTo;
        } else if (line.startsWith("$ cd ..")) {
            currentNode = currentNode.parent;
        }
    }

    return root;
}

function getSizeOfNode(node, smallFolders) {
    if (node.descendants.length < 1) {
        if (node.parent.value === 0) {
            node.parent.value = node.parent.descendants.reduce(
                (acc, sibling) => {
                    return (acc += parseInt(sibling.value));
                },
                0
            );
            if (node.parent.value < 100000) {
                smallFolders.push(node.parent);
            }
        }
    }
    return node.descendants
        .map((child) => getSizeOfNode(child, smallFolders))
        .reduce((a, b) => a + b, 0);
}

function findBigDirectories() {
    const tree = makeFileStructure(realInput);

    let smallFolders = [];

    val = getSizeOfNode(tree, smallFolders);

    console.log("small folders", smallFolders);

    const size = smallFolders.reduce((acc, curr) => {
        console.log("adding", curr.value);
        return acc + curr.value;
    }, 0);
    console.log(`part 1: ${size}`); // should be 95437
}

findBigDirectories();
