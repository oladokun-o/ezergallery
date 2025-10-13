<script>
  import { fly, fade } from "svelte/transition";
  export let show = false;
  export let orderDetails = {};
  export let isLoading = false; // Show loader first


   function goHome() {


    // Redirect to homepage
    window.location.href = "/";
  }
</script>

{#if show}
  <!-- Overlay backdrop -->
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-black mx-3" transition:fade>
    <div
      class="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 transform transition-all duration-500"
      in:fly={{ y: 100, duration: 400 }}
      out:fly={{ y: -100, duration: 300 }}
    >
      {#if isLoading}
        <!-- Loader -->
        <div class="flex flex-col items-center justify-center py-10">
          <svg
            class="animate-spin h-10 w-10 text-blue-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          <p class="text-gray-600">Processing your order...</p>
        </div>
      {:else}
        <!-- Success content -->
        <h2 class="text-2xl font-bold text-green-600 mb-4">
           Order Completed Successfully!
        </h2>
        <p class="text-gray-700 mb-4">
          Thank you, {orderDetails.customer?.name}. Your order has been placed successfully.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <!-- Order Details -->
          <div>
            <h3 class="font-semibold text-lg mb-2">Order Details</h3>
            <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
            <p><strong>Total:</strong> ₦{Number(orderDetails.total).toLocaleString()}.00</p>
            <p><strong>Shipping Fee:</strong> ₦{orderDetails.shippingFee.toLocaleString()}.00</p>
          </div>

          <!-- Customer Details -->
          <div>
            <h3 class="font-semibold text-lg mb-2">Customer Details</h3>
            <p><strong>Name:</strong> {orderDetails.customer?.name}</p>
            <p><strong>Email:</strong> {orderDetails.customer?.email}</p>
            <p><strong>Phone:</strong> {orderDetails.customer?.phone}</p>
          </div>

          <!-- Billing Address -->
          <div>
            <h3 class="font-semibold text-lg mb-2">Billing Address</h3>
            <p>{orderDetails.billing?.address}</p>
            <p>{orderDetails.billing?.city}, {orderDetails.billing?.state}</p>
            <p>{orderDetails.billing?.country}</p>
          </div>

          <!-- Payment Method -->
          <div>
            <h3 class="font-semibold text-lg mb-2">Payment Method</h3>
            <p>{orderDetails.payment?.method}</p>
            <p><strong>Status:</strong> {orderDetails.payment?.status}</p>
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <button
            on:click={goHome}
            class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}
