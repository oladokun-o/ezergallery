<script>
	import { onMount } from 'svelte';
	import { client, urlFor } from '$lib/sanity';

	let productList = [];
	let loading = true;

	onMount(async () => {
		try {
			// Fetch products from Sanity
			const data = await client.fetch(`*[_type == "product"] | order(_createdAt desc) {
				_id,
				title,
				"slug": slug.current,
				price,
				image,
				description,
				size,
				material,
				availability
			}`);

			// Transform Sanity products
			productList = data.map(product => ({
				...product,
				id: product._id,
				image: product.image ? urlFor(product.image).width(800).url() : ''
			}));

			console.log('✅ Total products:', productList.length);
		} catch (error) {
			console.error('❌ Error loading Sanity products:', error);
			productList = [];
		} finally {
			loading = false;
		}
	});
</script>

<main class="flex min-h-screen flex-col gap-y-10 px-5 py-20 lg:px-20">
	<h1 class="mx-auto text-[35px] font-normal capitalize lg:text-[54px]">Store</h1>

	{#if loading}
		<div class="text-center py-20">
			<p class="text-xl">Loading products...</p>
		</div>
	{:else}
		<section class="grid gap-8 p-6 md:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto">
			{#each productList as product}

				<a	href={`/store/${product.slug}`}
					class="group overflow-hidden shadow-lg transition hover:shadow-2xl"
				>
					<div class="h-[500px]">
						<img src={product.image} alt={product.title} class="h-full w-full object-cover" />
					</div>
					<div class="p-4">
						<h2 class="text-3xl font-normal transition group-hover:text-[#306b86]">
							{product.title}
						</h2>
						<p class="text-gray-600 text-[16px]">₦{product.price.toLocaleString()}.00</p>
					</div>
				</a>
			{/each}
		</section>
	{/if}
</main>