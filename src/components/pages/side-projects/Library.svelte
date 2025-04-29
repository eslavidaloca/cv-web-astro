<script lang="ts">
	import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
	import { AlertCircle } from "@lucide/svelte";
	import { noPaginasSliderNanoStore, selectedGenresNanoStore, lectureListNanoStore } from '@/nanostores';
	
    import Accordion from '@/components/Accordion.svelte';
	import CardImage from '@/components/pages/side-projects/CardImage.svelte';

    import { type Book } from '@/interfaces/Book.ts';

	let books           : Book[]   = $state([]);
	let filteredBooks   : Book[]   = $state([]);
	let lectureList     : Book[]   = $state([]);
	let genres          : string[] = $state([]);
	let isLoaded        : boolean  = $state(false);
	let clickOnImageFlag: boolean  = $state(false);

	let { data, modal, shiny, drawer, slidingNumber } = $props();

	let ropeElement: HTMLElement; // Referencia al elemento webp
  	let containerElement: HTMLElement; // Referencia al contenedor (opcional)
	let isDraggingRope = false; // Estado para saber si se está arrastrando la cuerda
	let startYRope = 0;
	let movedEnough4Rope = false;
	let oldVersion = false;

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
				.filter((book) => !lectureBooks.some((item) => item.ISBN === book.ISBN)) // Excluir libros ya en lectura
				.filter((book) => selectedGenresNanoStore.get().length === 0 || selectedGenresNanoStore.get().includes(book.genre))
				.filter((book) => book.pages <= noPaginasSliderNanoStore.get());

			lectureList = books
				.filter((book) => lectureBooks.some((item) => item.ISBN === book.ISBN)); // Actualizar la lista de libros en lectura

		} catch (error) {
			console.error('Error:', error);
		}
	};

	async function loadBooks() {
		if (!isLoaded && books.length === 0) {
			const result = await getBooks();
			books = result;
			getGenres();
			filterBooks();
			isLoaded = true;
		}
	}
	
	noPaginasSliderNanoStore.subscribe(() => filterBooks());
	selectedGenresNanoStore.subscribe(() => filterBooks());
	lectureListNanoStore.subscribe(() => filterBooks());
	
	onMount(() => {
		loadBooks();

		if (!ropeElement) return; // Asegurarse de que el elemento exista

		const container = containerElement || document.body;
		const containerRect = container.getBoundingClientRect();
		const centerX = containerRect.left + containerRect.width / 2;
		const centerY = containerRect.top + containerRect.height / 2;

		const maxRotation = 1;
		const maxOffset = 7; // Para que no alcance a salir de la navbar

		const handleMousemove = (event: MouseEvent) => {
			if (!isDraggingRope) return; // Solo mover si está presionado el click

			const treshhold = event.clientY - startYRope;

			if (treshhold > 120) {
				movedEnough4Rope = true;
			}
			else{
				movedEnough4Rope = false;
			}

			const mouseX = event.clientX;
			const mouseY = event.clientY;

			const deltaX = mouseX - centerX;
			const deltaY = mouseY - centerY;

			const rotationX = (deltaY / centerY) * maxRotation;
			const rotationY = (deltaX / centerX) * -maxRotation;

			const offsetX = (deltaX / centerX) * maxOffset;
			const offsetY = (deltaY / centerY) * maxOffset;

			ropeElement.style.transform = `perspective(500px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) translate(${offsetX}px, ${offsetY}px)`;
		};

		const handleMousedown = (event: MouseEvent) => {
			isDraggingRope = true;
			startYRope = event.clientY;
			movedEnough4Rope = false;
		};
		
		const handleMouseup = () => {
			if (movedEnough4Rope){
				oldVersion = !oldVersion; // Change between versions
				console.log('Will change versions but not yet!');
			};
			
			// Reset variables
			isDraggingRope = false;
			startYRope = 0;
			movedEnough4Rope = false;

			// Bounce animation
			ropeElement.style.transition = 'transform 0.4s cubic-bezier(0.5, 2.4, 0.1, -0.5)';
			ropeElement.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) translate(0, 0)';
			
			// Quitamos la transición después de terminar para no afectar futuros movimientos
			setTimeout(() => { if (ropeElement) ropeElement.style.transition = ''; }, 200);
		};

		container.addEventListener('mousedown', handleMousedown);
		window.addEventListener('mouseup', handleMouseup);
		window.addEventListener('mousemove', handleMousemove);

		return () => {
			container.removeEventListener('mousedown', handleMousedown);
			window.removeEventListener('mouseup', handleMouseup);
			window.removeEventListener('mousemove', handleMousemove);
		};
	});

</script>

<svelte:head>
	<title>Svelte Library Store - Side Projects</title>
</svelte:head>

<div bind:this={containerElement} class="cuerda-container cursor-(--cursorHand) active:cursor-(--cursorGrab)">
	<img bind:this={ropeElement} draggable="false" id="cuerda_telon" src="/cuerda_telon.webp" alt="" class="absolute top-0 right-50 w-auto max-h-80 object-cover"/>
</div>

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
	{@render shiny()}
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
	{#key filteredBooks.length}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
			{#each filteredBooks as book}
				<CardImage bind:filteredBooks {book} modal={modal} clickOnImage={() => {
					clickOnImageFlag = true;
					setTimeout(() => {
						clickOnImageFlag = false;
					}, 4000);
				}}/>
			{/each}
		</div>
	{/key}
	{#if clickOnImageFlag}
	<div class="fixed bottom-4 right-4 z-50">
		<div
			transition:fly={{ x: 200, duration: 300 }}
			class="p-3 pr-4 rounded-lg border-4 border-orange-900 bg-background flex items-center space-x-3 shadow-lg"
		>
			<AlertCircle class="w-6 h-6 ml-1 flex-shrink-0 text-accent-foreground" strokeWidth={2.6}/>
			<div class="flex flex-col">
				<div class="text-left text-lg text-accent-foreground">Careful with the book!</div>
				<div class="text-neutral-500 dark:text-neutral-400 text-xs">
					Drag the book from the card, not from the image.
				</div>
			</div>
		</div>
	</div>

	{/if}

</div>
<style>
	#cuerda_telon {
		transition: transform 0.1s ease-out;
	}
</style>