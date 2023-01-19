/*
first section would be parsing "terminal" output

second section would be tree traversal
depth-first search
find the deepest leaf and its siblings, add the sums up, if it's less than 100k add it to an array or something. all parent folders also contain at least that number

depth first search using recursion maybe?
find deepest leaf and collect it, then go back one and go to its next child, etc., until out of children
*/

const exampleTerminal = `$ cd /\n$ ls\ndir a\n14848514 b.txt\n8504156 c.dat\ndir d\n$ cd a\n$ ls\ndir e\n29116 f\n2557 g\n62596 h.lst\n$ cd e\n$ ls\n584 i\n$ cd ..\n$ cd ..\n$ cd d\n$ ls\n4060174 j\n8033020 d.log\n5626152 d.ext\n7214296 k`;

// something starting with a $ is a command.
// something starting with dir is a directory name
// something starting with a number is the file size, then file name, respectively. file names can have extensions (e.g. .ext) or not.
// ls means list and should have the dir name and then the files. this ends when you see a $ again
// dir means a directory exists there
/*
cd / means to move to root
cd x moves in one level (to that directory)
cd .. moves out one level

dir x is a directory
123 a is a file size and file name
(after ls, look at upcoming ones and gather them into that node? do this until we find another $?)
*/

function makeFileStructure(input) {
    input = input.split("\n");

    class TreeNode {
        constructor(value, parent = null) {
            this.value = value;
            this.descendants = [];
            this.parent = parent;
        }
    }

    const root = new TreeNode("root");
    let currentNode = root;

    for (const line of input) {
        if (line.startsWith("dir")) {
            const newDirectoryNode = new TreeNode(
                line.split(" ")[1],
                currentNode
            );
            currentNode.descendants.push(newDirectoryNode);
        } else if (!line.startsWith("$")) {
            const newFileNode = new TreeNode(
                parseInt(line.split(" ")[0]),
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
            const nodeToAddTo = currentNode.descendants.find((node) => {
                return node.value === directoryName;
            });
            currentNode = nodeToAddTo;
        } else if (line.startsWith("$ cd ..")) {
            currentNode = currentNode.parent;
        }
    }

    return root;
}

makeFileStructure(exampleTerminal);
