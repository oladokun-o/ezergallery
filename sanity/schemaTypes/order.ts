import { defineType, defineField } from 'sanity'

export const order = defineType({
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    defineField({
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    }),
    // Customer Information
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string',
    }),
    // Billing Address
    defineField({
      name: 'billingAddress',
      title: 'Billing Address',
      type: 'object',
      fields: [
        { name: 'address', type: 'string', title: 'Street Address' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'state', type: 'string', title: 'State/Province' },
        { name: 'zipcode', type: 'string', title: 'Zip/Postal Code' },
        { name: 'country', type: 'string', title: 'Country' },
      ],
    }),
    // Order Items
    defineField({
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'productId', type: 'string', title: 'Product ID' },
            { name: 'title', type: 'string', title: 'Product Title' },
            { name: 'price', type: 'number', title: 'Price' },
            { name: 'qty', type: 'number', title: 'Quantity' },
            { name: 'image', type: 'string', title: 'Product Image URL' },
          ],
        },
      ],
    }),
    // Payment & Totals
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Failed', value: 'failed' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'shippingFee',
      title: 'Shipping Fee',
      type: 'number',
    }),
    defineField({
      name: 'total',
      title: 'Total Amount',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      orderId: 'orderId',
      customerName: 'customerName',
      total: 'total',
      status: 'status',
    },
    prepare(selection) {
      const { orderId, customerName, total, status } = selection
      return {
        title: `${orderId} - ${customerName}`,
        subtitle: `₦${total?.toLocaleString()}.00 • ${status}`,
      }
    },
  },
})