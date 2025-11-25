import { writable } from 'svelte/store';

export const products = writable([
	{
		id: "df293cc8-3917-4a40-950d-6bd0d883ded6",
		slug: 'Holding-It-Together',
		title: 'Holding It Together',
		price: 3000000,
		description:
			"This piece explores the struggle of inner balance and self-acceptance. The two differently colored hands symbolize opposing emotions and identities, meeting over a basketball that represents control and tension. It reflects the ongoing journey of coexisting with all parts of oneself—embracing conflict, finding harmony in contrast, and drawing strength from the act of holding on amidst uncertainty.",
		image: '/assets/Holding-It-Together.webp',
		details: {
			size: '24x36 inches',
			material: 'Matte Print',
			availability: 'In Stock'
		}
	},
	{
		id: "df293cc8-3917-4a40-970d-6bd0d883ded6",
		slug: 'Echoes-of-Origin',
		title: 'Echoes of Origin',
		price: 3000000,
		description:
			"This piece, Echoes of Origin, is a personal exploration of identity, ancestry, and self-discovery. Through the interplay of color and symbolism, it reflects my journey of understanding how my roots shape who I am. The hand patterned like a giraffe’s skin represents lineage and unseen guidance, while the cool hues of the face evoke introspection and memory. Together, they capture the balance between heritage and growth — a reminder that I carry the strength, stories, and spirit of those who came before me.",
		image: '/assets/Echoes-of-Origin.webp',
		details: {
			size: '30x40 inches',
			material: 'Canvas Print',
			availability: 'Limited Stock'
		}
	},
	{
		id: "df293cc8-3917-4a40-950d-6bd09883ded6",
		slug: 'My-Tribe',
		title: 'My Tribe',
		price: 3000000,
		description:
			"This piece captures the tension between belonging and becoming. It reflects the beauty and burden of being shaped by my tribe — the hands that nurtured and defined me, yet also set my limits. It’s a meditation on love, identity, and the quiet struggle between honoring my roots and finding my own path. It asks a timeless question: can I truly be myself and still remain theirs?",
		image: '/assets/My-Tribe.webp',
		details: {
			size: '30x40 inches',
			material: 'Canvas Print',
			availability: 'Limited Stock'
		}
	},
]);
