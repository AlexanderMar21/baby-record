import { defineStore, storeToRefs } from 'pinia';
import { useDateFormat, useLocalStorage } from '@vueuse/core';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useFireStore } from './firestore';
import { BabyInfo } from '../types/Baby';
import { computed } from 'vue';
export const useBabyInfo = defineStore('babyInfo', () => {
	const babyInfo = useLocalStorage<BabyInfo>('babyInfo', {
		name: 'Name',
		surname: 'Surname',
		birthDate: '023-04-07T18:30',
	});
	const fireStore = useFireStore();
	const { getCollectionName, hasFireStore } = storeToRefs(fireStore);

	const setBabyInfo = async (bbInfo: BabyInfo) => {
		babyInfo.value = bbInfo;
		if (hasFireStore.value) {
			await setDoc(doc(db, getCollectionName.value + '_info', 'babyInfo'), babyInfo.value);
		}
	};

	const getBabyInfo = async () => {
		if (hasFireStore.value) {
			const babyInfoRef = doc(db, getCollectionName.value + '_info', 'babyInfo');

			const babyInfoDoc = await getDoc(babyInfoRef);
			if (babyInfoDoc.exists()) {
				babyInfo.value = babyInfoDoc.data() as BabyInfo;
			}
		}
	};

	const getFormattedBODate = computed(() => {
		return useDateFormat(babyInfo.value.birthDate, 'DD MMMM YYYY HH:mm', { locales: navigator.language })
			.value;
	});
	return {
		babyInfo,
		setBabyInfo,
		getBabyInfo,
		getFormattedBODate,
	};
});
