import { Sorter } from "../SortVisualizer.ts";

class QuickSort implements Sorter {
    private array: Array<number> = [];

    getCurrent() {
        return this.array;
    }
    constructor(array: Array<number>) {
        this.array = array;
        return;
    }
    med(a: number, b: number, c: number): number {
        return (a >= b && c >= a) || (a <= c && b <= a) ? a : (a >= b && b >= c) || (c >= b && a <= b) ? b : c;
    }

    *quickSort(left: number, right: number): Generator {
        if (right - left <= 0) {
            yield [right];
        } else {
            const mid = left + Math.floor((right - left) / 2);
            const pivot = this.med(this.array[mid], this.array[left], this.array[right]);
            let l = left;
            let r = right;
            while (1) {
                while (this.array[l] < pivot) {
                    l++;
                }
                while (this.array[r] > pivot) {
                    r--;
                }
                if (r <= l) {
                    break;
                } else {
                    const tmp = this.array[r];
                    this.array[r] = this.array[l];
                    this.array[l] = tmp;
                    yield [r, l];
                    l++;
                    r--;
                }
            }
            const iterA = this.quickSort(left, l - 1);
            for (const i of iterA) {
                yield i;
            }
            const iterB = this.quickSort(r + 1, right);
            for (const i of iterB) {
                yield i;
            }
        }
    }

    *oneStep() {
        const iter = this.quickSort(0, this.array.length - 1);
        for (const i of iter) {
            yield i;
        }
    }
}

export default QuickSort;
