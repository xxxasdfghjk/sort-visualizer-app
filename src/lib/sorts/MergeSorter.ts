import { Sorter } from "../SortVisualizer.ts";

class MergeSort implements Sorter {
    private array: Array<number> = [];

    getCurrent() {
        return this.array;
    }
    constructor(array: Array<number>) {
        this.array = array;
        return;
    }

    *mergeSort(left: number, right: number): Generator {
        if (right - left <= 1) {
            yield [right];
        } else {
            const mid = left + Math.floor((right - left) / 2);
            const iterA = this.mergeSort(left, mid);
            for (const i of iterA) {
                yield i;
            }
            this.mergeSort(mid, right);
            const iterB = this.mergeSort(mid, right);
            for (const i of iterB) {
                yield i;
            }

            const A = this.array.slice(left, mid);
            const B = this.array.slice(mid, right);
            let l = 0,
                r = 0;
            while (l < A.length || r < B.length) {
                if (l < A.length && r < B.length) {
                    if (A[l] < B[r]) {
                        this.array[left + l + r] = A[l];
                        l++;
                    } else {
                        this.array[left + l + r] = B[r];
                        r++;
                    }
                } else if (l < A.length) {
                    this.array[left + l + r] = A[l];
                    l++;
                } else {
                    this.array[left + l + r] = B[r];
                    r++;
                }
                yield [left + l + r];
            }
        }
    }

    *oneStep() {
        const iter = this.mergeSort(0, this.array.length);
        for (const i of iter) {
            yield i;
        }
    }
}

export default MergeSort;
