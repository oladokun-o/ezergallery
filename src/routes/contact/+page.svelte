<script>
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';

	let showSuccess = false;
	let showError = false;
	let isSubmitting = false;

	export let form;

	// Show messages based on form response
	$: if (form?.success) {
		showSuccess = true;
		setTimeout(() => { showSuccess = false; }, 9000);
	}

	$: if (form?.error) {
		showError = true;
		setTimeout(() => { showError = false; }, 5000);
	}
</script>

<main class="mx-auto flex flex-col gap-y-20 px-5 py-20 lg:px-20">
	<section class="mx-auto grid max-w-[1300px] grid-cols-1 gap-20 md:grid-cols-2 items-center">
		<div class="flex flex-col gap-5">
			<h1 class="mb-5 text-[45px] font-normal md:text-[30px] lg:text-[45px]">
				Let's work together!
			</h1>
			<p class="text-[20px] leading-7">
				Reaching out is the first step toward connection  and every connection matters. Whether you
				are a brand looking to collaborate, an art lover drawn to the stories behind each image, or
				someone simply moved by emotion and light, this space is open to you. At EZERGALLERY,
				communication is more than just exchanging messages; it's about listening, understanding,
				and building something meaningful together.
			</p>
			<p class="text-[20px] leading-7">
				Photography, at its core, is about relationships  between the artist and the subject,
				between the story and the viewer. That same belief shapes the way I approach every message I
				receive. When you reach out, know that your words are read with care and intention. I value
				your time, your curiosity, and your trust.
			</p>
			<p class="text-[20px] leading-7">
				So, tell me your story. What do you envision? What are you hoping to create, capture, or
				express? Whether it's a collaboration, commission, or personal inquiry, your message is the
				beginning of something new. I'll do my best to respond as soon as possible and help bring
				your ideas to life in a way that feels true and honest.
			</p>
			<p class="text-[20px] leading-7">
				Let's start the conversation. I'm excited to hear from you  because every message here
				isn't just a form submission, it's an invitation to create something beautiful together.
			</p>
		</div>

		<form
			method="POST"
			class="flex flex-col gap-8"
			use:enhance={() => {
				isSubmitting = true;
				return async ({ update }) => {
					await update();
					isSubmitting = false;
				};
			}}
		>
			{#if showSuccess}
				<p
					in:fade
					out:fade
					class="rounded-2xl bg-[#306b86] p-6 text-center text-[18px] font-normal"
				>
					Thank you so much for reaching out! Your message has been received successfully and we
					truly appreciate you taking the time to connect. Someone from our team will review your
					message carefully and get back to you as soon as possible. Please check your inbox
					regularly for our response and if you don't see it, kindly check your spam or promotions
					folder just in case. Once again, thank you for trusting us with your vision. Your story
					matters here.
				</p>
			{/if}

			{#if showError}
				<p
					in:fade
					out:fade
					class="rounded-2xl bg-red-500 p-6 text-center text-[18px] font-normal text-white"
				>
					Oops! Something went wrong. Please try again or contact us directly.
				</p>
			{/if}

			<div>
				<label for="name">Name *</label>
				<div class="flex gap-3">
					<input
						name="firstName"
						type="text"
						placeholder="First Name"
						required
						disabled={isSubmitting}
						class="w-full border-b border-gray-300 bg-transparent pb-1 focus:ring-0 focus:outline-none disabled:opacity-50"
					/>
					<input
						name="lastName"
						type="text"
						placeholder="Last Name"
						required
						disabled={isSubmitting}
						class="w-full border-b border-gray-300 bg-transparent pb-1 focus:ring-0 focus:outline-none disabled:opacity-50"
					/>
				</div>
			</div>

			<div class="flex flex-col">
				<label for="Email">Email *</label>
				<input
					name="email"
					type="email"
					required
					placeholder="example@email.com"
					disabled={isSubmitting}
					class="w-full border-b border-gray-300 bg-transparent pb-1 focus:ring-0 focus:outline-none disabled:opacity-50"
				/>
			</div>

			<div class="flex flex-col">
				<label for="message">Message *</label>
				<textarea
					name="message"
					class="h-48 w-full rounded-md border border-gray-300 bg-transparent p-2 focus:ring-0 focus:outline-none disabled:opacity-50"
					required
					disabled={isSubmitting}
				></textarea>
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				class="h-14 w-36 rounded-2xl bg-[#306b86] text-[16px] font-semibold text-white
					transition-all duration-300 ease-in-out
					hover:scale-105 hover:bg-[#b8d6ee] hover:text-black
					disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
			>
				{isSubmitting ? 'Sending...' : 'Submit'}
			</button>
		</form>
	</section>

	<section class="-mx-5 lg:-mx-20 pb-40">
		<iframe
			title="lagos-map"
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.46311351098!2d3.119149396152939!3d6.5483693595010575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1759159434054!5m2!1sen!2sng"
			width="100%"
			height="750"
			style="border:0;"
			allowfullscreen=""
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		></iframe>
	</section>
</main>