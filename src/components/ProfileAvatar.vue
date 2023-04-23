<template>
	<div class="w-13 h-13 bg-gray-100 rounded-full overflow-hidden">
		<img class="w-full h-full object-cover" :src="icon" alt="Profile" />
	</div>
</template>

<script setup lang="ts">
defineProps({
	icon: {
		type: String,
		default: 'https://loremflickr.com/640/360',
	},
});
</script>
