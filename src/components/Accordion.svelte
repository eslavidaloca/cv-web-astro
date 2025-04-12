<script lang="ts">
    import { SlidersHorizontal, ChevronDown } from '@lucide/svelte';
    import { slide } from "svelte/transition";
    let selectedAccordion = $state(-1);

    let accordionContent = [
        {
            category: "Filters",
            items: [
                { title: "Introduction"},
                { title: "Installation"},
                { title: "Quick Start"}
            ]
        },
        // {
        //     category: "Components",
        //     items: [
        //         { title: "Buttons"},
        //         { title: "Forms"},
        //         { title: "Modals"},
        //         { title: "Navigation"}
        //     ]
        // },
        // {
        //     category: "Other",
        //     items: [
        //         { title: "Privacy Policy"},
        //         { title: "Svelte Rocks"}
        //     ]
        // }
    ];

    let { slidingNumber } = $props();
</script>

<div class="bg-slate-dark-1000 dark:bg-slate-dark-400 border border-[#222222] rounded-lg w-[90vw] md:w-[500px] overflow-hidden">
    {#each accordionContent as block, index}
        <div class="w-full">
            <button 
                aria-label="openAccordion"
                class="p-6 md:p-4 w-full flex justify-between text-[#EEEEE4] cursor-pointer hover:bg-[#070707] {index !== accordionContent.length - 1 || selectedAccordion === index ? 'border-b border-[#222222]' : ''}"
                onclick={() => selectedAccordion = selectedAccordion === index ? -1 : index}
            >
                {block.category}
                <SlidersHorizontal class="transition-transform duration-200 {selectedAccordion === index ? 'rotate-180' : ''}" />
            </button>
            
            {#if selectedAccordion === index}
                <div transition:slide={{ duration: 300 }} class="px-4 py-3 space-y-2 text-zinc-300 {index !== accordionContent.length - 1 ? 'border-b border-[#222222]' : ''}">
                    {#each block.items as item, i}
                        <button 
                            class="block hover:text-[#EEEEE4] md:py-0 py-2"
                        >
                            {item.title}
                        </button>
                    {/each}
                    {@render slidingNumber()}
                </div>
            {/if}
        </div>
    {/each}
    
    <!-- {#each accordionContent as block, index}
        <div class="w-full">
            <button 
                aria-label="openAccordion"
                class="p-6 md:p-4 w-full flex justify-between text-[#EEEEE4] cursor-pointer hover:bg-[#070707] {index !== accordionContent.length - 1 || selectedAccordion === index ? 'border-b border-[#222222]' : ''}"
                onclick={() => selectedAccordion = selectedAccordion === index ? -1 : index}
            >
                {block.category}
                <ChevronDown class="transition-transform duration-200 {selectedAccordion === index ? 'rotate-180' : ''}" />
            </button>
            
            {#if selectedAccordion === index}
                <div transition:slide={{ duration: 300 }} class="px-4 py-3 space-y-2 text-zinc-300 {index !== accordionContent.length - 1 ? 'border-b border-[#222222]' : ''}">
                    {#each block.items as item, i}
                        <button 
                            class="block hover:text-[#EEEEE4] md:py-0 py-2"
                        >
                            {item.title}
                        </button>
                    {/each}
                    {@render slidingNumber()}
                </div>
            {/if}
        </div>
    {/each} -->

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

<!-- <script lang="ts">
    import { slide } from "svelte/transition";
    let selectedFilter = $state("");
    let { slidingNumber } = $props();

    const genres = ["Fiction", "Non-fiction", "Science Fiction"];

    function toggleFilter(filter: string) {
        selectedFilter = selectedFilter === filter ? "" : filter;
    }
</script>

<div class="bg-slate-dark-1000 dark:bg-slate-dark-400 border border-[#222222] rounded-lg w-[90vw] md:w-[500px] overflow-hidden">
    //Filters Accordion Trigger
    <button
        aria-label="toggleFilters"
        class="p-6 md:p-4 w-full flex justify-between items-center text-[#EEEEE4] cursor-pointer hover:bg-[#070707] border-b border-[#222222]"
        onclick={() => toggleFilter("filters")}
    >
        Filters
    </button>

    //Filters Content
    {#if selectedFilter === "filters"}
        <div transition:slide class="px-4 py-3 space-y-4 text-zinc-300">
        //Filter by Pages
            <div>
                <button
                class="block w-full text-left text-lg font-semibold hover:text-[#EEEEE4]"
                onclick={() => toggleFilter("pages")}
                >
                Filter by Pages
                </button>
                {#if selectedFilter === "pages"}
                    <div class="pl-4 pt-2">
                        {@render slidingNumber()}
                    </div>
                {/if}
            </div>

            //Filter by Genre
            <div>
                <button
                class="block w-full text-left text-lg font-semibold hover:text-[#EEEEE4]"
                onclick={() => toggleFilter("genre")}
                >
                    Filter by Genre
                </button>
                {#if selectedFilter === "genre"}
                    <ul class="pl-4 pt-2 space-y-1">
                    {#each genres as genre}
                        <li>
                            <button class="hover:text-[#EEEEE4]">{genre}</button>
                        </li>
                    {/each}
                    </ul>
                {/if}
            </div>
        </div>
    {/if}
</div>
-->
