import { Box, Button } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import BubbleSort from "./lib/sorts/BubbleSorter";
import MergeSort from "./lib/sorts/MergeSorter";
import InsertSort from "./lib/sorts/InsertSorter";
import BucketSort from "./lib/sorts/BucketSort";
import QuickSort from "./lib/sorts/QuickSorter";
import ShellSort from "./lib/sorts/ShellSorter";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Chart.js Bar Chart",
        },
    },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
    labels,
    datasets: [
        {
            data: [0, 44, 1, 2, 3, 34, 4, 35, 3, 5, 3],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
    ],
};
type Props = {
    data: { array: Array<number>; selected: Array<number> };
};
const HEIGHT = 400;
const MAX = 500;
const BarGraph = (props: Props) => {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas?.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (canvas) {
            canvas.width = props.data.array.length * 10;
            canvas.height = HEIGHT;
        }

        props.data.array.forEach((e, index) => {
            ctx.fillStyle = props.data.selected.indexOf(index) !== -1 ? "orange" : "black";
            ctx?.fillRect(index * 10, HEIGHT * (1 - e / MAX), 10, HEIGHT);
        });
    }, [props.data]);

    return <canvas ref={ref}></canvas>;
};
const sortAlgorithms = ["merge", "bubble", "insert", "bucket", "quick", "shell"] as const;
type SortAlgorithm = (typeof sortAlgorithms)[number];

const ARRAY_NUM = 100;
const App = () => {
    const [data, setData] = useState<{ array: Array<number>; selected: number[] }>({ array: [], selected: [] });
    const [isExcecuting, setIsExecuting] = useState<boolean>(false);
    const generateRandomArray = () => {
        const tmp = [];
        for (let i = 0; i < ARRAY_NUM; i++) {
            tmp.push(Math.floor(Math.random() * MAX));
        }
        setData({ array: tmp, selected: [] });
        return tmp;
    };
    useEffect(() => {
        generateRandomArray();
    }, []);
    const onClick = (sort: SortAlgorithm) => () => {
        const alg = (() => {
            switch (sort) {
                case "merge":
                    return MergeSort;
                case "bubble":
                    return BubbleSort;
                case "insert":
                    return InsertSort;
                case "bucket":
                    return BucketSort;
                case "quick":
                    return QuickSort;
                case "shell":
                    return ShellSort;
            }
        })();
        if (isExcecuting) {
            return;
        }
        setIsExecuting(true);
        const array = generateRandomArray();

        const sorter = new alg(array);
        const generator = sorter.oneStep();
        const timer = setInterval(() => {
            const res = generator.next();
            if (res.value) {
                setData({ array: [...sorter.getCurrent()], selected: res.value });
            } else {
                setIsExecuting(false);
                setData({ array: [...sorter.getCurrent()], selected: [] });
                clearInterval(timer);
            }
        }, 20);
    };
    return (
        <>
            <Box
                sx={{ width: "90%", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto" }}
            >
                <BarGraph data={data} />
            </Box>
            <Box
                sx={{ width: "90%", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto" }}
            >
                <Button onClick={onClick("bubble")}>バブルソート</Button>
                <Button onClick={onClick("merge")}>マージソート</Button>
                <Button onClick={onClick("insert")}>インサートソート</Button>
                <Button onClick={onClick("bucket")}>バケットソート</Button>
                <Button onClick={onClick("quick")}>クイックソート</Button>
                <Button onClick={onClick("shell")}>シェルソート</Button>
            </Box>
        </>
    );
};

export default App;
