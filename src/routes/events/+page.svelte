<script>
	import { goto } from '$app/navigation';

	export let data;

	let events = data.events || [];
	let filteredEvents = events;
	let selectedStatus = 'all';

	// Filter events by status
	function filterByStatus(status) {
		selectedStatus = status;
		if (status === 'all') {
			filteredEvents = events;
		} else {
			filteredEvents = events.filter((event) => event.status === status);
		}
	}

	// Navigate to event detail page
	function goToEvent(slug) {
		goto(`/events/${slug.current}`);
	}

	// Format date for display
	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	// Check if event is upcoming, ongoing, or past
	function getEventStatus(startDate, endDate) {
		const now = new Date();
		const start = new Date(startDate);
		const end = new Date(endDate);

		if (now < start) return 'upcoming';
		if (now >= start && now <= end) return 'ongoing';
		return 'past';
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
</svelte:head>

<!-- Hero Section -->
<section
	class="relative z-10 flex h-[200px] flex-col items-center justify-center gap-10 bg-[url('/src/lib/assets/Image37.webp')] bg-cover bg-top bg-no-repeat text-center"
>
	<div class="absolute inset-0 bg-black/70"></div>
	<div class="relative z-10 mx-auto w-full max-w-[1300px] px-6">
		<h1 class="mb-6 text-3xl font-light leading-tight md:text-5xl">Events</h1>
		<div class="flex justify-center gap-2 font-[900]">
			<a href="/" class="hover:text-[#306b86]">Home</a>
			<p>></p>
			<p class="text-[#306b86] underline">Events</p>
		</div>
	</div>
</section>

<!-- Events Listing Section -->
<section class="mx-auto max-w-[1300px] px-5 py-20">
	<!-- Filter Buttons -->
	<div class="mb-10 flex flex-wrap justify-center gap-4">
		<button
			on:click={() => filterByStatus('all')}
			class="rounded-lg border px-6 py-2 transition-all duration-200 {selectedStatus === 'all'
				? 'border-[#306b86] bg-[#306b86] text-white'
				: 'border-gray-600 bg-transparent text-gray-300 hover:border-[#306b86] hover:text-[#306b86]'}"
		>
			All Events
		</button>
		<button
			on:click={() => filterByStatus('upcoming')}
			class="rounded-lg border px-6 py-2 transition-all duration-200 {selectedStatus === 'upcoming'
				? 'border-[#306b86] bg-[#306b86] text-white'
				: 'border-gray-600 bg-transparent text-gray-300 hover:border-[#306b86] hover:text-[#306b86]'}"
		>
			Upcoming
		</button>
		<button
			on:click={() => filterByStatus('ongoing')}
			class="rounded-lg border px-6 py-2 transition-all duration-200 {selectedStatus === 'ongoing'
				? 'border-[#306b86] bg-[#306b86] text-white'
				: 'border-gray-600 bg-transparent text-gray-300 hover:border-[#306b86] hover:text-[#306b86]'}"
		>
			Ongoing
		</button>
		<button
			on:click={() => filterByStatus('past')}
			class="rounded-lg border px-6 py-2 transition-all duration-200 {selectedStatus === 'past'
				? 'border-[#306b86] bg-[#306b86] text-white'
				: 'border-gray-600 bg-transparent text-gray-300 hover:border-[#306b86] hover:text-[#306b86]'}"
		>
			Past Events
		</button>
	</div>

	<!-- Events Grid -->
	{#if filteredEvents.length > 0}
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredEvents as event (event._id)}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="group cursor-pointer overflow-hidden rounded-lg bg-[#1a1c1b] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
					on:click={() => goToEvent(event.slug)}
				>
					<!-- Event Image -->
					<div class="relative h-64 overflow-hidden">
						<img
							src={event.imageUrl}
							alt={event.title}
							class="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
						/>
						<!-- Status Badge -->
						<div
							class="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold uppercase {getEventStatus(
								event.startDate,
								event.endDate
							) === 'upcoming'
								? 'bg-blue-500'
								: getEventStatus(event.startDate, event.endDate) === 'ongoing'
									? 'bg-green-500'
									: 'bg-gray-500'} text-white"
						>
							{getEventStatus(event.startDate, event.endDate)}
						</div>
					</div>

					<!-- Event Details -->
					<div class="p-6">
						<h3 class="mb-3 text-xl font-bold text-white group-hover:text-[#306b86]">
							{event.title}
						</h3>

						<!-- Date Range -->
						<div class="mb-3 flex items-center gap-2 text-sm text-gray-400">
							<svg
								class="h-5 w-5 text-[#306b86]"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<rect x="3" y="5" width="18" height="16" rx="2" stroke-width="1.5" />
								<path d="M16 3v4M8 3v4" stroke-width="1.5" stroke-linecap="round" />
							</svg>
							<span>{formatDate(event.startDate)}</span>
						</div>

						<!-- Location -->
						{#if event.location}
							<div class="mb-3 flex items-center gap-2 text-sm text-gray-400">
								<svg
									class="h-5 w-5 text-[#306b86]"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
								>
									<path
										d="M12 21s7-4.5 7-10a7 7 0 10-14 0c0 5.5 7 10 7 10z"
										stroke-width="1.4"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<circle cx="12" cy="11" r="2" stroke-width="1.5" />
								</svg>
								<span>{event.location}</span>
							</div>
						{/if}

						<!-- Description Preview -->
						<p class="mb-4 line-clamp-3 text-sm text-gray-400">
							{event.metaDescription}
						</p>

						<!-- View Details Button -->
						<button
							class="w-full rounded-lg border border-[#306b86] bg-transparent px-4 py-2 text-sm font-semibold text-[#306b86] transition-all duration-200 hover:bg-[#306b86] hover:text-white"
						>
							View Details
						</button>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<!-- No Events Found -->
		<div class="py-20 text-center">
			<svg
				class="mx-auto mb-4 h-16 w-16 text-gray-600"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
			>
				<rect x="3" y="5" width="18" height="16" rx="2" stroke-width="1.5" />
				<path d="M16 3v4M8 3v4" stroke-width="1.5" stroke-linecap="round" />
				<path d="M3 11h18" stroke-width="1.5" />
			</svg>
			<p class="text-xl text-gray-400">No events found for the selected filter.</p>
			<button
				on:click={() => filterByStatus('all')}
				class="mt-6 rounded-lg border border-[#306b86] px-6 py-2 text-[#306b86] transition-all duration-200 hover:bg-[#306b86] hover:text-white"
			>
				View All Events
			</button>
		</div>
	{/if}
</section>