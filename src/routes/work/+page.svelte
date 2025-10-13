<script>
	import { fade, scale } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Portrait from '$lib/assets/portrait.webp';
	import Bloodlust from '$lib/assets/Blood lust.webp';
	import Brand from '$lib/assets/brand.webp';
	import Sunset from '$lib/assets/Sunset.webp';
	import { client, urlFor } from '$lib/sanity';

	// Static albums from your local assets
	let staticAlbums = [
		{
			cover: '/assets/Do you miss me like I miss you.webp',
			images: [
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
			]
		},
		{
			cover: '/assets/wande/Image 1.webp',
			images: [
				'/assets/wande/Image 1.webp',
				'/assets/wande/Image 2.webp',
				'/assets/wande/Image 4.webp',
				'/assets/wande/Image 5.webp',
				'/assets/wande/Image 6.webp',
				'/assets/wande/Image 7.webp',
				'/assets/wande/Image 8.webp',
				'/assets/wande/Image 9.webp',
				'/assets/wande/Image 10.webp',
				'/assets/wande/Image 12.webp',
				'/assets/wande/Image 13.webp',
				'/assets/wande/Image 14.webp',
				'/assets/wande/Image 15.webp',
				'/assets/wande/Image 16.webp'
			]
		},
		{
			cover: '/assets/lisa/Image 1.webp',
			images: [
				'/assets/lisa/Image 1.webp',
				'/assets/lisa/Image 2.webp',
				'/assets/lisa/Image 3.webp',
				'/assets/lisa/Image 4.webp',
				'/assets/lisa/Image 5.webp',
				'/assets/lisa/Image 6.webp',
				'/assets/lisa/Image 7.webp',
				'/assets/lisa/Image 8.webp',
				'/assets/lisa/Image 9.webp',
				'/assets/lisa/Image 10.webp',
				'/assets/lisa/Image 11.webp',
				'/assets/lisa/Image 12.webp',
				'/assets/lisa/Image 13.webp',
				'/assets/lisa/Image 14.webp',
				'/assets/lisa/Image 15.webp',
				'/assets/lisa/Image 16.webp',
				'/assets/lisa/Image 17.webp',
				'/assets/lisa/Image 18.webp',
				'/assets/lisa/Image 19.webp',
				'/assets/lisa/Image 20.webp',
				'/assets/lisa/Image 21.webp',
				'/assets/lisa/Image 22.webp',
				'/assets/lisa/Image 23.webp',
				'/assets/lisa/Image 24.webp'
			]
		},
		{
			cover: '/assets/remy/Image 2.webp',
			images: [
				'/assets/remy/Image 1 .webp',
				'/assets/remy/Image 2.webp',
				'/assets/remy/Image 3.webp',
				'/assets/remy/Image 4.webp',
				'/assets/remy/Image 5.webp',
				'/assets/remy/Image 6.webp',
				'/assets/remy/Image 7.webp',
				'/assets/remy/Image 8.webp',
				'/assets/remy/Image 9.webp',
				'/assets/remy/Image 10.webp',
				'/assets/remy/Image 11.webp',
				'/assets/remy/Image 12.webp',
				'/assets/remy/Image 13.webp',
				'/assets/remy/Image 14.webp',
				'/assets/remy/Image 15.webp',
				'/assets/remy/Image 16.webp',
				'/assets/remy/Image 17.webp',
				'/assets/remy/Image 18.webp',
				'/assets/remy/Image 19.webp',
				'/assets/remy/Image 20.webp',
				'/assets/remy/Image 21.webp',
				'/assets/remy/Image 22.webp',
				'/assets/remy/Image 23.webp',
				'/assets/remy/Image 24.webp',
				'/assets/remy/Image 25.webp',
				'/assets/remy/Image 26.webp',
				'/assets/remy/Image 27.webp',
				'/assets/remy/Image 28.webp',
				'/assets/remy/Image 30.webp',
				'/assets/remy/Image 31.webp',
				'/assets/remy/Image 32.webp',
				'/assets/remy/Image 33.webp',
				'/assets/remy/Image 34.webp',
				'/assets/remy/Image 35.webp',
				'/assets/remy/Image 36.webp',
				'/assets/remy/Image 37.webp',
				'/assets/remy/Image 38.webp',
				'/assets/remy/Image 39.webp',
				'/assets/remy/Image 40.webp',
				'/assets/remy/Image 41.webp',
				'/assets/remy/Image 42.webp',
				'/assets/remy/Image 43.webp',
				'/assets/remy/Image 44.webp',
				'/assets/remy/Image 45.webp',
				'/assets/remy/Image 46.webp',
				'/assets/remy/Image 47.webp',
				'/assets/remy/Image 48.webp',
				'/assets/remy/Image 49.webp',
				'/assets/remy/Image 50.webp'
			]
		},
		{
			cover: '/assets/gold skin/Bride.webp',
			images: [
				'/assets/gold skin/Bride.webp',
				'/assets/gold skin/DanteyX.webp',
				'/assets/gold skin/GSSantos1.webp',
				'/assets/gold skin/Image 2 copy 3.webp',
				'/assets/gold skin/Image 4.webp',
				'/assets/gold skin/Image 6.webp',
				'/assets/gold skin/Seleri 1.webp',
				'/assets/gold skin/Sun God copy.webp',
				'/assets/gold skin/Sun God 2 copy.webp'
			]
		},
		{
			cover: '/assets/midnight/Compromise.webp',
			images: [
				'/assets/midnight/Compromise.webp',
				'/assets/midnight/Flame.webp',
				'/assets/midnight/Reddish.webp',
				'/assets/midnight/ppjpg copy.webp',
				'/assets/midnight/Hammerhead Entity.webp',
				'/assets/midnight/Mary Magdalene .webp',
				'/assets/midnight/The demon of cynicism.webp',
				'/assets/midnight/The demon of disillusionment.webp',
				'/assets/midnight/The demon of judgmentalism copy.webp',
				'/assets/midnight/The demon of shortsightedness.webp',
				'/assets/midnight/The demon of judgmentalism.webp'
			]
		},
		{
			cover: '/assets/FredXEzer/BDpaint.webp',
			images: [
				'/assets/FredXEzer/BDpaint 2.webp',
				'/assets/FredXEzer/BDpaint 4.webp',
				'/assets/FredXEzer/BDpaint 5.webp',
				'/assets/FredXEzer/BDpaint.webp',
				'/assets/FredXEzer/No Trading.webp'
			]
		},
		{
			cover: '/assets/vibrant-colors/Afro futurism.webp',
			images: [
				'/assets/vibrant-colors/Afro futurism.webp',
				'/assets/vibrant-colors/Agbero.webp',
				'/assets/vibrant-colors/Blindfolded.webp',
				'/assets/vibrant-colors/Female energy.webp',
				'/assets/vibrant-colors/Gold eyes.webp',
				'/assets/vibrant-colors/Green eye god.webp',
				'/assets/vibrant-colors/Kaliat_s cross 7.webp',
				'/assets/vibrant-colors/Rock bottom.webp',
				'/assets/vibrant-colors/Sunset.webp',
				'/assets/vibrant-colors/Concentrated.webp'
			]
		}
	];

	let albums = staticAlbums; // Start with static albums
	let currentAlbum = null;
	let currentIndex = 0;
	let loading = true;

	// Fetch albums from Sanity
	onMount(async () => {
		try {
			console.log('🔄 Fetching albums from Sanity...');

			const data = await client.fetch(`*[_type == "album"]{
				title,
				coverImage,
				gallery
			}`);

			console.log('📦 Raw Sanity data:', data);

			if (data && data.length > 0) {
				// Transform Sanity albums
				const sanityAlbums = data.map(album => {
					console.log('Processing album:', album.title);
					return {
						title: album.title,
						cover: album.coverImage ? urlFor(album.coverImage).width(800).url() : '',
						images: album.gallery?.map(img => urlFor(img).width(1200).url()) || []
					};
				});

				// Combine with static albums
				albums = [...staticAlbums, ...sanityAlbums];

				console.log('✅ Success! Total albums:', albums.length);
				console.log('📊 Static:', staticAlbums.length, '+ Sanity:', sanityAlbums.length);
			} else {
				console.log('⚠️ No albums found in Sanity');
			}

		} catch (error) {
			console.error('❌ Error fetching from Sanity:', error);
			console.error('Error details:', error.message);
		} finally {
			loading = false;
		}

		// Keyboard navigation
		if (browser) {
			window.addEventListener('keydown', handleKey);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKey);
		}
	});

	function openLightbox(albumIndex) {
		currentAlbum = albums[albumIndex];
		currentIndex = 0;
	}

	function closeLightbox() {
		currentAlbum = null;
		currentIndex = 0;
	}

	function prevImage() {
		if (currentAlbum) {
			currentIndex = (currentIndex - 1 + currentAlbum.images.length) % currentAlbum.images.length;
		}
	}

	function nextImage() {
		if (currentAlbum) {
			currentIndex = (currentIndex + 1) % currentAlbum.images.length;
		}
	}

	function handleKey(e) {
		if (currentAlbum) {
			if (e.key === 'ArrowLeft') prevImage();
			if (e.key === 'ArrowRight') nextImage();
			if (e.key === 'Escape') closeLightbox();
		}
	}
</script>

<!--=============== hero =================-->

<!-- <section class="max-w-[1200px] mx-auto grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-20 gap-y-10 px-5 pb-20 lg:px-20">
	<div class="max-h-[500px] w-full overflow-hidden">
		<img src={Sunset} alt="Last Chapter" class="h-full w-full object-contain" />
	</div>
	<div>
		<h2
			class="pb-5 text-[30px] font-semibold tracking-tight text-[#b8d6ee] lg:text-[45px] lg:tracking-wide"
		>
			The Art of Seeing Beyond the Surface
		</h2>
		<p class="pb-5 text-[20px] lg:pb-10">
			Every image begins with a feeling. My work is not just about what the eye can see but what the
			heart remembers. At EZERGALLERY, each photograph is born from curiosity, emotion, and truth,
			capturing the quiet in-between moments that often go unnoticed. This collection is an
			invitation to pause, to feel, and to see beauty where life meets imperfection. Whether it’s a
			fleeting glance, a shadow, or a story told through light, every frame here is part of a larger
			conversation about what it means to be human.
		</p>
	</div>
</section> -->
<section
	class="relative z-10 flex h-[750px] flex-col items-center justify-center gap-10 bg-[url('/src/lib/assets/Sunset.webp')] bg-cover bg-center bg-no-repeat text-center"
>
	<!-- Overlay -->
	<div class="absolute inset-0 bg-black/70"></div>
	<!-- Content -->
	<div class="relative z-10 max-w-3xl px-6">
		<h1 class="mb-6 text-5xl leading-tight font-light md:text-6xl">
			The Art of Seeing Beyond the Surface
		</h1>
		<p class="mb-8 text-lg text-gray-300 md:text-xl">
			Every image begins with a feeling. My work is not just about what the eye can see but what the
			heart remembers. At EZERGALLERY, each photograph is born from curiosity, emotion, and truth,
			capturing the quiet in-between moments that often go unnoticed. This collection is an
			invitation to pause, to feel, and to see beauty where life meets imperfection. Whether it’s a
			fleeting glance, a shadow, or a story told through light, every frame here is part of a larger
			conversation about what it means to be human.
		</p>
		<a
			href="#collections"
			class="inline-block rounded-xl bg-[#306b86] px-8 py-4 text-lg font-medium text-white
			 transition-transform duration-300 hover:scale-105 hover:bg-[#b8d6ee] hover:text-black"
		>
			Explore Our Collections
		</a>
	</div>
</section>

<!--===================== my collections ====================-->
<section id="collections" class="flex min-h-screen flex-col gap-y-10 px-5 py-20 lg:px-20">
	<h1 class="mx-auto text-[35px] font-normal capitalize lg:text-[54px]">My Collections</h1>
	<!-- Album Grid -->
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each albums as album, i}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="group relative cursor-pointer" on:click={() => openLightbox(i)}>
				<div class="h-[600px] overflow-hidden object-cover md:h-[500px] 2xl:h-[600px]">
					<img
						src={album.cover}
						alt="album cover"
						class="h-full w-full object-cover object-center"
					/>
				</div>
				<!-- Hover overlay -->
				<div
					class="absolute inset-0 flex items-center justify-center
               rounded-xl bg-blue-500/50 opacity-0 transition duration-500 group-hover:opacity-100"
				>
					<span class="text-5xl font-bold text-white">+</span>
				</div>
			</div>
		{/each}
	</div>

	<!-- Lightbox -->
	{#if currentAlbum}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
			transition:fade
			on:click={closeLightbox}
		>
			<div
				class="relative flex h-full w-full items-center justify-center px-6"
				on:click|stopPropagation
			>
				<!-- Prev Button -->
				<button
					class="absolute left-6 text-[80px] font-light text-black transition duration-500 hover:text-[#306b86] md:text-[#fff]"
					on:click={prevImage}
				>
					‹
				</button>

				<!-- Current Image -->
				<div class="">
					<img
						src={currentAlbum.images[currentIndex]}
						alt="large view"
						class="mx-auto max-h-[90vh] w-full max-w-4xl shadow-xl"
						transition:scale={{ duration: 900 }}
					/>
				</div>
				<!-- Next Button -->
				<button
					class="absolute right-6 text-[80px] font-light text-black transition duration-500 hover:text-[#306b86] md:text-white"
					on:click={nextImage}
				>
					›
				</button>

				<!-- Close Button -->
				<button
					class="absolute top-6 right-6 text-2xl font-normal text-white transition duration-500 hover:text-[#306b86]"
					on:click={closeLightbox}
				>
					✕
				</button>
			</div>
		</div>
	{/if}
</section>
<!--======================== service section =====================-->
<section class="flex flex-col justify-center gap-10 gap-y-10 px-5 py-20 pb-40 text-center lg:px-20">
	<h2 class="text-[45px] capitalize">Services</h2>
	<div class="justify-betweeen flex flex-col gap-10 md:grid md:grid-cols-2 lg:grid-cols-3">
		<div class="overflow-hidden text-center">
			<a href="/work/Portrait-Photography" class=" block w-full overflow-hidden">
				<div class="h-[500px] overflow-hidden lg:h-[400px] 2xl:h-[600px]">
					<img
						alt="portrait"
						src={Portrait}
						class="h-full w-full transform object-cover transition duration-500 ease-in-out hover:scale-[1.01] hover:brightness-55"
					/>
				</div>
				<h2 class="mt-5 text-[30px] font-[400] uppercase md:text-[25px] xl:text-[30px]">
					Portrait photography
				</h2>
				<p class="text-[18px] font-[400]">
					Raw and expressive portraits that highlight individuality, identity, and presence. Every
					shot is personal, honest, and deeply human.
				</p>
			</a>
		</div>
		<div class="text-center">
			<a href="/work/Art-Photography" class=" block">
				<div class="h-[500px] overflow-hidden lg:h-[400px] 2xl:h-[600px]">
					<img
						alt="Blood lust"
						src={Bloodlust}
						class="h-full w-full transform object-cover transition duration-500 ease-in-out hover:scale-[1.01] hover:brightness-55"
					/>
				</div>
				<h2 class="mt-5 text-[30px] font-[400] uppercase md:text-[25px] xl:text-[30px]">
					Art photography
				</h2>
				<p class="text-[18px] font-[400]">
					Conceptual and intentional imagery designed to evoke thought and emotion. Each piece tells
					a story that goes beyond aesthetics, it captures feeling, memory, and truth.
				</p>
			</a>
		</div>
		<div class="text-center">
			<a href="/work/Brand-Collaboration" class="block overflow-hidden">
				<div class="h-[500px] overflow-hidden lg:h-[400px] 2xl:h-[600px]">
					<img
						alt="brand"
						src={Brand}
						class="h-full w-full transform object-cover transition duration-500 ease-in-out hover:scale-[1.01] hover:brightness-55"
					/>
				</div>
				<h2 class="mt-5 text-[30px] font-[400] uppercase md:text-[25px] xl:text-[30px]">
					Brand collaborattion
				</h2>
				<p class="text-[18px] font-[400]">
					Visual storytelling for brands experience with Lisa Folawiyo, Invougue, BRITA, Wanda Esan
					and iStan Label.
				</p>
			</a>
		</div>
		<!-- <div class="text-center">
			<a href="/work" class="block overflow-hidden">
				<div class="h-[500px] overflow-hidden lg:h-[400px] 2xl:h-[600px]">
					<img
						alt="Wande Portrait"
						src={Wande}
						class="h-full w-full transform object-cover transition duration-500 ease-in-out hover:scale-[1.01] hover:brightness-55"
					/>
				</div>
				<h2 class="mt-5 text-[30px] font-[400] uppercase md:text-[25px] xl:text-[30px]">
					Exhibitions & Prints
				</h2>
				<p class="font-[400] text-[1p8x]">
					Developing curated works for shows, installations, and private collections.
				</p>
			</a>
		</div>
		<div class="text-center">
			<a href="/work" class="block overflow-hidden">
				<div class="h-[500px] overflow-hidden lg:h-[400px] 2xl:h-[600px]">
					<img
						alt="Train brand"
						src={Train}
						class="h-full w-full transform object-cover transition duration-500 ease-in-out hover:scale-[1.01] hover:brightness-55"
					/>
				</div>
				<h2 class="mt-5 text-[30px] font-[400] uppercase md:text-[25px] xl:text-[30px]">
					Workshops / Collaborations
				</h2>
				<p class="text-[18px] font-[400]">
					Community projects and creative partnerships with other artists, designed to share
					knowledge, inspire, and build connection.
				</p>
			</a>
		</div> -->
	</div>
</section>
