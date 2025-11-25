<script>
	import { page } from '$app/stores';
	import { slide, fade } from 'svelte/transition';
	let isOpen = false;
	let showDropdown = false;

	function slideFade(node, params) {
		return {
			delay: params.delay || 0,
			duration: params.duration || 300,
			css: (t) => {
				const slideY = (1 - t) * 8; // small upward movement
				const opacity = t;
				return `
					transform: translateY(${slideY}px);
					opacity: ${opacity};
				`;
			}
		};
	}
</script>

<!-- Hamburger Button -->
<button
	class="z-50 flex cursor-pointer flex-col space-y-1.5 xl:hidden"
	on:click={() => (isOpen = !isOpen)}
	aria-label="Toggle Menu"
>
	<span class="block h-0.5 w-6 bg-white transition-all" class:rotate-45={isOpen}></span>
	<span class="block h-0.5 w-6 bg-white transition-all" class:opacity-0={isOpen}></span>
	<span class="block h-0.5 w-6 bg-white transition-all" class:-rotate-45={isOpen}></span>
</button>

<!-- Mobile Menu -->
{#if isOpen}
	<div
		class="fixed inset-0 z-40 flex flex-col items-center justify-center
               space-y-6 bg-[#0d0d0d] text-2xl font-[500] text-white uppercase"
	>
		<!-- ✅ Each link has underline on hover/active -->
		<a
			href="/"
			class="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px]
			       after:w-full after:origin-left after:scale-x-0 after:bg-[#306b86]
			       after:transition-transform after:duration-300 hover:text-[#306b86]
			       hover:after:scale-x-100
			       {$page.url.pathname === '/' ? 'text-[#306b86] after:scale-x-100' : ''}"
			on:click={() => (isOpen = false)}
		>
			HOME
		</a>

		<!-- ✅ Work dropdown -->

		<div
			class="flex items-center justify-between p-2 text-[14px] text-gray-300 uppercase transition-all duration-300 hover:text-[#306b86]"
		>
			<!-- Work link (navigates to /work) -->
			<a
				href="/work"
				class="relative pb-1 text-2xl font-[500] after:absolute after:bottom-0
			       after:left-0 after:h-[2px] after:w-full after:origin-left
			       after:scale-x-0 after:bg-[#306b86] after:transition-transform
			       after:duration-300 hover:text-[#306b86] hover:after:scale-x-100
			       {$page.url.pathname.startsWith('/work') ? 'text-[#306b86] after:scale-x-100' : ''}"
				on:click={() => (isOpen = false)}>Work</a
			>

			<!-- Dropdown arrow (toggles submenu) -->
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button
				type="button"
				on:click={() => (showDropdown = !showDropdown)}
				class="p-1 focus:outline-none"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 transition-transform duration-300 {showDropdown
						? 'rotate-180 text-[#306b86]'
						: ''}"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</button>
		</div>

		<!-- Dropdown items -->
		{#if showDropdown}
			<ul class="mt-1 space-y-1 border-l border-gray-700 pl-6">
				<li>
					<a href="/work/Art-Photography" class="block py-1 text-gray-400 hover:text-[#306b86]"
					on:click={() => (isOpen = false)}
						>Art Photography</a
					>
				</li>
				<li>
					<a href="/work/Portrait-Photography" class="block py-1 text-gray-400 hover:text-[#306b86]"
					on:click={() => (isOpen = false)}
						>Portrait Photography</a
					>
				</li>
				<li>
					<a href="/work/Brand-Collaboration" class="block py-1 text-gray-400 hover:text-[#306b86]"
					on:click={() => (isOpen = false)}
						>Brand Collaboration</a
					>
				</li>
			</ul>
		{/if}

		<!-- Other Links -->
		<a
			href="/store"
			class="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px]
			       after:w-full after:origin-left after:scale-x-0 after:bg-[#306b86]
			       after:transition-transform after:duration-300 hover:text-[#306b86]
			       hover:after:scale-x-100
			       {$page.url.pathname === '/store' ? 'text-[#306b86] after:scale-x-100' : ''}"
			on:click={() => (isOpen = false)}
		>
			BUY PRINTS
		</a>

		<a
			href="/about"
			class="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px]
			       after:w-full after:origin-left after:scale-x-0 after:bg-[#306b86]
			       after:transition-transform after:duration-300 hover:text-[#306b86]
			       hover:after:scale-x-100
			       {$page.url.pathname === '/about' ? 'text-[#306b86] after:scale-x-100' : ''}"
			on:click={() => (isOpen = false)}
		>
			ABOUT
		</a>

		<a
			href="/contact"
			class="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px]
			       after:w-full after:origin-left after:scale-x-0 after:bg-[#306b86]
			       after:transition-transform after:duration-300 hover:text-[#306b86]
			       hover:after:scale-x-100
			       {$page.url.pathname === '/contact' ? 'text-[#306b86] after:scale-x-100' : ''}"
			on:click={() => (isOpen = false)}
		>
			BOOK A PHOTOSHOOT
		</a>

		<a
			href="/events"
			class="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px]
			       after:w-full after:origin-left after:scale-x-0 after:bg-[#306b86]
			       after:transition-transform after:duration-300 hover:text-[#306b86]
			       hover:after:scale-x-100
			       {$page.url.pathname === '/events' ? 'text-[#306b86] after:scale-x-100' : ''}"
			on:click={() => (isOpen = false)}
		>
			EVENTS
		</a>

		<div class="mx-auto mt-3 flex items-center space-x-4">
			<a href="#" aria-label="Instagram" class="transition duration-300 hover:text-[#306b86]">
				<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm4.75-2a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"
					/>
				</svg>
			</a>

			<a href="#" aria-label="Twitter" class="transition duration-300 hover:text-[#306b86]">
				<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16 4a4.28 4.28 0 0 0-4.18 5.26A12.14 12.14 0 0 1 3.15 5.1a4.28 4.28 0 0 0 1.33 5.7 4.25 4.25 0 0 1-1.94-.54v.05a4.29 4.29 0 0 0 3.44 4.2 4.3 4.3 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.97A8.58 8.58 0 0 1 2 19.54 12.07 12.07 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.36 8.36 0 0 0 22.46 6z"
					/>
				</svg>
			</a>

			<a href="#" aria-label="Facebook" class="transition duration-300 hover:text-[#306b86]">
				<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H8v-2.88h2.5V9.41c0-2.47 1.48-3.84 3.74-3.84 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.23 0-1.62.76-1.62 1.55v1.86H16l-.4 2.88h-2.2v6.99A10 10 0 0 0 22 12z"
					/>
				</svg>
			</a>
		</div>
	</div>
{/if}
