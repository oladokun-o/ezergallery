<script>
	import { client, urlFor } from '$lib/sanity';
	import { onMount } from 'svelte';

	const staticImages = [
		{ src: '/assets/remy/Image 1 .webp', alt: 'remy' },
		{ src: '/assets/remy/Image 2.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 3.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 4.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 5.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 6.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 7.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 8.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 9.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 10.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 11.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 12.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 13.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 14.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 15.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 16.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 17.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 18.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 19.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 20.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 21.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 22.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 23.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 24.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 31.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 32.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 33.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 34.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 35.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 36.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 37.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 38.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 39.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 40.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 41.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 42.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 43.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 44.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 45.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 46.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 47.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 40.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 49.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 50.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 25.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 26.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 27.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 28.webp', alt: 'remy' },
		{ src: '/assets/remy/Image 30.webp', alt: 'remy' }
	];

	let imageList = staticImages;
	let loading = true;

	onMount(async () => {
		try {
			console.log(' Static brand:', staticImages.length);

			// Fetch portrait images from Sanity
			const data = await client.fetch(`*[_type == "brand"] | order(_createdAt desc) {
				_id,
				title,
				image
			}`);

			// Convert Sanity results
			const sanityImages = data.map((item) => ({
				id: item._id,
				src: item.image ? urlFor(item.image).width(1000).url() : '',
				alt: item.title || 'brand Image'
			}));

			console.log(' Sanity brand:', sanityImages.length);

			// Merge static and Sanity images
			imageList = [...staticImages, ...sanityImages];
		} catch (error) {
			console.error(' Error loading Sanity brand:', error);
			imageList = staticImages; // fallback
		} finally {
			loading = false;
		}
	});
</script>

<main class="mx-auto flex min-h-screen flex-col gap-y-20 px-5 py-20 pb-40 lg:px-20">
	<h2 class="text-center text-[45px] capitalize">Brand Collaboration</h2>

	{#if loading}
		<div class="py-20 text-center">
			<p class="text-xl">Loading products...</p>
		</div>
	{:else}
		<div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
			{#each imageList as image}
				<div class="h-[500px] overflow-hidden lg:h-[400px] 2xl:h-[600px]">
					<img
						src={image.src}
						alt={image.alt}
						class="h-full w-full transform object-cover transition duration-500 ease-in-out hover:scale-[1.02] hover:brightness-75"
					/>
				</div>
			{/each}
		</div>
	{/if}
</main>
