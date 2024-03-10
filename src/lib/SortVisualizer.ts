export interface Sorter {
    oneStep: () => Generator;
    getCurrent: () => Array<number>;
}
