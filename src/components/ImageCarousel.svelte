<script>
	import { onMount } from 'svelte';
	import { client, urlFor } from '$lib/sanity';

	const localImages = [
		'/assets/Arrival copy.webp',
		'/assets/Caught.webp',
		'/assets/Colourful dreams.webp',
		'/assets//Do you miss me like I miss you.webp',
		'/assets/ppjpg copy.webp',
		'/assets/The Lioness Stands Still.webp',
		'/assets/Fish Boy.webp',
		'/assets/Kiishi.webp',
		'/assets/KUWE.webp',
		'/assets/Misunderstanding.webp',
		'/assets/Nameless beauty.webp',
		'/assets/She who speaks with fire.webp',
		'/assets/Pothead Attention copy.webp',
		'/assets/Tara 3.webp',
		'/assets/Waiting Glitch.webp'
	];

	let combinedImages = [...localImages];
	let container;
	let loading = true;

	// ✅ Fetch images from Sanity
	onMount(async () => {
		try {
			const sanityImages = await client.fetch(`*[_type == "latestPhotography"]{
				image
			}`);

			console.log('Sanity images:', sanityImages);

			// Convert Sanity images to URLs
			const sanityUrls = sanityImages
				.filter(img => img.image) // Only process if image exists
				.map(img => urlFor(img.image).width(1200).url());

			console.log('Sanity URLs:', sanityUrls); 

			// Combine with local images
			combinedImages = [...localImages, ...sanityUrls, ...localImages];
		} catch (error) {
			console.error('Error fetching Sanity images:', error);
		} finally {
			loading = false;
			startAutoScroll();
		}
	});

	// ✅ Auto-scroll + Drag functionality
	function startAutoScroll() {
		if (!container) return;

		let scrollSpeed = 0.3;
		let raf;
		let isDragging = false;
		let startX, scrollLeft;

		const step = () => {
			if (!isDragging && container) {
				container.scrollLeft += scrollSpeed;
				if (container.scrollLeft >= container.scrollWidth / 2) {
					container.scrollLeft = 0;
				}
			}
			raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);

		const startDrag = (e) => {
			isDragging = true;
			container.classList.add('cursor-grabbing');
			startX = (e.pageX || e.touches?.[0]?.pageX) - container.offsetLeft;
			scrollLeft = container.scrollLeft;
		};

		const moveDrag = (e) => {
			if (!isDragging) return;
			const x = (e.pageX || e.touches?.[0]?.pageX) - container.offsetLeft;
			const walk = x - startX;
			container.scrollLeft = scrollLeft - walk;
		};

		const endDrag = () => {
			isDragging = false;
			container.classList.remove('cursor-grabbing');
		};

		container.addEventListener('mousedown', startDrag);
		container.addEventListener('mousemove', moveDrag);
		container.addEventListener('mouseup', endDrag);
		container.addEventListener('mouseleave', endDrag);
		container.addEventListener('touchstart', startDrag, { passive: true });
		container.addEventListener('touchmove', moveDrag, { passive: true });
		container.addEventListener('touchend', endDrag);
	}
</script>

<!-- ✅ Slider -->
{#if loading}
	<div class="py-20 text-center">
		<p class="text-xl text-gray-400">Loading images...</p>
	</div>
{:else}
	<div
		bind:this={container}
		class="scrollbar-hide relative flex w-full cursor-grab space-x-4 overflow-x-auto select-none"
	>
		{#each combinedImages as img}
			<img src={img} alt="slider" class="h-[600px] w-auto flex-shrink-0 object-cover" />
		{/each}
	</div>
{/if}

<style>
	/* Hide scrollbars */
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>