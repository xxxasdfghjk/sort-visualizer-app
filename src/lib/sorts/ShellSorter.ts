import { Sorter } from "../SortVisualizer.ts";

class ShellSort implements Sorter {
    private array: Array<number> = [];

    getCurrent() {
        return this.array;
    }
    constructor(array: Array<number>) {
        this.array = array;
        return;
    }

    *insertSort(offset: number, step: number) {
        for (let i = offset; i < this.array.length; i += step) {
            const tmp = this.array[i];
            for (let j = i - step; j >= 0; j -= step) {
                if (this.array[j] > tmp) {
                    this.array[j + step] = this.array[j];
                    yield [j, j + step];
                    if (j === offset) {
                        this.array[offset] = tmp;
                        yield [offset];
                    }
                } else {
                    this.array[j + step] = tmp;
                    yield [j + step];
                    break;
                }
            }
        }
    }
    steps = [23, 17, 13, 11, 7, 5, 3, 2, 1];

    *oneStep() {
        for (const step of this.steps) {
            for (let i = 0; i < step; i++) {
                const iter = this.insertSort(i, step);
                for (const f of iter) {
                    yield f;
                }
            }
        }
        yield undefined;
    }
}

export default ShellSort;
