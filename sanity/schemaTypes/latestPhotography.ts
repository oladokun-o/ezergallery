import { defineType, defineField } from 'sanity'

export const latestPhotography = defineType({
  name: 'latestPhotography',
  title: 'Latest Photography',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
})