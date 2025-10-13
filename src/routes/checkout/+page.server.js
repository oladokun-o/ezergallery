import { serverClient } from '$lib/sanity.server';
import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

function generateKey() {
	return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

const resend = new Resend(RESEND_API_KEY);

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		// Get form data
		const firstName = data.get('firstName');
		const lastName = data.get('lastName');
		const name = `${firstName} ${lastName}`;
		const email = data.get('email');
		const phone = data.get('phone');
		const address = data.get('address');
		const city = data.get('city');
		const state = data.get('state');
		const zipcode = data.get('zipcode');
		const country = data.get('country');
		const paymentMethod = data.get('paymentMethod');

		// Get cart items (sent as JSON string)
		const cartItems = JSON.parse(data.get('cartItems'));
		const shippingFee = Number(data.get('shippingFee'));
		const total = Number(data.get('total'));

		// Generate order ID
		const orderId = 'ORD' + Math.floor(Math.random() * 100000);

		try {
			// Save order to Sanity
			await serverClient.create({
				_type: 'order',
				orderId,
				orderDate: new Date().toISOString(),
				status: 'pending',
				// Customer info
				customerName: `${firstName} ${lastName}`,
				customerEmail: email,
				customerPhone: phone,
				// Billing address
				billingAddress: {
					address,
					city,
					state,
					zipcode,
					country
				},
				// Order items
				items: cartItems.map((item) => ({
					_key: generateKey(),
					productId: item.id || item._id,
					title: item.title,
					price: item.price,
					qty: item.qty,
					image: item.image
				})),
				// Payment & totals
				paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod,
				paymentStatus: 'pending',
				shippingFee,
				total
			});

			// 2️⃣ Prepare HTML for items (for emails)
			const itemListHTML = cartItems
				.map(
					(item) => `
         <tr>
						<td style="padding:8px;border:1px solid #ddd;">${item.title}</td>
						<td style="padding:8px;border:1px solid #ddd;text-align:center;">${item.qty}</td>
						<td style="padding:8px;border:1px solid #ddd;text-align:right;">₦${item.price.toLocaleString()}.00</td>
						<td style="padding:8px;border:1px solid #ddd;text-align:right;">₦${(item.price * item.qty).toLocaleString()}.00</td>
					</tr>
        `
				)
				.join('');

			const itemsTable = `
				<table style="border-collapse:collapse;width:100%;margin-top:10px;">
					<thead>
						<tr style="background:#f4f4f4;">
							<th style="padding:8px;border:1px solid #ddd;text-align:left;">Item</th>
							<th style="padding:8px;border:1px solid #ddd;text-align:center;">Quantity</th>
							<th style="padding:8px;border:1px solid #ddd;text-align:right;">Price</th>
							<th style="padding:8px;border:1px solid #ddd;text-align:right;">Subtotal</th>
						</tr>
					</thead>
					<tbody>${itemListHTML}</tbody>
					<tfoot>
						<tr>
							<td colspan="3" style="padding:8px;border:1px solid #ddd;text-align:right;"><strong>Shipping Fee:</strong></td>
							<td style="padding:8px;border:1px solid #ddd;text-align:right;">₦${shippingFee.toLocaleString()}.00</td>
						</tr>
						<tr>
							<td colspan="3" style="padding:8px;border:1px solid #ddd;text-align:right;"><strong>Total:</strong></td>
							<td style="padding:8px;border:1px solid #ddd;text-align:right;"><strong>₦${total.toLocaleString()}.00</strong></td>
						</tr>
					</tfoot>
				</table>
      `;

			// 3️⃣ Send email to Admin
			await resend.emails.send({
				from: 'onboarding@resend.dev',
				to: ['awosojiemmanuel2019@gmail.com'], // your admin email
				subject: `🛒 New Order from ${name}`,
				html: `
         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
						<h2 style="color: #306b86;">New Order Received</h2>
						<p><strong>Order ID:</strong> ${orderId}</p>
						<p><strong>Name:</strong> ${name}</p>
						<p><strong>Email:</strong> ${email}</p>
						<p><strong>Phone:</strong> ${phone}</p>

						<h3>Shipping Address:</h3>
						<p>${address}<br>${city}, ${state} ${zipcode}<br>${country}</p>

						<h3>Order Items:</h3>
						${itemsTable}

						<p><strong>Payment Method:</strong> ${paymentMethod}</p>
					</div>
        `
			});

			// 4️⃣ Send email to Customer (confirmation)
			await resend.emails.send({
				from: 'onboarding@resend.dev', 
				to: [email],
				subject: `✅ Order Confirmation - Thank you, ${name}!`,
				html: `
         	<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
						<h2 style="color: #306b86;">Thank you for your order!</h2>
						<p>Hi ${name},</p>
						<p>We've received your order successfully. Below are your order details:</p>

						<p><strong>Order ID:</strong> ${orderId}</p>

						${itemsTable}

						<p><strong>Payment Method:</strong> ${paymentMethod}</p>

						<p style="margin-top: 30px;">We'll notify you when your items are shipped.</p>
						<p>Warm regards,<br><strong>EZERGALLERY Team</strong></p>
					</div>
        `
			});

			console.log(' Order saved and emails sent!');

			// Return success with order details
			return {
				success: true,
				orderId,
				customerName: `${firstName} ${lastName}`,
				email,
				phone,
				address,
				city,
				state,
				zipcode,
				country,
				paymentMethod,
				cartItems,
				shippingFee,
				total
			};
		} catch (error) {
			console.error('Error saving order:', error);
			return fail(500, { error: true, message: 'Failed to save order' });
		}
	}
};
