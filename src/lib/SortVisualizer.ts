export interface Sorter {
    oneStep: () => Generator;
    getCurrent: () => Array<number>;
}

class SortVisualizer {
    private sorter: Sorter;
    constructor(sorter: Sorter) {
        this.sorter = sorter;
    }

    stepByStep() {
        this.sorter.oneStep();
        return this.sorter.getCurrent();
    }
}
