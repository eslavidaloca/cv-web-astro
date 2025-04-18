<script lang="ts">
	import { noPaginasSliderNanoStore, selectedGenresNanoStore, lectureListNanoStore } from '@/nanostores';
	import { onMount } from 'svelte';
	
    import Accordion from '@/components/Accordion.svelte';
	import CardImage from '@/components/pages/side-projects/CardImage.svelte';

    import type { Book } from '@/interfaces/Book'

	let lectureList: Book[] = $state([]);
	let genres: string[] = $state([]);

	let books: Book[] = $state([]);
	let filteredBooks: Book[] = $state([]);
	let isLoaded = $state(false);

	let { data, modal, drawer, slidingNumber } = $props();

	const getBooks = async (): Promise<Book[]> => {
		try {
			const allBooks = data.library.map((item: any) => item.book as Book);

			return allBooks;
		} catch (error) {
			console.error('Error:', error);
			return [];
		}
	};
	const getGenres = (): void => {
		try {
			genres = books.reduce((uniqueGenre: string[], item) => {
				if (!uniqueGenre.includes(item.genre)) {
					uniqueGenre.push(item.genre);
				}
				return uniqueGenre;
			}, []);
		} catch (err) {
			console.log(`Error: ${err}`);
		}
	};
	const filterBooks = (): void => {
		try {
			const lectureBooks = lectureListNanoStore.get(); // Obtener el array de libros en lectura

			filteredBooks = books
				.filter((book) => !lectureBooks.includes(book.title)) // Excluir libros ya en lectura
				.filter((book) => selectedGenresNanoStore.get().length === 0 || selectedGenresNanoStore.get().includes(book.genre))
				.filter((book) => book.pages <= noPaginasSliderNanoStore.get());

			lectureList = books
				.filter((book) => lectureBooks.includes(book.title)); // Actualizar la lista de libros en lectura

		} catch (error) {
			console.error('Error:', error);
		}
	};

	async function loadBooks() {
		if (!isLoaded && books.length === 0) {
			const result = await getBooks();
			books = result;
			getGenres();
			filteredBooks = books;
			isLoaded = true;
		}
	}

	onMount(() => {
		loadBooks();
	});

	noPaginasSliderNanoStore.subscribe(() => filterBooks());
	selectedGenresNanoStore.subscribe(() => filterBooks());
	lectureListNanoStore.subscribe(() => filterBooks());
</script>

<svelte:head>
	<title>Svelte Library Store - Side Projects</title>
</svelte:head>

<!-- Contenido central de la página -->
<div class="flex flex-col justify-center relative max-w-2xl mx-auto  items-center">
    <div class="absolute top-0.5 w-[300px] h-48 overflow-hidden">
		<div class="absolute left-1/2 -top-16 -translate-x-1/2 h-16 w-16 bg-tomato-700 dark:bg-zinc-400 blur-2xl"></div>
    </div>
    
    <div class="w-full flex justify-center">
    <div class="h-0.5 w-[600px] bg-zinc-700/80 rounded-full"></div>
    </div>
    
    <div class="text-5xl mt-18 text-orange-900 tracking-tight text-center">
    Svelte Library Store
    </div>
</div>

<div class="flex flex-col justify-center mt-3">
	
	<div class="grid grid-cols-1 mt-5 space-x-4">
		<span class="md:text-2xl text-2xl text-primary-500 dark:text-secondary-500">
			<span>
				{filteredBooks.length} Available Books
			</span>
			<span class="mx-2 text-zinc-700/80">|</span>
			<span class="mr-2">
				{lectureList.length} Books in Lecture List
			</span>
			{@render drawer()}
		</span>
	</div>
	<div class="flex justify-center mt-6">
		<Accordion slidingNumber={slidingNumber} genres={genres}/>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
		{#each filteredBooks as book}
			<CardImage bind:filteredBooks {book} addToLecture={true} modal={modal}/>
		{/each}
	</div>
</div>
