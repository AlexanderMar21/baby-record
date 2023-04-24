<template>
	<div class="flex justify-center flex-col items-center max-h-full">
		<form @submit.prevent="addWeight" class="w-full h-full">
			<div class="flex gap-4 justify-start">
				<FormGroup label="Date:" for="date">
					<input class="form-control" id="date" type="date" v-model="date" />
				</FormGroup>
				<FormGroup label="Weight (grams):" for="weight">
					<input
						placeholder="weight in grams"
						v-maska
						data-maska="#####"
						class="form-control"
						id="weight"
						type="tel"
						v-model="weight"
					/>
				</FormGroup>
			</div>
			<hr />
			<div class="flex items-center justify-between gap-4">
				<button :disabled="!date || !weight" class="btn btn--primary flex-1 inline-block mt-3" type="submit">
					💾 &nbsp Save
				</button>
			</div>
		</form>
		<hr class="w-full my-2" />
		<section class="w-full">
			<h2 class="text-xl text-center mb-3">⚖️ History</h2>
			<ListWrapper>
				<ListItem
					v-for="record in sorted"
					:key="record.id"
					@delete="removeWeight(record)"
					:with-delete="true"
				>
					<span>📆 {{ useDateFormat(record.date, 'DD MMM, YYYY', { locales: locale }).value }}</span>
					<span>⚖️ {{ record.weight }} gr</span>
				</ListItem>
				<p v-if="sorted.length === 0" class="text-center my-2">No records</p>
			</ListWrapper>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useWeight } from '../store/weight';
import { WeightRecord } from '../types/Weight';
import ListItem from './ListItem.vue';
import ListWrapper from './ListWrapper.vue';
import FormGroup from './FormGroup.vue';
import { create_UUID } from '../utils/uuid';
import { vMaska } from 'maska';

const formattedNowDate = useDateFormat(useNow(), 'YYYY-MM-DD');
const weightStore = useWeight();
const { weightRecords } = storeToRefs(weightStore);
const locale = ref(navigator.language);
const date = ref(formattedNowDate.value);
const weight = ref(3000);

const sorted = computed(() =>
	weightRecords.value.sort((a, b) => {
		return new Date(b.time) - new Date(a.time);
	})
);

const addWeight = async () => {
	await weightStore.setWeightRecord({
		id: create_UUID(),
		date: date.value,
		weight: weight.value,
	});
};
const removeWeight = async (weightRecord: WeightRecord) => {
	const confirmed = confirm(
		`Are you sure you want to remove the entry from ${
			useDateFormat(weightRecord.date, 'DD MMMM YYYY', { locales: locale.value }).value
		}?`
	);
	if (!confirmed) return;
	await weightStore.deleteWeightRecord(weightRecord.id);
};
</script>

<style scoped></style>
