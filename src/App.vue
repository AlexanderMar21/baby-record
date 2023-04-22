<script setup lang="ts">
import { ref } from 'vue';
import MilkRecorder from './components/MilkRecorder.vue';
import SettingsView from './components/SettingsView.vue';
import WeightTracker from './components/WeightTracker.vue';
const comp = ref('milk');
const renderOptions = {
	milk: MilkRecorder,
	settings: SettingsView,
	weight: WeightTracker,
};

const render = (com: string) => {
	comp.value = com;
};
</script>

<template>
	<div class="max-h-100vh py-2 px-3 max-w-440px mx-auto pb-70px">
		<component :is="renderOptions[comp]" />
		<nav class="fixed left-0 right-0 py-3 px-4 bottom-0 border-t border-gray-400 flex bg-white z-2">
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
