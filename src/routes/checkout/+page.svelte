<script>
	import { cartItems, clearCart } from '$lib/stores/cartStore';
	import { derived, get } from 'svelte/store';
	import { enhance } from '$app/forms';
	import OrderCompleteModal from '../../components/OrderCompleteModal.svelte';

	export let form;

	// Subtotal calculation
	const subtotal = derived(cartItems, ($items) =>
		$items.reduce((sum, item) => sum + item.price * item.qty, 0)
	);

	const shippingFee = 2000;

	let Fname = '';
	let Lname = '';
	let email = '';
	let number = '';
	let address = '';
	let city = '';
	let country = '';
	let zipcode = '';
	let state = '';
	let paymentMethod = 'cod';
	let acceptTerms = false;

	// Modal state
	let showModal = false;
	let isLoading = false;
	let orderDetails = {};

	// Handle form response
	$: if (form?.success) {
		orderDetails = {
			orderId: form.orderId,
			customer: {
				name: form.customerName,
				email: form.email,
				phone: form.phone
			},
			billing: {
				address: form.address,
				city: form.city,
				state: form.state,
				zipcode: form.zipcode,
				country: form.country
			},
			payment: {
				method: form.paymentMethod === 'cod' ? 'Cash on Delivery' : form.paymentMethod,
				status: 'Pending'
			},
			items: form.cartItems,
			shippingFee: form.shippingFee,
			total: form.total
		};

		showModal = true;
		isLoading = false;

		// Clear cart
		setTimeout(() => {
			clearCart();
		}, 1000);
	}

	$: if (form?.error) {
		alert('Failed to complete order. Please try again.');
		isLoading = false;
	}
</script>

<div class="mx-auto max-w-[1400px]">
<a
		href="/cart"
		class="mx-10 mt-20 grid w-[100px] text-[18px] text-[#306b86] transition duration-100 hover:text-white lg:mx-28"
		>Cart</a
	>
</div>
<section
	class="mx-auto mt-10 grid min-h-screen max-w-[1400px] grid-cols-1 gap-10 gap-y-10 px-5 pb-20 lg:grid-cols-2 lg:px-20"
>
	<!-- Checkout Form -->
	<div class="order-2 rounded-xl p-6 lg:order-1">
		<h3 class="mb-4 text-xl font-semibold">Customer Details</h3>

		<form
			method="POST"
			class="space-y-4 text-white"
			use:enhance={() => {
				if (get(cartItems).length === 0) {
					alert('Your cart is empty!');
					return () => {};
				}
				if (!acceptTerms) {
					alert('You must accept the Terms & Conditions.');
					return () => {};
				}

				isLoading = true;
				showModal = true;

				return async ({ update }) => {
					await update();
				};
			}}
		>
			<!-- Hidden fields for cart data -->
			<input type="hidden" name="cartItems" value={JSON.stringify(get(cartItems))} />
			<input type="hidden" name="shippingFee" value={shippingFee} />
			<input type="hidden" name="total" value={get(subtotal) + shippingFee} />
			<input type="hidden" name="paymentMethod" value={paymentMethod} />

			<input
				type="email"
				name="email"
				placeholder="Email Address"
				bind:value={email}
				required
				class="w-full rounded-sm border bg-transparent p-3"
			/>
			<h3 class="text-xl">Shipping Address</h3>
			<input
				type="text"
				name="country"
				placeholder="Country*"
				bind:value={country}
				required
				class="w-full rounded-sm border bg-transparent p-3"
			/>
			<div class="flex flex-col gap-4 md:flex-row">
				<input
					type="text"
					name="firstName"
					placeholder="First Name*"
					bind:value={Fname}
					required
					class="w-full rounded-sm border bg-transparent p-3"
				/>
				<input
					type="text"
					name="lastName"
					placeholder="Last Name*"
					bind:value={Lname}
					required
					class="w-full rounded-sm border bg-transparent p-3"
				/>
			</div>
			<input
				type="text"
				name="address"
				placeholder="Street Address"
				bind:value={address}
				required
				class="w-full rounded-sm border bg-transparent p-3"
			/>

			<div class="flex flex-col gap-4 md:flex-row">
				<input
					type="text"
					name="city"
					placeholder="City"
					bind:value={city}
					required
					class="w-full rounded-sm border bg-transparent p-3"
				/>
				<input
					type="text"
					name="state"
					placeholder="State / Province*"
					bind:value={state}
					required
					class="w-full rounded-sm border bg-transparent p-3"
				/>
				<input
					type="text"
					name="zipcode"
					placeholder="Zip/ Postal code"
					bind:value={zipcode}
					required
					class="w-full rounded-sm border bg-transparent p-3"
				/>
			</div>
			<input
				type="number"
				name="phone"
				placeholder="Phone number with country code*"
				bind:value={number}
				required
				class="w-full rounded-sm border bg-transparent p-3"
			/>

			<!-- Payment -->
			<div>
				<h3 class="mb-2 font-medium">Payment Method</h3>
				<label class="flex cursor-pointer items-center gap-3">
					<input type="radio" value="cod" bind:group={paymentMethod} class="hidden" />

					<div class="flex h-5 w-5 items-center justify-center rounded-full border-0 bg-gray-400">
						{#if paymentMethod === 'cod'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 text-black"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="3"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
							</svg>
						{/if}
					</div>

					<span>Cash on Delivery (Offline Payment)</span>
				</label>

				<!-- Terms and Conditions -->
				<div class="mt-4">
					<label class="flex cursor-pointer items-center gap-3">
						<input type="checkbox" bind:checked={acceptTerms} class="hidden" />

						<div
							class="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-400 transition-colors duration-300"
							class:bg-gray-400={acceptTerms}
						>
							{#if acceptTerms}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4 text-black"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="3"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
								</svg>
							{/if}
						</div>

						<span
							>I accept the <a href="/terms" class="text-blue-600 underline">Terms & Conditions</a
							></span
						>
					</label>
				</div>
			</div>
			<div class=" w-full justify-center md:ml-auto">
				<button
					type="submit"
					class="flex w-full justify-center rounded-sm py-4 text-white transition duration-300 enabled:bg-black enabled:hover:bg-[#306b86]
		       disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-70
		       md:ml-auto md:w-[30%]"
					disabled={!acceptTerms || isLoading}
				>
					{#if isLoading}
						Processing...
					{:else}
						Complete Order
					{/if}
				</button>
				<p class="mt-5 text-center text-sm text-[#5e5e5e] md:ml-auto md:text-right">
					This site is protected by reCAPTCHA Enterprise and <br /> the Google
					<a href="https://policies.google.com/privacy" class="underline">Privacy Policy</a>
					and <a href="https://policies.google.com/terms" class="underline">Terms of Service</a> apply.
				</p>
			</div>
		</form>
	</div>

	<!-- Order Summary -->
	<div class="order-1 rounded-xl bg-black/10 p-6 shadow-md">
		<h3 class="mb-4 text-xl font-semibold">Order Summary</h3>

		{#if $cartItems.length > 0}
			{#each $cartItems as item}
				<div class="flex items-center justify-between border-b py-2">
					<div class="flex items-center gap-3">
						<img src={item.image} alt={item.title} class="h-28 w-20 rounded object-cover shadow" />
						<div>
							<p class="font-medium">{item.title}</p>
							<p class="text-sm text-gray-500">Qty: {item.qty}</p>
						</div>
					</div>
					<p class="font-medium">₦{(item.price * item.qty).toLocaleString()}.00</p>
				</div>
			{/each}

			<div class="text-md flex justify-between font-medium">
				<span>Shipping Fee:</span>
				<span>₦{shippingFee.toLocaleString()}.00</span>
			</div>

			<div class="mt-4 flex justify-between text-lg font-semibold">
				<span>Total:</span>
				<span>₦{($subtotal + shippingFee).toLocaleString()}.00</span>
			</div>
		{:else}
			<p class="text-gray-500">Your cart is empty</p>
		{/if}
	</div>
</section>

<OrderCompleteModal show={showModal} {orderDetails} {isLoading}/>