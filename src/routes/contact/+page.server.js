import { serverClient } from '$lib/sanity.server';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const firstName = data.get('firstName');
		const lastName = data.get('lastName');
		const email = data.get('email');
		const message = data.get('message');

		try {
			await serverClient.create({
				_type: 'contactSubmission',
				firstName,
				lastName,
				email,
				message,
				submittedAt: new Date().toISOString(),
				status: 'new'
			});

			return { success: true };
		} catch (error) {
			console.error('Error submitting form:', error);
			return fail(500, { error: true });
		}
	}
};