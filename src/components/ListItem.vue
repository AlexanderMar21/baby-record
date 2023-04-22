<template>
	<li
		ref="container"
		class="flex overflow-x-hidden items-center list-record justify-between py-2 px-3 relative"
	>
		<slot />
	</li>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const container = ref<HTMLElement | null>(null);
</script>
