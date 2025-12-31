import { defineField, defineType } from 'sanity'

export const product = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'partNumber',
            title: 'Part Number',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (rule) => rule.required().min(0),
        }),
        defineField({
            name: 'productType',
            title: 'Product Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Oil Filter', value: 'oil-filter' },
                    { title: 'Fuel Filter', value: 'fuel-filter' },
                    { title: 'Air Filter', value: 'air-filter' },
                    { title: 'Cabin Air Filter', value: 'cabin-air-filter' },
                    { title: 'Fuel Water Separator', value: 'fuel-water-separator' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'brand',
            title: 'Brand',
            type: 'string',
            initialValue: 'CoralFly',
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'compatibility',
            title: 'Compatibility (Fits these cars)',
            type: 'text',
            description: 'List compatible vehicles, separated by commas or new lines.'
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            description: 'Override the default title tag for SEO',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            description: 'Meta description for SEO',
        }),
    ],
})
