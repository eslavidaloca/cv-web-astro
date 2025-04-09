<script lang="ts">
    
    import data from '@/data/pages/side-projects/svelte-library-store/books.json';
	// import data from '../data/books.json';
	import type { Writable } from 'svelte/store';
	import { lectureListNanoStore, noPaginasSliderNanoStore, selectedGenresNanoStore } from '@/nanostores';

	import CardImage from '@/components/pages/side-projects/CardImage.svelte';

	// import { localStorageStore } from '@skeletonlabs/skeleton';
	// import { RangeSlider } from '@skeletonlabs/skeleton';
	// import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	// import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	// import CardImage from '$lib/components/cardImage.svelte';
	// import { openDrawer } from '$lib/components/drawerSkeleton.svelte';

    import type { Book } from '@/interfaces/Book'

	let books: Book[] = [];
	let lectureList: Book[] = [];
	let genres: string[] = [];

	// const lectureListStore: Writable<Book[]> = localStorageStore('lectureList', []);
	// const noPaginasSlider: Writable<number> = localStorageStore('noPaginasSlider', 1500);
	// const selectedGenres: Writable<string[]> = localStorageStore('selectedGenres', []);

	const getBooks = async (): Promise<void> => {
		try {
			books = data.library.map((item: any) => item.book as Book);
			const lectureTitles = lectureListNanoStore.get(); // Obtener el array de títulos de los libros en lectura
			books = books.filter((item) => !lectureTitles.includes(item.title)); // Comparar los títulos de libros
			getGenres();
			filterBooks();
		} catch (error) {
			console.error('Error:', error);
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
			// Obtener el array de títulos de los libros en lectura
			const lectureTitles = lectureListNanoStore.get();

			// Filtrar los libros según los géneros seleccionados y el valor del slider
			books = data.library
				.map((item) => item.book as Book)
				.filter((item) => !lectureTitles.includes(item.title)) // Excluir los libros en lectura
				.filter((item) => selectedGenresNanoStore.get().length === 0 || selectedGenresNanoStore.get().includes(item.genre)) // Filtrar por géneros
				.filter((item) => item.pages <= noPaginasSliderNanoStore.get()); // Filtrar por el valor del slider

			lectureList = lectureList
				.filter((item) => selectedGenresNanoStore.get().length === 0 || selectedGenresNanoStore.get().includes(item.genre)) // Filtrar por géneros
				.filter((item) => item.pages <= noPaginasSliderNanoStore.get()); // Filtrar por el valor del slider
		} catch (error) {
			console.error('Error:', error);
		}
	};


	// noPaginasSlider.subscribe(() => filterBooks());
	// selectedGenres.subscribe(() => filterBooks());
	// lectureListStore.subscribe(() => getBooks());
</script>

<svelte:head>
	<title>Svelte Library - Side Projects</title>
</svelte:head>

<!-- //Boton de lista de lectura -->

<div class="flex justify-end">
	<!-- <button
		id="lectureList"
		type="button"
		class="btn btn-lg md:btn-xl text-white bg-primary-500 dark:bg-secondary-500 rotated-btn"
		on:click={() => {
			alert('Lista de lectura');
		}}
	>
		Lista de lectura
	</button> -->
	<slot name="drawer"></slot>
</div>

<!-- //Contenido central de la página -->
<div class="relative max-w-2xl mx-auto flex flex-col items-center">
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
	{#await getBooks() then}
		<div class="grid grid-cols-1 mt-5 space-x-4">
			<span class="md:text-2xl text-2xl text-primary-500 dark:text-secondary-500">
				<span>
					{books.length} Libros disponibles
				</span>
				<span class="mx-2 text-zinc-700/80">|</span>
				<span>
					{lectureList.length} Libros en lectura
				</span>
			</span>
			<!-- <Accordion
				hover="hover:bg-primary-500 dark:hover:bg-secondary-500 hover:text-white w-28 sm:w-6/12 md:w-7/12 lg:w-10/12 xl:w-11/12"
			>
				<AccordionItem regionControl="bg-primary-500 dark:bg-secondary-500 text-white">
					<svelte:fragment slot="summary">Filtros</svelte:fragment>
					<svelte:fragment slot="content">
						<AccordionItem autocollapse>
							<svelte:fragment slot="summary">Filtrar por páginas</svelte:fragment>
							<svelte:fragment slot="content">
								<RangeSlider
									name="range-slider"
									bind:value={$noPaginasSlider}
									max={1500}
									step={10}
									ticked
									accent="bg-primary-500 dark:bg-secondary-500 text-primary-500 dark:text-secondary-500"
									class="w-28 sm:w-6/12 md:w-7/12 lg:w-10/12 xl:w-11/12"
								>
									<svelte:fragment slot="trail">{$noPaginasSlider}</svelte:fragment>
								</RangeSlider>
							</svelte:fragment>
						</AccordionItem>
						<AccordionItem autocollapse>
							<svelte:fragment slot="summary">Filtrar por generos</svelte:fragment>
							<svelte:fragment slot="content">
								<ListBox
									multiple
									hover="hover:bg-primary-500 dark:hover:bg-secondary-500 hover:text-white w-28 sm:w-6/12 md:w-7/12 lg:w-10/12 xl:w-11/12"
								>
									{#each genres as genre}
										<ListBoxItem bind:group={$selectedGenres} name="medium" value={genre}
											>{genre}</ListBoxItem
										>
									{/each}
								</ListBox>
							</svelte:fragment>
						</AccordionItem>
						<div class="flex-1">
							<button
								class="hover:bg-primary-500 dark:hover:bg-secondary-500 rounded-3xl w-full p-2 pl-4 text-left"
								type="button"
								on:click={() => {
									noPaginasSlider.set(1500);
									selectedGenres.set([]);
								}}>Limpiar filtros</button
							>
						</div>
					</svelte:fragment>
				</AccordionItem>
			</Accordion> -->
		</div>
		<!-- <div class="grid grid-cols-4 mt-5 space-x-4">
			{#each books as book}
				<CardImage bind:books {book} addToLecture={true} />
			{/each}
		</div> -->
	{/await}
</div>

<style>
	#lectureList {
		position: fixed;
		transform: rotate(-90deg);
		top: 15vh;
	}
	.rotated-btn {
		height: 3rem;
		width: 10rem;
		margin-right: -4rem;
	}
	@media (min-width: 320px) {
		.rotated-btn {
			height: 2.5rem;
			width: 12rem;
			margin-right: -5.3rem;
		}
	}
	@media (min-width: 768px) {
		.rotated-btn {
			height: 4rem;
			width: 15rem;
			margin-right: -6rem;
		}
	}
</style>
