import { defineType, defineField } from "sanity";

export default defineType({
  name: "featuredProducts",
  title: "Featured Products",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      description: "Title for the featured products section (e.g., 'Shop Prints')",
      initialValue: "Shop Prints",
    }),
    defineField({
      name: "products",
      title: "Featured Products",
      type: "array",
      description: "Select up to 3 products to feature on the homepage",
      validation: (Rule) => Rule.max(3).required(),
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Order in which this section appears (lower numbers appear first)",
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: "title",
      productCount: "products.length",
    },
    prepare({ title, productCount }) {
      return {
        title: title || "Featured Products",
        subtitle: `${productCount || 0} products selected`,
      };
    },
  },
});