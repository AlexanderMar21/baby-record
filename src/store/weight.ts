//  create a pinia store for weight data
// Path: src/store/weight.ts
// Compare this snippet from src/store/baby.ts:
import { defineStore, storeToRefs } from 'pinia';
import { useDateFormat, useLocalStorage } from '@vueuse/core';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useFireStore } from './firestore';
import { WeightRecord } from '../types/Weight';
import { computed } from 'vue';
export const useWeight = defineStore('weight', () => {
	const weightRecords = useLocalStorage<WeightRecord[]>('weightRecords', []);
	const fireStore = useFireStore();
	const { getCollectionName, hasFireStore } = storeToRefs(fireStore);

	const setWeightRecord = async (wRecord: WeightRecord) => {
		weightRecords.value = [...weightRecords.value, wRecord];
		if (hasFireStore.value) {
			await setDoc(doc(db, getCollectionName.value + '_weight', wRecord.id), wRecord);
		}
	};

	const fetchWeightRecords = async () => {
		if (!hasFireStore.value) return;
		const querySnapshot = await getDocs(collection(db, getCollectionName.value + '_weight'));
		if (querySnapshot) {
			weightRecords.value = [];
		}
		querySnapshot.forEach((doc) => {
			const weightRecord = doc.data() as WeightRecord;
			weightRecords.value = [...weightRecords.value, weightRecord];
		});
	};

	const getFormattedWeightRecords = computed(() => {
		return weightRecords.value.map((record) => {
			return {
				...record,
				date: useDateFormat(record.date, 'DD MMM, YYYY', { locales: navigator.language }).value,
			};
		});
	});

	const deleteWeightRecord = async (id: string) => {
		weightRecords.value = weightRecords.value.filter((record) => record.id !== id);
		if (hasFireStore.value) {
			await setDoc(doc(db, getCollectionName.value + '_weight', id), weightRecords.value);
		}
	};

	return {
		weightRecords,
		setWeightRecord,
		fetchWeightRecords,
		getFormattedWeightRecords,
		deleteWeightRecord,
	};
});
