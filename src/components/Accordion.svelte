<script lang="ts">
    // import { ChevronDown } from "lucide-svelte";
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
</script>

<div class="bg-[#0a0a0a] border border-[#222222] rounded-lg w-[90vw] md:w-[500px] overflow-hidden">
    {#each accordionContent as block, index}
        <div class="w-full">
            <button 
                aria-label="openAccordion"
                class="p-6 md:p-4 w-full flex justify-between text-[#EEEEE4] cursor-pointer hover:bg-[#070707] {index !== accordionContent.length - 1 || selectedAccordion === index ? 'border-b border-[#222222]' : ''}"
                onclick={() => selectedAccordion = selectedAccordion === index ? -1 : index}
            >
                {block.category}
                <!-- <ChevronDown class="transition-transform duration-200 {selectedAccordion === index ? 'rotate-180' : ''}" /> -->
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
                </div>
            {/if}
        </div>
    {/each}
</div>