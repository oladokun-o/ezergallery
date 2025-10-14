<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { products } from '$lib/stores/products';
	import { get } from 'svelte/store';
	import { client, urlFor } from '$lib/sanity';
	import { addToCart, cartItems, isCartOpen } from '$lib/stores/cartStore';
	import { showAddedToCart, showAlreadyInCart } from '$lib/stores/toastStore';

	let product = null;
	let loading = true;
	let quantity = 1;

	// Get slug from URL
	$: slug = $page.params.slug;

	onMount(async () => {
		try {
			// First, try to find in static products
			const staticProducts = get(products);
			const staticProduct = staticProducts.find((p) => p.slug === slug);

			if (staticProduct) {
				product = staticProduct;
				console.log('✅ Found static product:', product.title);
				loading = false;
				return;
			}

			// If not found in static, try Sanity
			const data = await client.fetch(
				`*[_type == "product" && slug.current == $slug][0] {
					_id,
					title,
					"slug": slug.current,
					price,
					image,
					description,
					size,
					material,
					availability
				}`,
				{ slug }
			);

			if (data) {
				product = {
					...data,
					id: data._id,
					image: data.image ? urlFor(data.image).width(1200).url() : '',
					details: {
						size: data.size || 'N/A',
						material: data.material || 'N/A',
						availability: data.availability || 'In Stock'
					}
				};
				console.log(' Found Sanity product:', product.title);
			}

		} catch (error) {
			console.error(' Error loading product:', error);
		} finally {
			loading = false;
		}
	});

	function increase() {
		quantity += 1;
	}

	function decrease() {
		if (quantity > 1) {
			quantity -= 1;
		}
	}

	function sharePage() {
		if (navigator.share) {
			navigator
				.share({
					title: document.title,
					text: 'Check this out!',
					url: window.location.href
				})
				.catch((err) => console.log('Share cancelled', err));
		} else {
			alert('Sharing is not supported in your browser.');
		}
	}

	function handleAddToCart() {
		const exists = get(cartItems).find((i) => i.id === product.id);

		if (exists) {
			showAlreadyInCart(product);
		} else {
			for (let i = 0; i < quantity; i++) {
				addToCart(product);
			}
			showAddedToCart(product);
		}

		isCartOpen.set(true);
	}
</script>

{#if loading}
	<div class="flex min-h-screen items-center justify-center">
		<p class="text-2xl">Loading product...</p>
	</div>
{:else if product}
	<p class="mx-auto mt-20 max-w-[1300px] cursor-pointer py-5 px-8 hover:text-[#306b86] transition duration-500">
		<a href="/store" class="flex gap-3 items-center">
			<span class="rotate-270 font-bold text-xl">↑</span>Back
		</a>
	</p>

	<section class="mx-auto grid max-w-[1300px] grid-cols-1 gap-20 py-6 md:grid-cols-2 px-8 pb-40">
		<!-- Product Image -->
		<div class="lg:h-[900px] h-full">
			<img
				src={product.image}
				alt={product.title}
				class="mb-6 w-full shadow-lg h-full object-cover object-center flex justify-center"
			/>
		</div>

		<!-- Product Details -->
		<div>
			<h1 class="mb-2 text-[30px] lg:text-5xl font-normal">{product.title}</h1>
			<h2 class="mb-4 text-[23px] lg:text-3xl font-normal">₦{product.price.toLocaleString()}.00</h2>

			<div class="my-5 h-[1px] w-full bg-[#306b86]"></div>

			<!-- Quantity + Add to Cart -->
			<div class="flex items-center gap-4">
				<div class="flex w-[30%] items-center justify-between rounded-xl border border-[#306b86]">
					<button
						class="h-14 w-12 cursor-pointer rounded-xl text-2xl font-bold text-white hover:bg-[#1e4a61] transition"
						on:click={decrease}
					>
						−
					</button>
					<span class="w-8 text-center text-xl font-normal">{quantity}</span>
					<button
						class="h-14 w-12 cursor-pointer text-2xl font-bold text-white rounded-xl hover:bg-[#1e4a61] transition"
						on:click={increase}
					>
						+
					</button>
				</div>

				<button
					class="h-14 w-[50%] flex-1 rounded-2xl bg-[#306b86] text-[16px] font-semibold
					text-white uppercase transition-all duration-300
					ease-in-out hover:scale-105 hover:bg-[#b8d6ee] hover:text-black"
					on:click={handleAddToCart}
				>
					Add to cart
				</button>
			</div>

			<p class="mb-6 py-10 text-[16px] leading-7 w-full break-words whitespace-normal">{product.description}</p>

			<ul class="mb-6 space-y-2 text-gray-700">
				<li><strong>Size:</strong> {product.details.size}</li>
				<li><strong>Material:</strong> {product.details.material}</li>
				<li><strong>Availability:</strong> {product.details.availability}</li>
			</ul>

			<button
				aria-label="Share"
				class="mt-20 flex w-24 cursor-pointer items-center gap-2 rounded-xl
				border border-[#306b86] px-4 py-2 capitalize transition hover:bg-[#306b86] hover:text-white"
				on:click={sharePage}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 12v.01M12 4v.01M20 12v.01M12 20v.01M7.757 7.757l.707.707M16.536 7.757l-.707.707M16.536 16.536l-.707-.707M7.757 16.536l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
					/>
				</svg>
				<span>share</span>
			</button>
		</div>
	</section>
{:else}
	<p class="text-center text-gray-500 py-20 text-2xl">Product not found.</p>
{/if}