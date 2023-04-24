<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MilkRecorder from './components/MilkRecorder.vue';
import SettingsView from './components/SettingsView.vue';
import WeightTracker from './components/WeightTracker.vue';
import ProfileAvatar from './components/ProfileAvatar.vue';
import { useBabyInfo } from './store/baby';
import { storeToRefs } from 'pinia';
import { useWeight } from './store/weight';

const babyInfoStore = useBabyInfo();
const weightStore = useWeight();

const { babyInfo, getFormattedBODate, getProfilePic } = storeToRefs(babyInfoStore);

const comp = ref('milk');
const renderOptions = {
	milk: MilkRecorder,
	settings: SettingsView,
	weight: WeightTracker,
};

const render = (com: string) => {
	comp.value = com;
};

onMounted(async () => {
	await babyInfoStore.getBabyInfo();
	await weightStore.fetchWeightRecords();
});
</script>

<template>
	<header
		class="sticky left-0 right-0 py-3 minn-h-80x px-4 bottom-0 border-b border-gray-300 flex justify-center items-center bg-white z-2 shadow-md mb-3"
	>
		<ProfileAvatar class="absolute top-50% left-3" :icon="getProfilePic" />
		<div class="flex-1">
			<h1 class="text-center w-full text-xl font-medium">
				{{ babyInfo.name }}
				{{ babyInfo.surname }}
			</h1>
			<p class="text-center w-full text-lg">{{ getFormattedBODate }}</p>
		</div>
	</header>
	<div class="max-h-100vh px-3 max-w-440px mx-auto pb-70px">
		<component :is="renderOptions[comp]" />
		<nav
			class="fixed left-0 right-0 py-3 px-4 bottom-0 border-t border-gray-300 flex bg-white z-2 -shadow-md"
		>
			<div class="max-w-440px mx-auto flex w-full justify-evenly">
				<button class="block text-2xl" type="button" @click="render('milk')">🍼</button>
				<button class="block text-2xl" type="button" @click="render('weight')">⚖️</button>
				<button class="block text-2xl" type="button" @click="render('settings')">⚙️</button>
			</div>
		</nav>
	</div>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
