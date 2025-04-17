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

<script lang='ts'>
	// import { modalStore } from '@skeletonlabs/skeleton';
	// import type { ModalSettings } from '@skeletonlabs/skeleton';
    // import type { Writable } from 'svelte/store';
	// import { localStorageStore } from '@skeletonlabs/skeleton';

	// import type { Book } from '$lib/interfaces/book.interface.svelte';
	import type { Book } from '@/interfaces/Book'

	// const lectureList: Writable<Book[]> = localStorageStore('lectureList', []);
	let helperList: Book[];

    export let books: Book[] = [];
	export let book: Book;
	export let addToLecture: boolean = false;

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
					books = books.filter((item) => item.title !== book.title);
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
					books = books.filter((item) => item.title !== book.title);
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
</style>