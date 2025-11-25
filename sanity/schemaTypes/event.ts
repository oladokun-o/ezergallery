import { defineType, defineField } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Event Description',
      type: 'array',
      of: [
        {
          type: 'block',
          // Styles let you define what blocks can be marked up as
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          // Marks let you mark up inline text
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
              {
                title: 'Text Color',
                name: 'color',
                type: 'object',
                fields: [
                  {
                    title: 'Color',
                    name: 'hex',
                    type: 'string',
                    options: {
                      list: [
                        { title: 'Blue', value: '#306b86' },
                        { title: 'Light Blue', value: '#b8d6ee' },
                        { title: 'White', value: '#ffffff' },
                        { title: 'Gray', value: '#6b7280' },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        },
        // You can also add images directly in the text
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    // Event Details
    defineField({
      name: 'startDate',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'doorTime',
      title: 'Door Time',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Event Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'upcoming',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      status: 'status',
    },
    prepare(selection) {
      const { title, media, status } = selection
      return {
        title: title,
        subtitle: status || 'Upcoming',
        media: media,
      }
    },
  },
})