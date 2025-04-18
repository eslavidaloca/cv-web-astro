<script lang="ts">
	import { Hand } from '@lucide/svelte';
	import { draggable,  } from '@neodrag/svelte';
	import type { DragOptions } from '@neodrag/svelte';
	import { isDraggingNanoStore } from "@/nanostores.ts"

	import CardBody from '@/components/animations/ThreeDCardEffect/CardBody.svelte';
	import CardContainer from '@/components/animations/ThreeDCardEffect/CardContainer.svelte';
	import CardItem from '@/components/animations/ThreeDCardEffect/CardItem.svelte';

	let { filteredBooks = $bindable([]), book, addToLecture = false, modal } = $props();

	let isMouseEntered = $state(false);

	let options: DragOptions = { 
		applyUserSelectHack: true,
		ignoreMultitouch: true,
		cancel: '.cancel'
	};
</script>
<div
class="cardDiv cursor-(--cursorHand) active:cursor-(--cursorGrab)"
use:draggable={options}
on:neodrag:start={() => isDraggingNanoStore.set(true)}
on:neodrag:end={() => isDraggingNanoStore.set(false)}
>
	<CardContainer bind:isMouseEntered className="inter-var">
		<CardBody
			className="bg-slate-dark-200 dark:bg-slate-dark-400 relative group/card hover:shadow-2xl hover:shadow-tomato-700/[0.4] dark:hover:shadow-2xl dark:hover:shadow-zinc-400/[0.4] dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  "
		>
			<CardItem
				{isMouseEntered}
				translateZ="50"
				className="text-xl font-bold text-neutral-700 dark:text-white"
			>
				{book.title}
			</CardItem>
			<CardItem
				{isMouseEntered}
				translateZ="60"
				className="text-neutral-500 dark:text-neutral-300 text-sm max-w-sm mt-2"
			>
				{book.author.name}
			</CardItem>
			<CardItem
				{isMouseEntered}
				translateZ="60"
				className="text-neutral-500 dark:text-neutral-300 text-left text-sm max-w-sm mt-2"
			>
				{book.synopsis}
			</CardItem>
			<CardItem {isMouseEntered} translateZ="100" className="w-full mt-4">
				<img class="object-cover cancel cursor-(--cursorDefault)" src={book.cover} alt={book.title} />
			</CardItem>
			<div class="mt-10 flex items-center justify-between">
				<CardItem
					{isMouseEntered}
					translateZ={20}
					className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
				>
					{book.pages} pages
				</CardItem>
				<CardItem
					{isMouseEntered}
					translateZ={20}
					className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
				>
				Genre: {book.genre}
				</CardItem>
			</div>
		</CardBody>
	</CardContainer>
</div>

<style>
	.cardDiv {
		max-width: 80%;
		/* max-height: 25rem; Establece una altura fija para el contenedor // Previous version */
		padding: 1rem;
		transition: transform ease-in 0.4s;
		/* cursor: var(--cursorPointer); */
	}

	.cardDiv:hover {
		transform: scale(1.10);
	}

	.cardDiv:active {
		transform: scale(0.70) translateY(-15rem) translateX(0.5rem);
		z-index: 1000;
	}

	.cardDiv img {
		width: 100%;
	}
</style>