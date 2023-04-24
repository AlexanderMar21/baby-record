<template>
	<div class="max-h-400px">
		<Bar :data="milkData" :options="options" />
	</div>
	<br />
	<div class="max-h-400px">
		<Line :data="weightData" :options="options" />
	</div>
</template>

<script lang="ts" setup>
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar, Line } from 'vue-chartjs';
import { useMilkStore } from '../store/milk';
import { storeToRefs } from 'pinia';
import { useDateFormat } from '@vueuse/core';
import { useWeight } from '../store/weight';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const milkStore = useMilkStore();
const { milkRecords } = storeToRefs(milkStore);
const weightStore = useWeight();
const { weightRecords } = storeToRefs(weightStore);

const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
const year = new Date().getFullYear();

const milkByDate = milkRecords.value
	.sort((a, b) => {
		return new Date(a.date) - new Date(b.date);
	})
	.reduce((acc, { time, amount }) => {
		if (time.startsWith(`${year}-${month}`)) {
			const dateKey = useDateFormat(time, 'DD.MM').value; // extract day from the date string
			acc[dateKey] = (acc[dateKey] || 0) + +amount; // accumulate weight for the date
		}
		return acc;
	}, {});
const weightsByDate = weightRecords.value
	.sort((a, b) => {
		return new Date(a.date) - new Date(b.date);
	})
	.reduce((acc, { date, weight }) => {
		if (date.startsWith(`${year}-${month}`)) {
			const dateKey = useDateFormat(date, 'DD.MM').value; // extract day from the date string
			acc[dateKey] = weight; // accumulate weight for the date
		}
		return acc;
	}, {});

const milkData = {
	labels: Object.keys(milkByDate),
	datasets: [
		{
			label: 'Milk/Day (ml)',
			backgroundColor: '#f87979',
			data: Object.values(milkByDate),
		},
	],
};
const weightData = {
	labels: Object.keys(weightsByDate),
	datasets: [
		{
			label: 'Weight/Day (grams)',
			backgroundColor: '#37479',
			data: Object.values(weightsByDate),
		},
	],
};

const options = {
	responsive: true,
	maintainAspectRatio: false,
};
</script>
