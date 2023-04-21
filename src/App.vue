<script setup lang="ts">
import MilkRecorder from './components/MilkRecorder.vue';
</script>

<template>
	<div class="max-h-100vh py-2 px-3">
		<MilkRecorder />
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
