<script>
	import { onMount } from 'svelte';
	import { client, urlFor } from '$lib/sanity';
	import Portrait from '$lib/assets/portrait.webp';
	import Bloodlust from '$lib/assets/Blood lust.webp';
	import Brand from '$lib/assets/brand.webp';
	import Photographer from '$lib/assets/Tissue-Empire.webp';
	import Wande from '$lib/assets/wande.webp';
	import Train from '$lib/assets/train.webp';

	let featuredProducts = [];
	let featuredSectionTitle = "Shop prints";
	let loading = true;

	onMount(async () => {
		try {
			// Fetch featured products configuration
			const data = await client.fetch(`*[_type == "featuredProducts"] | order(displayOrder asc) [0] {
				title,
				products[]-> {
					_id,
					title,
					"slug": slug.current,
					price,
					image,
					description,
					availability
				}
			}`);

			if (data && data.products) {
				featuredSectionTitle = data.title || "Shop prints";
				featuredProducts = data.products.map(product => ({
					...product,
					id: product._id,
					image: product.image ? urlFor(product.image).width(800).url() : ''
				}));
			}

			console.log('✅ Featured products loaded:', featuredProducts.length);
		} catch (error) {
			console.error('❌ Error loading featured products:', error);
			featuredProducts = [];
		} finally {
			loading = false;
		}
	});
</script>

<main class="flex flex-col gap-y-48 px-5 py-20 lg:px-20">
	<!--====================== hero ======================-->
	<section
		class="relative z-10 -mx-5 -mt-20 flex h-[850px] flex-col items-center justify-center gap-10 bg-[url('/src/lib/assets/Realization.webp')] bg-cover bg-center bg-no-repeat text-center lg:-mx-20"
	>
		<!-- Overlay -->
		<div class="absolute inset-0 bg-black/50"></div>
		<!-- Content -->
		<div class="relative z-10 max-w-3xl px-6">
			<h1 class="mb-6 text-5xl leading-tight font-light md:text-6xl">
				Through my lens, I tell stories that live beyond the frame
			</h1>
			<p class="mb-8 text-lg text-gray-300 md:text-xl">
				EZERGALLERY captures emotion, identity, and memory through powerful visual storytelling.
				Each image is a piece of the human experience — raw, vulnerable, and real.
			</p>
			<a
				href="/store"
				class="inline-block rounded-xl bg-[#306b86] px-8 py-4 text-lg font-medium text-white
			 transition-transform duration-300 hover:scale-105 hover:bg-[#b8d6ee] hover:text-black"
			>
				Explore the Gallery
			</a>
		</div>
	</section>
	<!--================ about ====================-->
	<section class="flex flex-col gap-10 text-center">
		<h2 class="text-[45px] capitalize">About EZERGALLERY</h2>
		<div class="flex flex-col items-center text-center lg:flex-row">
			<!-- Left side image -->
			<div class="max-h-[700px] flex-shrink-0 overflow-hidden">
				<img
					src={Photographer}
					alt="girl holding a camera"
					class="max-w-full transform transition-transform duration-900 ease-in-out hover:scale-[1.02] lg:w-[600px] 2xl:w-[900px]"
				/>
			</div>

			<!-- Right side text block -->
			<div
				class="shadow-[0_0_10px_-3px_rgba(0, 0, 0, 0.5)] relative z-50 flex w-full flex-col gap-5 bg-[#0d0d0d] px-5 py-20 font-normal md:p-20 lg:-ml-32"
			>
				<h2 class="text-[30px] text-white">
					EZERGALLERY is more than photography, it’s storytelling through emotion, memory, and
					truth, where every frame reveals the strength, vulnerability, and essence of the human
					soul.
				</h2>
				<p class="text-[16px] text-gray-200">
					I create images that speak from a place of honesty and lived experience. My work is deeply
					personal, blending art, identity, and raw human connection. Every portrait, every frame,
					is an invitation to feel, to reflect, and to see yourself in a new light.
				</p>
				<button class="mx-auto mt-8"
					><a
						href="/contact"
						class="rounded-2xl bg-[#306b86] px-6 py-5 text-[16px] font-semibold transition duration-500 hover:bg-[#b8d6ee] hover:text-[#000000]"
						>Read My Story</a
					>
				</button>
			</div>
		</div>
	</section>
	<!--======================== service section =====================-->
	<section class="flex flex-col justify-center gap-10 text-center">
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
						Conceptual and intentional imagery designed to evoke thought and emotion. Each piece
						tells a story that goes beyond aesthetics, it captures feeling, memory, and truth.
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
						Visual storytelling for brands experience with Lisa Folawiyo, Invougue, BRITA, Wanda
						Esan and iStan Label.
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
		<button class="mx-auto mt-8 text-center"
			><a
				href="/work"
				class="rounded-2xl bg-[#306b86] px-6 py-5 text-[16px] font-semibold transition duration-500 ease-in-out hover:scale-105 hover:bg-[#b8d6ee] hover:text-[#000000]"
				>View all services</a
			>
		</button>
	</section>
	<!--=========== Shop Prints ==================================-->
	<section class="flex flex-col gap-10 pb-20 text-center">
	<h2 class="text-[45px] capitalize">{featuredSectionTitle}</h2>

	{#if loading}
		<div class="text-gray-500">Loading products...</div>
	{:else if featuredProducts.length === 0}
		<div class="text-gray-500">No featured products available</div>
	{:else}
		<section class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each featuredProducts as product}
				<a
					href={`/store/${product.slug}`}
					class="group overflow-hidden shadow-lg transition hover:shadow-2xl"
				>
					<div class="h-[500px]">
						<img src={product.image} alt={product.title} class="h-full w-full object-cover" />
					</div>
					<div class="p-4">
						<h2 class="text-3xl font-normal transition group-hover:text-[#306b86]">
							{product.title}
						</h2>
						<p class="text-[16px] text-gray-600">₦{product.price.toLocaleString()}.00</p>
					</div>
				</a>
			{/each}
		</section>
	{/if}

	<button class="mx-auto mt-8">
		<a
			href="/store"
			class="rounded-2xl bg-[#306b86] px-6 py-5 text-[16px] font-semibold transition duration-500 ease-in-out hover:scale-105 hover:bg-[#b8d6ee] hover:text-[#000000]"
		>
			View all collection
		</a>
	</button>
</section>
</main>
