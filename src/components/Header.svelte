<script>
	import Logo from '$lib/assets/logo.png';
	import { page } from '$app/stores';
	import MobileNav from './MobileNav.svelte';
	let isWorkOpen = false;
	import { isSearchOpen } from '$lib/stores/searchStore';
	import { isCartOpen, cartCount } from '$lib/stores/cartStore';
</script>

<nav class="flex items-center justify-between bg-[#0d0d0d] px-5 py-4 text-white shadow-md lg:px-20">
	<!-- Logo -->
	<div class=" font-bold">
		<a href="/"><img alt="logo" src={Logo} class="w-16 md:w-32" /></a>
	</div>

	<!-- Nav Links -->
	<ul class="hidden items-center space-x-16 xl:flex">
		<li>
			<a
				href="/"
				class="relative p-2 text-[14px]
		       {$page.url.pathname === '/' ? 'text-[#306b86] after:w-full' : 'text-gray-300'}
		       after:absolute after:bottom-0 after:left-0 after:h-[2px]
		       after:w-0 after:bg-[#306b86] after:transition-all
		       after:duration-300 after:content-[''] hover:text-[#306b86] hover:after:w-full"
			>
				HOME
			</a>
		</li>

		<!-- WORK with Dropdown -->
		<li class="group relative">
			<div class="flex items-center gap-1">
				<a
					href="/work"
					class="relative p-2 text-[14px]
		       {($page.url.pathname.startsWith('/work'))  ? 'text-[#306b86] after:w-full' : 'text-gray-300'}
		       uppercase after:absolute after:bottom-0 after:left-0
		       after:h-[2px] after:w-0 after:bg-[#306b86]
		       after:transition-all after:duration-300 after:content-[''] hover:text-[#306b86] hover:after:w-full"
				>
					Work
				</a>
				<!-- Dropdown Arrow -->
				<svg
					class="ml-1 h-4 w-4 text-gray-400 transition-transform duration-300 group-hover:rotate-180 group-hover:text-[#306b86]"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</div>

			<ul
				class="absolute top-full left-0 z-50 mt-2 hidden w-[250px] flex-col rounded-md bg-white shadow-lg transition-all duration-500 group-hover:flex"
			>
				<li>
					<a
						href="/work/Portrait-Photography"
						class="block px-4 py-3 text-[16px] font-semibold text-gray-800 hover:bg-[#f0f5f8] hover:text-[#306b86]"
						>Portrait Photography</a
					>
				</li>
				<li>
					<a
						href="/work/Art-Photography"
						class="block px-4 py-3 text-[16px] font-semibold text-gray-800 hover:bg-[#f0f5f8] hover:text-[#306b86]"
						>Art Photography</a
					>
				</li>
				<li>
					<a
						href="/work/Brand-Collaboration"
						class="block px-4 py-3 text-[16px] font-semibold text-gray-800 hover:bg-[#f0f5f8] hover:text-[#306b86]"
						>Brand Collaboration</a
					>
				</li>
			</ul>
		</li>

		<li>
			<a
				href="/store"
				class="relative p-2 text-[14px]
        {$page.url.pathname === '/store' ? 'text-[#306b86] after:w-full' : 'text-gray-300'}
        after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#306b86] after:transition-all after:duration-300 after:content-[''] hover:text-[#306b86] hover:after:w-full"
				>BUY PRINTS</a
			>
		</li>
		<li>
			<a
				href="/about"
				class="relative p-2 text-[14px]
		       {$page.url.pathname === '/about' ? 'text-[#306b86] after:w-full' : 'text-gray-300'}
		       after:absolute after:bottom-0 after:left-0 after:h-[2px]
		       after:w-0 after:bg-[#306b86] after:transition-all
		       after:duration-300 after:content-[''] hover:text-[#306b86] hover:after:w-full"
			>
				ABOUT
			</a>
		</li>
		<li>
			<a
				href="/contact"
				class="relative p-2 text-[14px]
        {$page.url.pathname === '/contact' ? 'text-[#306b86] after:w-full' : 'text-gray-300'}
        after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#306b86] after:transition-all after:duration-300 after:content-[''] hover:text-[#306b86] hover:after:w-full"
				>BOOK A PHOTOSHOOT</a
			>
		</li>
		<li>
			<a
				href="/events"
				class="relative p-2 text-[14px]
        {$page.url.pathname === '/events' ? 'text-[#306b86] after:w-full' : 'text-gray-300'}
        after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#306b86] after:transition-all after:duration-300 after:content-[''] hover:text-[#306b86] hover:after:w-full"
				>EVENTS</a
			>
		</li>
	</ul>

	<!-- Icons -->
	<div class="flex items-center -space-x-1 md:space-x-2">
		<!-- Search Icon -->
		<button aria-label="Search" on:click={() => isSearchOpen.set(true)} class="hidden md:block">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 hover:text-[#306b86]"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
				/>
			</svg>
		</button>
		<!-- Cart Icon with Counter -->
		<button
			aria-label="Cart"
			class="relative transition duration-100 hover:text-[#306b86]"
			on:click={() => isCartOpen.set(true)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 md:w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2L17 13M7 13h10M10 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z"
				/>
			</svg>

			{#if $cartCount > 0}
				<span
					class="absolute top-0 right-1 flex h-5 w-5 items-center justify-center
      rounded-full bg-[#306b86] text-xs font-bold text-white"
				>
					{$cartCount}
				</span>
			{/if}
		</button>
		<MobileNav />
	</div>
</nav>
