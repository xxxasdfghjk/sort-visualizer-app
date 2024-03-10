import { Sorter } from "../SortVisualizer.ts";

class BucketSort implements Sorter {
    private array: Array<number> = [];
    private MAX_NUMBER = 10000;

    getCurrent() {
        return this.array;
    }
    constructor(array: Array<number>) {
        this.array = array;
        return;
    }

    *oneStep() {
        const map = new Array(this.MAX_NUMBER).fill(0);
        for (let i = 0; i < this.array.length; i++) {
            map[this.array[i]] = map[this.array[i]] + 1;
            yield [i];
        }
        let index = 0;
        for (let i = 0; i < 10000; i++) {
            for (let j = 0; j < map[i]; j++) {
                this.array[index] = i;
                index++;
                yield [index];
            }
        }

        yield undefined;
    }
}

export default BucketSort;
