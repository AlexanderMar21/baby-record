<template>
	<li
		ref="container"
		class="flex overflow-x-hidden items-center list-record justify-between py-1 px-2 relative"
	>
		<slot />
	</li>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const container = ref<HTMLElement | null>(null);
</script>
