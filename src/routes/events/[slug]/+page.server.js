import { client, urlFor } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const event = await client.fetch(
			`*[_type == "event" && slug.current == $slug][0] {
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
				email,
				"imageUrl": coalesce(featuredImage.asset->url, heroImage.asset->url)
			}`,
			{ slug: params.slug }
		);

		if (!event) {
			throw error(404, 'Event not found');
		}

		// Generate meta description from portable text
		const metaDescription =
			event.description
				?.filter((block) => block._type === 'block')
				.map((block) => block.children?.map((child) => child.text).join(''))
				.join(' ')
				.slice(0, 160) || 'Join us for this exciting event';

		// Use heroImage if available, otherwise use featuredImage
		const imageForMeta = event.featuredImage
			? urlFor(event.featuredImage).width(1200).url()
			: event.heroImage
				? urlFor(event.heroImage).width(1200).url()
				: '';

		return {
			event: {
				...event,
				featuredImage: event.featuredImage ? urlFor(event.featuredImage).width(1200).url() : '',
				heroImage: event.heroImage ? urlFor(event.heroImage).width(1200).url() : '',
				imageUrl: imageForMeta
			},
			meta: {
				title: `${event.title} | EZERGALLERY Events`,
				description: metaDescription,
				image: imageForMeta,
				url: `https://ezergallery.com/events/${params.slug}`,
				startDate: event.startDate,
				endDate: event.endDate,
				location: event.location,
				venue: event.venue
			}
		};
	} catch (err) {
		console.error('Error loading event:', err);
		throw error(500, 'Failed to load event');
	}
}
