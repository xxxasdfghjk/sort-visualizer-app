import { Sorter } from "../SortVisualizer.ts";

class BubbleSort implements Sorter {
    private array: Array<number> = [];

    getCurrent() {
        return this.array;
    }
    constructor(array: Array<number>) {
        this.array = array;
        return;
    }
    *oneStep() {
        for (let i = 0; i < this.array.length; i++) {
            for (let j = this.array.length - 1; j > i; j--) {
                if (this.array[j - 1] > this.array[j]) {
                    let tmp = this.array[j];
                    this.array[j] = this.array[j - 1];
                    this.array[j - 1] = tmp;
                }
                yield [j, j - 1];
            }
        }
        yield undefined;
    }
}

export default BubbleSort;
