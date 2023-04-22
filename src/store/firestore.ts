import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';

export const useFireStore = defineStore('firestore', () => {
	const collectionName = useLocalStorage<string>('fireStore', '');

	const setCollectionName = (name: string) => {
		collectionName.value = name;
	};

	const getCollectionName = computed(() => {
		return collectionName.value;
	});
	const hasFireStore = computed(() => {
		return collectionName.value.trim().length > 0;
	});

	return {
		setCollectionName,
		collectionName,
		getCollectionName,
		hasFireStore,
	};
});
