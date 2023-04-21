<template>
	<div class="flex justify-center flex-col items-center max-w-440px mx-auto max-h-full">
		<h1 class="text-3xl mb-4 text-center">Feeding recorder</h1>

		<form @submit.prevent="addMilk" class="w-full h-full">
			<div class="flex gap-4 justify-start">
				<div class="form-group">
					<label for="date">Date:</label>
					<input class="form-control" id="date" type="date" v-model="date" />
				</div>
				<div class="form-group">
					<label class="form" for="time"> Time: </label>
					<input class="form-control" id="time" type="time" v-model="time" />
				</div>
			</div>
			<hr />
			<div class="flex items-center justify-between gap-4">
				<div class="form-group flex-1">
					<label for="amount">Amount:</label>
					<select class="form-control" id="amount" v-model="amount">
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="30">30</option>
						<option value="40">40</option>
						<option value="50">50</option>
						<option value="60">60</option>
						<option value="70">70</option>
						<option value="80">80</option>
						<option value="90">90</option>
						<option value="100">100</option>
						<option value="110">110</option>
						<option value="120">120</option>
						<option value="130">130</option>
						<option value="140">140</option>
						<option value="150">150</option>
					</select>
				</div>
				<button class="btn btn--outlined inline-block mt-3" @click.stop="setNow" type="button">Now</button>
				<button class="btn btn--primary flex-1 inline-block mt-3" type="submit">Save</button>
			</div>
		</form>
		<hr class="w-full my-2" />
		<section class="w-full">
			<h2 class="text-2xl text-center mb-4">Milk Records</h2>
			<ol
				class="block bg-white shadow-md rounded-2xl p-4 max-h100 overflow-y-auto border-gray-300 max-h-340px"
			>
				<li
					v-for="record in sorted"
					:key="record.id"
					class="flex items-center justify-between py-1 border-b border-gray-200"
				>
					<span>
						{{ useDateFormat(record.date, 'DD MMM, YYYY', { locales: locale }).value }}
					</span>
					<span>
						{{ useDateFormat(record.time, 'HH:mm', { locales: locale }).value }}
					</span>
					<span> {{ record.amount }} ml </span>
				</li>
				<p v-if="sorted.length === 0" class="text-center">No records</p>
			</ol>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useNow, useDateFormat } from '@vueuse/core';
import { useMilkStore } from '../store/milk';
import { create_UUID } from '../utils/uuid';

const formattedNowDate = useDateFormat(useNow(), 'YYYY-MM-DD');
const formattedNowTime = useDateFormat(useNow(), 'HH:mm');
const { milkRecords } = storeToRefs(useMilkStore());

const sorted = computed(() =>
	milkRecords.value.sort((a, b) => {
		return new Date(b.time) - new Date(a.time);
	})
);

const setNow = () => {
	date.value = formattedNowDate.value;
	time.value = formattedNowTime.value;
};

const locale = ref(navigator.language);
const date = ref(formattedNowDate.value);
const time = ref(formattedNowTime.value);
const amount = ref(20);
const addMilk = () => {
	useMilkStore().addMilkRecord({
		date: new Date(`${date.value}`),
		amount: amount.value,
		time: new Date(`${date.value}T${time.value}`).toISOString(),
		id: create_UUID(),
	});
};
</script>
