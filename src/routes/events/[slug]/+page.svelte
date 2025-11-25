<script>
	import { onMount } from 'svelte';
	import { urlFor } from '$lib/sanity';
	import { toHTML } from '@portabletext/to-html';
	import { page } from '$app/stores';

	export let data;

	let event = data.event;
	let showModal = false;
	let fullImage = '';
	let descriptionHTML = '';

	// Use heroImage if available, fallback to featuredImage
	let heroImageUrl = event.featuredImage || event.heroImage;

	// Countdown timer
	let days = 0;
	let hours = 0;
	let minutes = 0;
	let seconds = 0;
	let heartActive = false;
	let starActive = false;

	onMount(() => {
		// Convert PortableText → HTML
		if (event.description) {
			descriptionHTML = toHTML(event.description, {
				components: {
					types: {
						image: ({ value }) =>
							`<img src="${urlFor(value).width(1000).url()}" alt="${value.alt || ''}" />`
					},
					marks: {
						color: ({ children, value }) => `<span style="color:${value.hex}">${children}</span>`,
						strong: ({ children }) => `<strong>${children}</strong>`,
						em: ({ children }) => `<em>${children}</em>`,
						underline: ({ children }) => `<u>${children}</u>`
					}
				}
			});
		}

		startCountdown(new Date(event.startDate));
	});

	function startCountdown(targetDate) {
		const updateCountdown = () => {
			const now = new Date().getTime();
			const distance = targetDate - now;

			if (distance > 0) {
				days = Math.floor(distance / (1000 * 60 * 60 * 24));
				hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				seconds = Math.floor((distance % (1000 * 60)) / 1000);
			}
		};

		updateCountdown();
		setInterval(updateCountdown, 1000);
	}

	function openModal(image) {
		fullImage = image;
		showModal = true;
	}
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />

	<!-- Open Graph -->
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:image" content={data.meta.image} />
	<meta property="og:url" content={data.meta.url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="EZERGALLERY" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
	<meta name="twitter:image" content={data.meta.image} />
	<meta name="twitter:url" content={data.meta.url} />

	<!-- Schema.org Event Structured Data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Event",
		"name": "${event.title}",
		"description": "${data.meta.description}",
		"image": "${data.meta.image}",
		"startDate": "${event.startDate}",
		"endDate": "${event.endDate}",
		"eventStatus": "https://schema.org/EventScheduled",
		"eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
		"location": {
			"@type": "Place",
			"name": "${event.venue || event.location}",
			"address": {
				"@type": "PostalAddress",
				"addressLocality": "${event.location || 'Lagos'}",
				"addressCountry": "NG"
			}
		},
		"organizer": {
			"@type": "Organization",
			"name": "EZERGALLERY",
			"url": "https://ezergallery.com"
		},
		"offers": {
			"@type": "Offer",
			"url": "${event.ticketLink}",
			"availability": "https://schema.org/InStock"
		}
	}
	<\/script>`}
</svelte:head>

<section
	class="items-left relative z-10 flex h-[200px] flex-col justify-center gap-10 bg-[url('/src/lib/assets/Image37.webp')] bg-cover bg-top bg-no-repeat text-center"
>
	<div class="absolute inset-0 bg-black/70"></div>
	<div class="relative z-10 mx-auto w-full max-w-[1300px] items-start px-6 text-left">
		<h1 class="mb-6 flex text-3xl leading-tight font-light md:text-5xl">
			{event.title || 'TBA'}
		</h1>
		<div class="flex gap-2 font-[900]">
			<a href="/" class="hover:text-[#306b86]">Home</a>
			<p>></p>
			<p class="text-[#306b86] underline">{event.title || 'TBA'}</p>
		</div>
	</div>
</section>

{#if event}
	<section class="mx-auto mb-30 grid max-w-[1300px] grid-cols-1 gap-10 px-5 py-20 xl:grid-cols-3">
		<!-- Main Content -->
		<div class="bg-[#1a1c1b] xl:col-span-2">
			<!-- Featured Image -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="group relative cursor-pointer" on:click={() => openModal(heroImageUrl)}>
				<div class="h-full w-full justify-center md:h-[600px]">
					<img
						src={heroImageUrl}
						alt={event.title}
						class="h-full w-full cursor-pointer rounded-lg object-cover object-top shadow-lg"
					/>
				</div>
				<div
					class="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="white"
						class="h-12 w-12"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 10l4.553-4.553a.5.5 0 00-.707-.707L14.293 9.293A1 1 0 0014 10v4a1 1 0 001.707.707L19 10m-10 4l-4.553 4.553a.5.5 0 01-.707-.707L9.293 14.707A1 1 0 0110 14v-4a1 1 0 00-1.707-.707L5 10"
						/>
					</svg>
				</div>
			</div>

			<!-- Modal -->
			{#if showModal}
				<div class="bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-black">
					<button
						class="absolute top-5 right-5 text-3xl text-white"
						on:click={() => (showModal = false)}
					>
						&times;
					</button>
					<img
						src={fullImage}
						alt=""
						class="max-h-[90vh] max-w-[90vw] cursor-pointer rounded-lg object-contain shadow-xl"
					/>
				</div>
			{/if}

			<!-- Rich Text Description -->
			<div class="custom-prose prose max-w-none px-5 py-10 prose-invert md:p-10">
				<style>
					:global(.custom-prose p) {
						margin: 1rem 0;
						line-height: 1.75;
						font-size: 18px;
					}

					:global(.custom-prose h1) {
						font-size: 2.5rem;
						font-weight: 700;
						margin: 1.5rem 0;
					}

					:global(.custom-prose h2) {
						font-size: 2rem;
						font-weight: 700;
						margin: 1.25rem 0;
					}

					:global(.custom-prose h3) {
						font-size: 1.5rem;
						font-weight: 700;
						margin: 1rem 0;
					}

					:global(.custom-prose strong) {
						font-weight: 700;
					}

					:global(.custom-prose em) {
						font-style: italic;
					}

					:global(.custom-prose u) {
						text-decoration: underline;
					}

					:global(.custom-prose a) {
						color: #306b86;
						text-decoration: underline;
					}

					:global(.custom-prose a:hover) {
						color: #b8d6ee;
					}

					:global(.custom-prose ul) {
						list-style: disc;
						margin-left: 2rem;
					}

					:global(.custom-prose ol) {
						list-style: decimal;
						margin-left: 2rem;
					}

					:global(.custom-prose li) {
						margin: 0.5rem 0;
						line-height: 1.6;
					}

					:global(.custom-prose blockquote) {
						border-left: 4px solid #306b86;
						padding-left: 1rem;
						font-style: italic;
						color: #ddd;
						margin: 1.5rem 0;
					}

					:global(.custom-prose img) {
						border-radius: 12px;
						margin: 1.5rem 0;
						box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
					}
				</style>

				{#if descriptionHTML}
					<div>{@html descriptionHTML}</div>
				{:else}
					<p class="text-gray-400">No description available.</p>
				{/if}
			</div>
		</div>

		<!-- Sidebar -->
		<div class="max-h-[1000px] bg-[#1a1c1b] p-10 xl:col-span-1">
			<div class="flex items-center justify-between">
				<h3 class="text-lg font-[700]">Event Details</h3>
				<div class="flex items-center justify-center gap-3">
					<!-- Heart Button -->
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						on:click={() => (heartActive = !heartActive)}
						class="border p-3 transition focus:ring-0 focus:outline-none active:scale-95"
						aria-pressed={heartActive}
					>
						<svg viewBox="0 0 24 24" class="h-5 w-5 transition-all duration-200">
							<path
								class="stroke-linecap-round stroke-linejoin-round stroke-[2] transition-all duration-200
								{heartActive ? 'fill-blue-500 stroke-blue-500' : 'fill-transparent stroke-gray-400'}"
								d="M12 21s-7.5-4.867-9.25-7.125C.75 10.75 3.5 6 7.5 6c2.09 0 3.54 1.01 4.5 2.08C12.96 7.01 14.41 6 16.5 6 20.5 6 23.25 10.75 21.25 13.875 19.5 16.133 12 21 12 21z"
							/>
						</svg>
					</button>

					<!-- Star Button -->
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						on:click={() => (starActive = !starActive)}
						class="border p-3 transition focus:ring-0 focus:outline-none active:scale-95"
						aria-pressed={starActive}
					>
						<svg viewBox="0 0 24 24" class="h-5 w-5 transition-all duration-200">
							<path
								class="stroke-linecap-round stroke-linejoin-round stroke-[2] transition-all duration-200
								{starActive ? 'fill-blue-500 stroke-blue-500' : 'fill-transparent stroke-gray-400'}"
								d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
							/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Countdown -->
			<div
				class="-mx-10 mt-10 flex h-22 items-center justify-around gap-6 bg-[#306b86] px-5 text-white"
			>
				<div class="text-center">
					<div class="text-4xl font-bold">{days}</div>
					<div class="text-sm">Days</div>
				</div>
				<div class="h-22 border-l border-white"></div>
				<div class="text-center">
					<div class="text-4xl font-bold">{hours}</div>
					<div class="text-sm">Hours</div>
				</div>
				<div class="h-22 border-l border-white"></div>
				<div class="text-center">
					<div class="text-4xl font-bold">{minutes}</div>
					<div class="text-sm">Minutes</div>
				</div>
				<div class="h-22 border-l border-white"></div>
				<div class="text-center">
					<div class="text-4xl font-bold">{seconds}</div>
					<div class="text-sm">Seconds</div>
				</div>
			</div>

			<!-- Event Details -->
			<div>
				<!-- Start Date -->
				<div class="flex gap-8 border-b border-b-gray-600 py-5">
					<svg class="h-8 w-8 text-[#306b86]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<rect x="3" y="5" width="18" height="16" rx="2" stroke-width="1.5" />
						<path d="M16 3v4M8 3v4" stroke-width="1.5" stroke-linecap="round" />
						<path d="M8 13h8" stroke-width="1.5" stroke-linecap="round" />
					</svg>
					<div>
						<p>Start Date</p>
						<p>{new Date(event.startDate).toLocaleString()}</p>
					</div>
				</div>

				<!-- End Date -->
				<div class="flex gap-8 border-b border-b-gray-600 py-5">
					<svg class="h-8 w-8 text-[#306b86]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<rect x="3" y="5" width="18" height="16" rx="2" stroke-width="1.5" />
						<path d="M16 3v4M8 3v4" stroke-width="1.5" stroke-linecap="round" />
						<path
							d="M9.5 12.5l1.8 1.8L15.5 10"
							stroke-width="1.6"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<div>
						<p>End Date</p>
						<p>{new Date(event.endDate).toLocaleString()}</p>
					</div>
				</div>

				<!-- Door Time -->
				<div class="flex gap-8 border-b border-b-gray-600 py-5">
					<svg class="h-8 w-8 text-[#306b86]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<circle cx="12" cy="12" r="8" stroke-width="1.5" />
						<path
							d="M12 8v5l3 2"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<div>
						<p>Door Time</p>
						<p>{event.doorTime || 'TBA'}</p>
					</div>
				</div>

				<!-- Status -->
				<div class="flex gap-8 border-b border-b-gray-600 py-5">
					<svg class="h-8 w-8 text-[#306b86]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path d="M4 12a8 8 0 0016 0 8 8 0 00-16 0z" stroke-width="1.5" />
						<path
							d="M8 12l2 2 6-6"
							stroke-width="1.6"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<div>
						<p>Status</p>
						<p class="capitalize">{event.status || 'upcoming'}</p>
					</div>
				</div>

				<!-- Location -->
				<div class="flex gap-8 border-b border-b-gray-600 py-5">
					<svg class="h-8 w-8 text-[#306b86]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path
							d="M12 21s7-4.5 7-10a7 7 0 10-14 0c0 5.5 7 10 7 10z"
							stroke-width="1.4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<circle cx="12" cy="11" r="2" stroke-width="1.5" />
					</svg>
					<div>
						<p>Location</p>
						<p>{event.location || 'TBA'}</p>
					</div>
				</div>

				<!-- Venue -->
				<div class="flex gap-8 border-b border-b-gray-600 py-5">
					<svg class="h-8 w-8 text-[#306b86]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<rect x="3" y="7" width="18" height="12" rx="1" stroke-width="1.4" />
						<path d="M7 7v-2h2v2M15 7v-2h2v2" stroke-width="1.4" stroke-linecap="round" />
					</svg>
					<div>
						<p>Venue</p>
						<p>{event.venue || 'TBA'}</p>
					</div>
				</div>

				<!-- Phone -->
				<div class="flex gap-8 border-b border-b-gray-600 py-5">
					<svg class="h-8 w-8 text-[#306b86]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path
							d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.86 19.86 0 01-3.07-8.63A2 2 0 014.09 2h3a2 2 0 012 1.72c.12 1.21.43 2.39.92 3.5a2 2 0 01-.45 2.11L9.7 10.3a16 16 0 006 6l1.97-1.97a2 2 0 012.11-.45c1.11.49 2.29.8 3.5.92A2 2 0 0122 16.92z"
							stroke-width="1.2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<div>
						<p>Phone</p>
						<p>{event.phone || 'N/A'}</p>
					</div>
				</div>

				<!-- Email -->
				<div class="flex gap-8 py-5">
					<svg class="h-8 w-8 text-[#306b86]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<rect x="2" y="5" width="20" height="14" rx="2" stroke-width="1.4" />
						<path
							d="M22 7l-10 7L2 7"
							stroke-width="1.4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<div>
						<p>Email</p>
						<p>{event.email || 'N/A'}</p>
					</div>
				</div>
			</div>
		</div>
	</section>
{:else}
	<section class="mx-auto mb-30 max-w-[1300px] px-5 py-20 text-center">
		<p class="text-gray-400">Event not found.</p>
	</section>
{/if}
