<template>
	<li
		ref="container"
		class="flex overflow-x-hidden items-center list-record justify-between py-2 px-3 relative"
	>
		<slot />
		<button v-if="withDelete" class="" @click="$emit('delete')">🗑️</button>
	</li>
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineEmits(['delete']);
defineProps({
	withDelete: {
		tyqpe: Boolean,
		default: false,
	},
});
const container = ref<HTMLElement | null>(null);
</script>
