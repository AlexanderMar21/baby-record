import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { MilkRecord } from '../types/Milk';

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useMilkStore = defineStore('milkRecords', () => {
	const milkRecords = useLocalStorage<MilkRecord[]>('milkRecords', []);

	const addMilkRecord = (record: MilkRecord) => {
		milkRecords.value = [...milkRecords.value, record];
	};
	const removeMilk = (id: string) => {
		milkRecords.value = milkRecords.value.filter((record) => record.id !== id);
	};
	return {
		milkRecords,
		addMilkRecord,
		removeMilk,
	};
});
