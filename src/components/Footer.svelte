<script>
	import { page } from '$app/stores';
	import Logo from '$lib/assets/logo.png';
</script>

<footer class="w-full px-6 py-0 text-gray-300 md:px-12 lg:px-20">
	<div class="mx-auto grid grid-cols-1 gap-0 text-center md:grid-cols-3 md:gap-0 lg:gap-32">
		<!-- Brand -->
		<div class="mx-auto flex max-w-[200px] flex-col items-start md:max-w-full">
			<img src={Logo} alt="logo" class="" />
		</div>

		<div class="flex justify-around items-start md:col-span-2 py-8 lg:py-0">
			<!-- Quick Links -->
			<div class="flex flex-col space-y-2 lg:text-[20px] lg:mt-16">
				<h3 class="mb-2 text-xl font-semibold text-white">Explore</h3>
				<a
					href="/"
					class="transition duration-300 hover:text-[#306b86]
				{$page.url.pathname === '/' ? 'text-[#306b86]' : ''}">Home</a
				>
				<a
					href="/work"
					class="transition duration-300 hover:text-[#306b86]
				{$page.url.pathname === '/work' ? 'text-[#306b86]' : ''}">Work</a
				>
				<a
					href="/about"
					class="transition duration-300 hover:text-[#306b86]
				{$page.url.pathname === '/about' ? 'text-[#306b86]' : ''}">About</a
				>
				<a
					href="/contact"
					class="transition duration-300 hover:text-[#306b86]
				{$page.url.pathname === '/contact' ? 'text-[#306b86]' : ''}">Contact</a
				>
				<a
					href="/events"
					class="transition duration-300 hover:text-[#306b86]
				{$page.url.pathname === '/events' ? 'text-[#306b86]' : ''}">Events</a
				>
			</div>

			<!-- Contact & Socials -->
			<div class="mt-10 flex flex-col space-y-3 lg:text-xl lg:mt-16">
				<h3 class="mb-2 text-xl font-semibold text-white">Get in Touch</h3>
				<a href="mailto:hello@ezergallery.com" class="transition duration-300 hover:text-[#306b86]">
					ezergallery@gmail.com
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
		</div>
	</div>

	<!-- Bottom Line -->
	<div class="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-500">
		&copy; {new Date().getFullYear()} Ezergallery. All rights reserved.
	</div>
</footer>
