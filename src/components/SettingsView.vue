<template>
	<div>
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
				<button class="btn btn--outlined flex-1 inline-block" type="button" @click="saveAndSync">
					🔄 &nbsp Save & Sync
				</button>
				<button class="btn btn--primary flex-1 inline-block" type="button" @click="saveName">
					💾 &nbsp Save
				</button>
			</div>
		</form>
		<hr class="my-3" />
		<form @submit.prevent class="w-full h-full">
			<div class="flex gap-4 justify-start flex-wrap items-center">
				<div class="flex gap-4 justify-start items-center">
					<div class="form-group">
						<label for="baby-name">Baby's mame:</label>
						<input
							v-model="babyInfo.name"
							minlength="3"
							class="form-control"
							id="baby-name"
							type="text"
							placeholder="Name"
						/>
					</div>
					<div class="form-group">
						<label for="surname">Baby's surname:</label>
						<input
							v-model="babyInfo.surname"
							minlength="3"
							class="form-control"
							id="surname"
							type="text"
							placeholder="Surname"
						/>
					</div>
				</div>

				<div class="form-group">
					<label for="bod">Baby's birthday:</label>
					<input
						v-model="babyInfo.birthDate"
						minlength="3"
						class="form-control"
						id="bod"
						type="datetime-local"
						placeholder="Surname"
					/>
				</div>
				<div class="form-group">
					<label for="profile">Baby's profile:</label>
					<input minlength="3" class="form-control" id="profile" type="file" placeholder="Surname" />
				</div>
				<button class="btn btn--outlined flex-1 inline-block" type="button" @click="saveAndSync">
					❌ &nbsp Cancel
				</button>
				<button class="btn btn--primary flex-1 inline-block" type="button" @click="saveBabyInfo">
					💾 &nbsp Save
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
import { useBabyInfo } from '../store/baby';

const babyInfoStore = useBabyInfo();

const { babyInfo } = storeToRefs(babyInfoStore);

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
const saveBabyInfo = async () => {
	await babyInfoStore.setBabyInfo({ ...babyInfo.value });
};
</script>

<style scoped></style>
