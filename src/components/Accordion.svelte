<script lang="ts">
    import { noPaginasSliderNanoStore, selectedGenresNanoStore } from '@/nanostores';
    import { SlidersHorizontal, ChevronDown, Check  } from '@lucide/svelte';
    import { slide } from "svelte/transition";
    
    type FilterOptions = "" | "pages" | "genres";

    let isOpen = $state(false);
    let selectedFilter: FilterOptions = $state("");

    function toggleFilter(filter: FilterOptions) {
        selectedFilter = selectedFilter === filter ? "" : filter;
    }

    function toggleAccordion() {
        isOpen = !isOpen;
    }

    let { slidingNumber, genres } = $props();
</script>

<div class="bg-slate-dark-200 dark:bg-slate-dark-400 border border-[#222222] rounded-lg w-[90vw] md:w-[500px] overflow-hidden">
    <!-- Filters Accordion Trigger -->
    <button
        aria-label="toggleAccordion"
        class="text-lg p-6 md:p-4 w-full flex justify-between items-center cursor-(--cursorPointer) text-neutral-700 dark:text-neutral-100 hover:bg-slate-dark-600 dark:hover:bg-slate-dark-500 border-b border-[#222222]"
        onclick={(e) => { 
            e.stopPropagation(); 
            toggleAccordion();
        }}
    >
        Filters
        <SlidersHorizontal class="transition-transform duration-200 {isOpen === true ? 'rotate-180' : ''}" />
    </button>

    <!-- Filters Content -->
    {#if isOpen === true}
        <div transition:slide={{ duration: 300 }} class="py-3 space-y-4 text-zinc-300">
        <!-- Filter by Pages -->
            <div class="w-full">
                <button
                class="text-lg p-6 md:p-4 w-full flex justify-between cursor-(--cursorPointer) text-neutral-700 dark:text-neutral-100 hover:bg-slate-dark-600 dark:hover:bg-slate-dark-500 {selectedFilter === "pages" ? 'border-b border-[#222222]' : ''}"
                onclick={(e) => { 
                    e.stopPropagation(); 
                    toggleFilter("pages");
                }}
                >
                    Filter by Pages
                    <ChevronDown class="transition-transform duration-200 {selectedFilter === "pages" ? 'rotate-180' : ''}" />
                </button>
                {#if selectedFilter === "pages"}
                    <div transition:slide={{ duration: 300 }} class="pl-4 pt-2">
                        {@render slidingNumber()}
                    </div>
                {/if}
            </div>

            <!-- Filter by Genre -->
            <div class="w-full">
                <button
                class="text-lg p-6 md:p-4 w-full flex justify-between cursor-(--cursorPointer) text-neutral-700 dark:text-neutral-100 hover:bg-slate-dark-600 dark:hover:bg-slate-dark-500 {selectedFilter === "genres" ? 'border-b border-[#222222]' : ''}"
                onclick={(e) => { 
                    e.stopPropagation(); 
                    toggleFilter("genres");
                }}
                >
                    Filter by Genre
                    <ChevronDown class="transition-transform duration-200 {selectedFilter === "genres" ? 'rotate-180' : ''}" />
                </button>
                {#if selectedFilter === "genres"}
                    <div transition:slide={{ duration: 400 }} class="pl-4 pt-2">
                        {#each genres as genre}
                            <label class="flex items-center gap-2 cursor-(--cursorPointer)">
                                <div class="relative flex items-center justify-center h-5 w-5">
                                    <input 
                                        type="checkbox"
                                        class="peer appearance-none h-5 w-5 cursor-(--cursorPointer) bg-slate-dark-600 dark:bg-slate-dark-500 hover:bg-slate-dark-800 rounded border border-[#222222] transition"
                                        name="genres"
                                        value={genre}
                                        bind:group={$selectedGenresNanoStore}
                                    />
                                    <Check class="absolute h-4 w-4 text-orange-900 pointer-events-none hidden peer-checked:block" strokeWidth={2.5} />
                                </div>
                                <span class="cursor-(--cursorPointer) text-neutral-700 dark:text-neutral-100 text-lg">{genre}</span>
                            </label>
                        {/each}
                    </div>
                {/if}
            </div>
            <button
                class="text-lg p-6 md:p-4 w-full flex justify-between cursor-(--cursorPointer) text-neutral-700 dark:text-neutral-100 hover:bg-slate-dark-600 dark:hover:bg-slate-dark-500"
                type="button"
                aria-label="Reset Filters Button"
                onclick={(e) => {
                    e.stopPropagation();
                    noPaginasSliderNanoStore.set(1500);
                    selectedGenresNanoStore.set([]);
                }}
            >
                Reset filters
            </button>
        </div>
    {/if}
</div>

