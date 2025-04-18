<!-- <script lang='ts'>
	// import { modalStore } from '@skeletonlabs/skeleton';
	// import type { ModalSettings } from '@skeletonlabs/skeleton';
    // import type { Writable } from 'svelte/store';
	// import { localStorageStore } from '@skeletonlabs/skeleton';

	// import type { Book } from '$lib/interfaces/book.interface.svelte';
	import type { Book } from '@/interfaces/Book'

	// const lectureList: Writable<Book[]> = localStorageStore('lectureList', []);
	let helperList: Book[];

	let { filteredBooks = $bindable([]), book, addToLecture = false, modal } = $props();

    async function toggleBookList(book: Book): Promise<void> {
		if(addToLecture) {
			
			new Promise<boolean>((resolve) => {
				// const modal: ModalSettings = {
				// 	type: 'confirm',
				// 	// Data
				// 	title: 'Escoja una opcion',
				// 	body: '¿Desea agregar este libro a su lista de lectura?',
				// 	response: (r: boolean) => {
				// 		resolve(r);
				// 	}
				// };
				// modalStore.trigger(modal);
			}).then((r: boolean) => {
				if (r) {
					// Obtener el valor actual de lectureList suscribiéndose al store
					// const unsubscribe = lectureList.subscribe((value) => (helperList = value));
					// Actualizar el store lectureList con el nuevo array que incluye el título del libro
					// lectureList.set([...helperList, book]);
					// Desuscribirse después de actualizar el valor del store
					// unsubscribe();
					//Delete the book from books
					filteredBooks = filteredBooks.filter((item) => item.title !== book.title);
				}
			});
		}
		else{

			new Promise<boolean>((resolve) => {
				// const modal: ModalSettings = {
				// 	type: 'confirm',
				// 	// Data
				// 	title: 'Escoja una opcion',
				// 	body: '¿Desea regresar este libro a los libros disponibles?',
				// 	response: (r: boolean) => {
				// 		resolve(r);
				// 	}
				// };
				// modalStore.trigger(modal);
			}).then((r: boolean) => {
				if (r) {
					// Obtener el valor actual de lectureList suscribiéndose al store
					// const unsubscribe = lectureList.subscribe((value) => (helperList = value));
					// Actualizar el store lectureList para quitar el libro del array
					helperList = helperList.filter((item) => item.title !== book.title);
					// lectureList.set(helperList);
					// Desuscribirse después de actualizar el valor del store
					// unsubscribe();
					//Delete the book from books
					filteredBooks = filteredBooks.filter((item) => item.title !== book.title);
				}
			});
		}

	}
</script>

<div 
	aria-label="CardBook"
	role="button"
	tabindex="0"
	class="card card-hover bg-primary-500 shadow-secondary-500 dark:bg-secondary-900 dark:shadow-red-700 m-4 cursor-pointer" 
	onclick={() => {
		toggleBookList(book).catch(error => {
			console.error('Error:', error);
		});
	}} 
	onkeydown={(event) => {
		if (event.key === "Enter" || event.key === " ") {
			toggleBookList(book);
		}
	}}>
		<section>
			<img class="object-scale-down" src={book.cover} alt={book.title} />
		</section>
</div>

<style>
	.card {
		max-width: 80%;
		max-height: 25rem; /* Establece una altura fija para el contenedor */
		padding: 1rem;
		margin-bottom: 2rem;
	}

	.card:hover {
		transition: ease-in-out 0.4s;
		transform: scale(1.10);
	}

	.card img {
		width: 100%;
		display: flex;
		object-fit: scale-down; /* Ajusta la imagen para que llene el contenedor sin perder proporción*/
		border-radius: 0.5rem;
	}
</style> -->

<script lang="ts">
	import CardBody from '@/components/animations/ThreeDCardEffect/CardBody.svelte';
	import CardContainer from '@/components/animations/ThreeDCardEffect/CardContainer.svelte';
	import CardItem from '@/components/animations/ThreeDCardEffect/CardItem.svelte';

	let { filteredBooks = $bindable([]), book, addToLecture = false, modal } = $props();

	let isMouseEntered = $state(false);
</script>


<div class="cardo">
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
				<!-- <img
					src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					height="1000"
					width="1000"
					class="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
					alt="thumbnail"
				/> -->
				<img class="object-cover" src={book.cover} alt={book.title} />
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
				<!-- <CardItem
					{isMouseEntered}
					translateZ={20}
					className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
				>
					Sign up
				</CardItem> -->
			</div>
		</CardBody>
	</CardContainer>
</div>

<style>
	.cardo {
		max-width: 80%;
		/* max-height: 25rem; Establece una altura fija para el contenedor // Previous version */
		padding: 1rem;
		transition: transform ease-in 0.4s;
	}

	.cardo:hover {
		transform: scale(1.10);
	}

	.cardo img {
		width: 100%;
	}
</style>