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
    ],
    preview: {
        select: {
            make: 'make',
            model: 'model',
            year: 'year',
            engine: 'engine'
        },
        prepare(selection) {
            const { make, model, year, engine } = selection;
            return {
                title: `${make} ${model} ${year || ''}`,
                subtitle: engine
            }
        }
    }
})
