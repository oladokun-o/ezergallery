import { createClient } from '@sanity/client';
import { SANITY_WRITE_TOKEN } from '$env/static/private';

// Server-only client (for writing data - contact form)
export const serverClient = createClient({
	projectId: 'ioc1kzee',
	dataset: 'production',
	apiVersion: '2025-01-01',
	useCdn: false,
	token: SANITY_WRITE_TOKEN,
});