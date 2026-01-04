import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { vehicle } from './vehicle'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [product, vehicle],
}
