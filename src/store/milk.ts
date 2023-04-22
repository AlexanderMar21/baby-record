import { defineStore, storeToRefs } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { MilkRecord } from '../types/Milk';
import { doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useFireStore } from './firestore';
export const useMilkStore = defineStore('milkRecords', () => {
	const milkRecords = useLocalStorage<MilkRecord[]>('milkRecords', []);
	const fireStore = useFireStore();
	const { getCollectionName, hasFireStore } = storeToRefs(fireStore);

	const fetchMilkRecords = async () => {
		if (!hasFireStore.value) return;
		const querySnapshot = await getDocs(collection(db, getCollectionName.value));
		if (querySnapshot) {
			milkRecords.value = [];
		}
		querySnapshot.forEach((doc) => {
			const { time, date, ...rest } = doc.data() as MilkRecord;
			milkRecords.value = [...milkRecords.value, { ...rest, date: new Date(time), time }];
		});
	};

	const addMilkRecord = async (record: MilkRecord) => {
		milkRecords.value = [...milkRecords.value, record];
		if (!hasFireStore.value) return;
		await setDoc(doc(db, getCollectionName.value, record.id), record);
	};
	const syncRecords = async () => {
		if (!hasFireStore.value) return;
		milkRecords.value.forEach(async (record) => {
			await setDoc(doc(db, getCollectionName.value, record.id), record);
		});
	};

	const removeMilk = async (id: string) => {
		milkRecords.value = milkRecords.value.filter((record) => record.id !== id);
		if (!hasFireStore.value) return;
		await deleteDoc(doc(db, getCollectionName.value, id));
	};

	return {
		milkRecords,
		fetchMilkRecords,
		addMilkRecord,
		removeMilk,
		syncRecords,
	};
});
