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
			<h3 class="text-xl mb-2">Baby's information</h3>
			<div class="flex gap-4 justify-start flex-wrap items-center">
				<div class="flex gap-4 justify-start items-center">
					<div class="form-group">
						<label for="baby-name">Name:</label>
						<input
							v-model="babyInfoTemp.name"
							minlength="3"
							class="form-control"
							id="baby-name"
							type="text"
							placeholder="Name"
						/>
					</div>
					<div class="form-group">
						<label for="surname">Surname:</label>
						<input
							v-model="babyInfoTemp.surname"
							minlength="3"
							class="form-control"
							id="surname"
							type="text"
							placeholder="Surname"
						/>
					</div>
				</div>

				<div class="form-group">
					<label for="bod">Birthday:</label>
					<input
						v-model="babyInfoTemp.birthDate"
						class="form-control"
						id="bod"
						type="datetime-local"
						placeholder="Surname"
					/>
				</div>
				<div class="form-group">
					<label for="profile">Profile picture:</label>
					<input class="form-control" id="profile" type="file" @change="onFileChange" />
				</div>
				<button class="btn btn--outlined flex-1 inline-block" type="button" @click="cancelBabyUpdate">
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
import { reactive, ref } from 'vue';
import { useMilkStore } from '../store/milk';
import { useBabyInfo } from '../store/baby';
import Compressor from 'compressorjs';
import { uploadBytes } from 'firebase/storage';
import { storage } from '../services/firebase';
import { ref as REF } from 'firebase/storage';

const fireStore = useFireStore();
const milkStore = useMilkStore();
const { collectionName, getCollectionName } = storeToRefs(fireStore);

const storageRef = REF(storage, getCollectionName.value + '_info/babyInfo.jpg');

const babyInfoStore = useBabyInfo();

const { babyInfo } = storeToRefs(babyInfoStore);

const collName = ref(collectionName.value);
const fileRef = ref<File | Blob>();

const babyInfoTemp = reactive({
	name: babyInfo.value.name,
	surname: babyInfo.value.surname,
	birthDate: babyInfo.value.birthDate,
});

const setName = () => {
	fireStore.setCollectionName(collName.value);
};
const saveName = () => {
	setName();
};
const onFileChange = (e: Event) => {
	if (!e.target.files[0]) return;

	new Compressor(e.target.files[0], {
		quality: 0.9,
		maxWidth: 400,
		success(result) {
			fileRef.value = result;
		},
	});
};
const saveAndSync = async () => {
	setName();
	await milkStore.syncRecords();
};
const cancelBabyUpdate = () => {
	babyInfoTemp.name = babyInfo.value.name;
	babyInfoTemp.surname = babyInfo.value.surname;
	babyInfoTemp.birthDate = babyInfo.value.birthDate;
};
const saveBabyInfo = async () => {
	await babyInfoStore.setBabyInfo({ ...babyInfoTemp });
	if (fileRef.value) {
		uploadBytes(storageRef, fileRef.value).then((_) => {
			console.log('uploaded');
		});
	}
};
</script>

<style scoped></style>
