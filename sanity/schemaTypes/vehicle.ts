import { defineField, defineType } from 'sanity'

export const vehicle = defineType({
    name: 'vehicle',
    title: 'Vehicle',
    type: 'document',
    fields: [
        defineField({
            name: 'make',
            title: 'Make',
            type: 'string',
            options: {
                list: [
                    { title: 'Volvo', value: 'Volvo' },
                    { title: 'Kenworth', value: 'Kenworth' },
                    { title: 'Freightliner', value: 'Freightliner' },
                    { title: 'Peterbilt', value: 'Peterbilt' }, // Common
                    { title: 'Mack', value: 'Mack' }, // Common
                    { title: 'International', value: 'International' }, // Common
                ]
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'model',
            title: 'Model',
            type: 'string',
            validation: (rule) => rule.required(),
            description: 'e.g., VNL, T680, Cascadia'
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'number',
            description: 'e.g., 2023. Leave blank if generic for all years of this model iteration.'
        }),
        defineField({
            name: 'engine',
            title: 'Engine',
            type: 'string',
            description: 'e.g., D13, ISX15'
        }),
        defineField({
            name: 'engineSize',
            title: 'Engine Size (L)',
            type: 'number',
            description: 'e.g., 12.8',
            validation: (rule) => rule.precision(1)
        }),
        defineField({
            name: 'trim',
            title: 'Trim/Notes',
            type: 'string',
            description: 'e.g., EcoTorque, X15 Performance'
        }),
    ],
    preview: {
        select: {
            make: 'make',
            model: 'model',
            year: 'year',
            engine: 'engine',
            size: 'engineSize'
        },
        prepare(selection) {
            const { make, model, year, engine, size } = selection;
            return {
                title: `${make} ${model} ${year || ''}`,
                subtitle: `${engine} ${size ? `(${size}L)` : ''}`
            }
        }
    }
})
