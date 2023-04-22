<template>
	<div>
		<h1 class="text-2xl mb-3 text-center px-4 leading-10">Settings ⚙️</h1>
		<form @submit.prevent class="w-full h-full">
			<div class="flex gap-4 justify-start flex-wrap items-center">
				<div class="form-group">
					<label for="text">Collection Name:</label>
					<input
						v-model="collName"
						minlength="3"
						class="form-control"
						id="text"
						type="text"
						placeholder="Give a unique collection name"
					/>
				</div>
				<button class="btn btn--primary flex-1 inline-block" type="button" @click="saveName">
					💾 &nbsp Save
				</button>
				<button class="btn btn--primary flex-1 inline-block" type="button" @click="saveAndSync">
					🔄 &nbsp Save & Sync
				</button>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFireStore } from '../store/firestore';
import { ref } from 'vue';
import { useMilkStore } from '../store/milk';

const fireStore = useFireStore();
const milkStore = useMilkStore();
const { collectionName } = storeToRefs(fireStore);
const collName = ref(collectionName.value);

const setName = () => {
	fireStore.setCollectionName(collName.value);
};
const saveName = () => {
	setName();
};
const saveAndSync = async () => {
	setName();
	await milkStore.syncRecords();
};
</script>

<style scoped></style>
