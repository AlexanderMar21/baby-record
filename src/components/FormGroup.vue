<template>
	<div class="form-group">
		<label class="form" for="time">{{ label }}</label>
		<slot />
	</div>
</template>

<script setup lang="ts">
defineProps({
	label: {
		type: String,
		default: 'Label',
	},
	for: {
		type: String,
		default: undefined,
	},
});
</script>

<style scoped></style>
