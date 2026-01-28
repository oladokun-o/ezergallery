// src/routes/events/+page.server.js
import { client, urlFor } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	try {
		// Fetch all events, sorted by start date (upcoming first)
		const events = await client.fetch(
			`*[_type == "event"] | order(startDate asc) {
				_id,
				title,
				slug,
				featuredImage,
				heroImage,
				description,
				startDate,
				endDate,
				doorTime,
				status,
				location,
				venue,
				phone,
				email
			}`
		);

		// Process events to include optimized image URLs and meta descriptions
		const processedEvents = events.map((event) => {
			// Generate a short description from portable text
			const metaDescription =
				event.description
					?.filter((block) => block._type === 'block')
					.map((block) => block.children?.map((child) => child.text).join(''))
					.join(' ')
					.slice(0, 160) || 'Join us for this exciting event';

			// Use heroImage if available, otherwise featuredImage
			const primaryImage =  event.featuredImage || event.heroImage;
			const imageUrl = primaryImage ? urlFor(primaryImage).width(800).url() : '';

			return {
				...event,
				imageUrl,
				metaDescription,
				// Keep original image objects for detail pages
				featuredImage: event.featuredImage ? urlFor(event.featuredImage).width(800).url() : '',
				heroImage: event.heroImage ? urlFor(event.heroImage).width(800).url() : ''
			};
		});

		return {
			events: processedEvents,
			meta: {
				title: 'Events | EZERGALLERY',
				description:
					'Explore upcoming art exhibitions, gallery openings, and cultural events at EZERGALLERY.',
				image: 'https://ezergallery.com/_app/immutable/assets/Image37.tr4QU3XI.webp',
				url: 'https://ezergallery.com/events'
			}
		};
	} catch (err) {
		console.error('Error loading events:', err);
		throw error(500, 'Failed to load events');
	}
}
