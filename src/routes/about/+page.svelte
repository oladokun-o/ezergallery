<script>
	import PallOfDespondence from '$lib/assets/Pall of despondence.webp';
	import DarkTribe from '$lib/assets/Dark-tribe.webp';
	import ImageCarousel from '../../components/ImageCarousel.svelte';
	import LastChapter from '$lib/assets/Last Chapter.webp';

	import { client } from '$lib/sanity';
	import { onMount } from 'svelte';

	let testimonials = [];
	let loading = true;

	onMount(async () => {
		try {
			// Fetch testimonials from Sanity
			const data = await client.fetch(`*[_type == "testimonial"] | order(_createdAt desc) {
				_id,
				name,
				role,
				message
			}`);

			testimonials = data.map(item => ({
				id: item._id,
				name: item.name,
				role: item.role,
				message: item.message
			}));
		} catch (error) {
			console.error('Error fetching testimonials:', error);
		} finally {
			loading = false;
		}
	});

</script>

<main class="flex flex-col gap-y-10 px-5 py-20 lg:px-20">

	<!-- -===================================hero======================== -->
	<section class="flex flex-col gap-20">
		<div class="grid grid-cols-1 items-end gap-8 md:grid-cols-2 lg:gap-20">
			<div class="flex flex-col gap-10">
				<h1
					class="w-full text-[30px] font-[400] tracking-tight lg:max-w-[800px] lg:text-[45px] lg:tracking-wide"
				>
					EZERGALLERY was born from a need to tell real stories, moments that carry emotion, memory,
					and meaning beyond what words can express.
				</h1>
				<div class="hidden max-h-[1000px] w-full overflow-hidden md:block">
					<img
						src={PallOfDespondence}
						alt="Pall of despondence"
						class="h-full w-full object-cover"
					/>
				</div>
			</div>
			<div class="flex flex-col gap-8 lg:gap-20">
				<img src={DarkTribe} alt="Dark tribe" class="order-2 md:order-1" />
				<div
					class="order-1 flex flex-col gap-5 font-normal tracking-wider md:order-2 md:text-[16px]"
				>
					<p class="text-[20px]">
						Founded by a visual artist whose work speaks from the heart, EZERGALLERY explores the
						spaces between emotion, identity, and experience. Each image is a mirror of survival,
						resilience, and the raw beauty of being human. This is not about perfection — it’s about
						honesty, about art that makes people feel seen and understood. Every frame is a dialogue
						between the visible and the invisible, capturing what words often cannot express.Founded
						by a visual artist whose work speaks from the heart, EZERGALLERY explores the spaces
						between emotion, identity, and experience. Each image is a mirror of survival,
						resilience, and the raw beauty of being human. This is not about perfection — it’s about
						honesty, about art that makes people feel seen and understood.
					</p>
					<p class="text-[20px]">
						EZERGALLERY is rooted in storytelling — a reflection of the moments that shape who we
						are and how we connect with the world around us. Through color, texture, and form, the
						work challenges perception, celebrates imperfection, and holds space for vulnerability.
						It is a commitment to truth — to showing life as it is felt, not just as it is seen.
						Each photograph is an invitation to pause, to feel, and to remember that art, at its
						core, is human.
					</p>
					<button
						class="h-14 w-36 rounded-2xl bg-[#306b86] text-[16px] font-semibold text-white
         transition-all duration-300 ease-in-out
         hover:scale-105 hover:bg-[#b8d6ee] hover:text-black"
					>
						Book Now
					</button>
				</div>
			</div>
		</div>
	</section>

	<!--=============================== my Philosophy================================ -->
	<section
		class="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 py-20 md:grid-cols-2 lg:gap-20"
	>
		<div>
			<h2
				class="pb-5 text-[30px] font-semibold tracking-tight text-[#b8d6ee] lg:text-[45px] lg:tracking-wide"
			>
				My Philosophy
			</h2>
			<p class="pb-5 text-[20px] lg:pb-10">
				Photography for me is more than capturing what the eyes can see. It is a quiet reflection of
				how I feel, think, and experience the world around me. Through the lens, I explore emotion,
				memory, and the unspoken moments that define us. My camera helps me understand the things
				that words often fail to express, turning silence and stillness into something meaningful.
			</p>
			<p class="text-[20px]">
				My work is honest and instinctive, shaped by truth rather than perfection. I photograph from
				a place of feeling, not performance. Every image is a conversation between light and
				emotion, between what is visible and what is hidden. Through each frame, I hope to remind
				people of their own humanity, their struggles, and their beauty. Photography is my way of
				saying that even in pain, there is depth. Even in vulnerability, there is strength. And even
				in stillness, there is life.
			</p>
		</div>
		<div class="max-h-[1000px] w-full overflow-hidden">
			<img src={LastChapter} alt="Last Chapter" class="h-full w-full object-contain" />
		</div>
	</section>

	<!-- ==========================latest photography========================== -->
	<section class="-mx-5 flex flex-col gap-5 lg:-mx-20 lg:gap-20">
		<div>
			<h2 class="text-center text-[35px] font-semibold text-[#b8d6ee] capitalize lg:text-[54px]">
				Latest Photography
			</h2>
			<p class="mx-auto max-w-[600px] pt-3 text-center text-[20px]">
				A glimpse into a few of my favorite creations & moments that tell their own stories through
				tone, color, and emotion.
			</p>
		</div>
		<ImageCarousel />
	</section>

	<!-- =======================testimonials===================================== -->
	<section class="py-16">
	<div class="mx-auto max-w-[1200px] px-6">
		<h2 class="pb-5 text-center text-[35px] font-semibold text-[#b8d6ee] capitalize lg:text-[54px]">
			What People Say
		</h2>

		{#if loading}
			<div class="text-center py-20">
				<p class="text-xl text-gray-400">Loading testimonials...</p>
			</div>
		{:else if testimonials.length === 0}
			<div class="text-center py-20">
				<p class="text-xl text-gray-400">No testimonials found.</p>
			</div>
		{:else}
			<div class="scrollbar-hide flex snap-x snap-mandatory space-x-6 overflow-x-auto py-10">
				{#each testimonials as t}
					<div
						class="w-[350px] flex-none snap-start rounded-2xl bg-black p-6 shadow-md transition hover:shadow-xl"
					>
						<p class="mb-4 text-white">"{t.message}"</p>
						<h3 class="text-lg font-semibold text-[#306b86]">— {t.name}</h3>
						<p class="text-sm text-gray-500">{t.role}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
</main>
