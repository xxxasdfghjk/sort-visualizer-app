import { Sorter } from "../SortVisualizer.ts";

class InsertSort implements Sorter {
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
            const tmp = this.array[i];
            for (let j = i - 1; j >= 0; j--) {
                if (this.array[j] > tmp) {
                    this.array[j + 1] = this.array[j];
                    yield [j, j + 1];
                    if (j === 0) {
                        this.array[0] = tmp;
                        yield [0];
                    }
                } else {
                    this.array[j + 1] = tmp;
                    yield [j + 1];
                    break;
                }
            }
        }
        yield undefined;
    }
}

export default InsertSort;
