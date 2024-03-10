import BubbleSort from "../sorts/BubbleSorter.ts";
import InsertSort from "../sorts/InsertSorter.ts";
import MergeSort from "../sorts/MergeSorter.ts";
import QuickSort from "../sorts/QuickSorter.ts";
import ShellSort from "../sorts/ShellSorter.ts";

const LENGTH = 100;
const generateRandomArray = () => {
    const res = [];
    for (let i = 0; i < LENGTH; i++) {
        res.push(Math.floor(Math.random() * LENGTH));
    }
    return res;
};
const testArray = generateRandomArray();
console.log(testArray);
const merge = new MergeSort([...testArray]);
const insert = new InsertSort([...testArray]);
const quick = new QuickSort([...testArray]);
const shell = new ShellSort([...testArray]);
for (let i of merge.oneStep()) {
}
for (let i of insert.oneStep()) {
}
for (let i of quick.oneStep()) {
}
for (let i of shell.oneStep()) {
}

const arrayEqual = (a: number[], b: number[]) => {
    console.log(a);
    console.log(b);
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            console.log(i);
            return false;
        }
    }
    return true;
};

console.log(shell.getCurrent());
console.log(arrayEqual(shell.getCurrent(), merge.getCurrent()));
