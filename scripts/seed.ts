import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN, // Needed for write operations
    useCdn: false,
})

const VEHICLES = [
    { _id: 'volvo-vnl-gen2', make: 'Volvo', model: 'VNL', year: 2018, engine: 'D13' },
    { _id: 'volvo-vnl-gen1', make: 'Volvo', model: 'VNL', year: 2010, engine: 'D12' },
    { _id: 'kenworth-t680', make: 'Kenworth', model: 'T680', year: 2015, engine: 'PACCAR MX-13' },
    { _id: 'kenworth-t680-nextgen', make: 'Kenworth', model: 'T680 Next Gen', year: 2022, engine: 'PACCAR MX-13' },
    { _id: 'peterbilt-579', make: 'Peterbilt', model: '579', year: 2016, engine: 'PACCAR MX-13' },
    { _id: 'freightliner-cascadia-evo', make: 'Freightliner', model: 'Cascadia Evolution', year: 2015, engine: 'DD15' },
    { _id: 'freightliner-cascadia-new', make: 'Freightliner', model: 'New Cascadia', year: 2020, engine: 'DD15' },
    { _id: 'mack-anthem', make: 'Mack', model: 'Anthem', year: 2019, engine: 'MP8' },
    { _id: 'international-lt', make: 'International', model: 'LT Series', year: 2019, engine: 'A26' },
]

const PRODUCTS = [
    {
        sku: '23920469',
        name: 'Volvo Fuel Filter',
        type: 'fuel-filter',
        brand: 'Volvo',
        price: 45.99,
        vehicles: ['volvo-vnl-gen2', 'volvo-vnl-gen1', 'mack-anthem']
    },
    {
        sku: 'AF26163M',
        name: 'Fleetguard Air Filter',
        type: 'air-filter',
        brand: 'Fleetguard',
        price: 68.50,
        vehicles: ['volvo-vnl-gen2', 'volvo-vnl-gen1']
    },
    {
        sku: 'P611696',
        name: 'Kenworth Air Element',
        type: 'air-filter',
        brand: 'Paccar',
        price: 89.99,
        vehicles: ['kenworth-t680']
    },
    {
        sku: 'FS20313',
        name: 'Fuel Water Separator',
        type: 'fuel-water-separator',
        brand: 'Fleetguard',
        price: 32.75,
        vehicles: ['mack-anthem', 'volvo-vnl-gen2']
    },
    {
        sku: 'FS19915',
        name: 'Fuel Filter with Separator',
        type: 'fuel-water-separator',
        brand: 'Fleetguard',
        price: 41.25,
        vehicles: ['freightliner-cascadia-evo', 'international-lt']
    },
    {
        sku: 'D371061',
        name: 'Kenworth Air Filter',
        type: 'air-filter',
        brand: 'Kenworth',
        price: 95.00,
        vehicles: ['kenworth-t680-nextgen', 'peterbilt-579'] // Also fits newer Pete
    },
    {
        sku: '21715813',
        name: 'Volvo Air Filter',
        type: 'air-filter',
        brand: 'Volvo',
        price: 72.99,
        vehicles: ['volvo-vnl-gen2', 'volvo-vnl-gen1']
    },
    {
        sku: 'FS19765',
        name: 'Universal Fuel Water Separator',
        type: 'fuel-water-separator',
        brand: 'Fleetguard',
        price: 28.50,
        vehicles: ['kenworth-t680', 'peterbilt-579', 'volvo-vnl-gen2', 'mack-anthem', 'freightliner-cascadia-evo']
    },
    {
        sku: 'FS19764',
        name: 'Cummins Fuel Water Separator',
        type: 'fuel-water-separator',
        brand: 'Fleetguard',
        price: 35.00,
        vehicles: ['freightliner-cascadia-new', 'peterbilt-579', 'kenworth-t680']
    },
    {
        sku: '21707132',
        name: 'Volvo Bypass Oil Filter',
        type: 'oil-filter',
        brand: 'Volvo',
        price: 22.99,
        vehicles: ['volvo-vnl-gen2', 'volvo-vnl-gen1']
    },
    {
        sku: '23658092',
        name: 'Long Life Oil Filter',
        type: 'oil-filter',
        brand: 'Volvo',
        price: 38.50,
        vehicles: ['volvo-vnl-gen2']
    },
    {
        sku: '23151592',
        name: 'Volvo Oil Filter',
        type: 'oil-filter',
        brand: 'Volvo',
        price: 26.75,
        vehicles: ['volvo-vnl-gen2', 'mack-anthem']
    },
    {
        sku: 'P621725',
        name: 'Paccar Engine Air Filter',
        type: 'air-filter',
        brand: 'Paccar',
        price: 64.95,
        vehicles: ['kenworth-t680', 'peterbilt-579']
    },
    {
        sku: 'AF27879',
        name: 'Cascadia Air Filter',
        type: 'air-filter',
        brand: 'Fleetguard',
        price: 55.00,
        vehicles: ['freightliner-cascadia-evo']
    },
    {
        sku: '03-42776-010',
        name: 'Freightliner Air Filter',
        type: 'air-filter',
        brand: 'Freightliner',
        price: 58.25,
        vehicles: ['freightliner-cascadia-new']
    }
]

async function seed() {
    console.log('Starting seed...')

    // 1. Create Vehicles
    console.log('Creating vehicles...')
    const vehicleTransaction = client.transaction()
    for (const v of VEHICLES) {
        vehicleTransaction.createOrReplace({
            _id: v._id,
            _type: 'vehicle',
            make: v.make,
            model: v.model,
            year: v.year,
            engine: v.engine
        })
    }
    await vehicleTransaction.commit()
    console.log('Vehicles created.')

    // 2. Create Products
    console.log('Creating products...')
    const productTransaction = client.transaction()
    for (const p of PRODUCTS) {
        const _id = `product-${p.sku.toLowerCase()}`
        productTransaction.createOrReplace({
            _id,
            _type: 'product',
            name: `${p.name} - ${p.sku}`, // Include SKU in name nicely
            slug: { current: `${p.sku.toLowerCase()}-${p.name.toLowerCase().replace(/\s+/g, '-')}` },
            partNumber: p.sku,
            price: p.price,
            productType: p.type,
            brand: p.brand,
            compatibleVehicles: p.vehicles.map(vid => ({
                _type: 'reference',
                _ref: vid,
                _key: vid // Adding key for array uniqueness
            })),
            description: [
                {
                    _type: 'block',
                    _key: 'desc1',
                    style: 'normal',
                    children: [{ _type: 'span', text: `High quality ${p.brand} ${p.name}. Part Number: ${p.sku}.` }]
                }
            ],
            compatibility: `Fits ${p.vehicles.join(', ')}`, // Simple text fallback
            seoTitle: `${p.sku} ${p.name} | CoralFly`,
            seoDescription: `Buy ${p.sku} ${p.name} at CoralFly. Fits ${p.brand} and more.`
        })
    }
    await productTransaction.commit()
    console.log('Products created.')
    console.log('Seed complete!')
}

seed().catch(err => {
    console.error('Seed failed:', err)
    process.exit(1)
})
