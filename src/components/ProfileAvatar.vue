<template>
	<div class="w-15 h-15 bg-gray-100 rounded-full overflow-hidden">
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
