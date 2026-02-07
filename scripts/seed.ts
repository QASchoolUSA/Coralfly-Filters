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

// Expanded Vehicle List covering common years and engines
const VEHICLES = [
    // Volvo VNL (2018-2024)
    { _id: 'volvo-vnl-2018-d13', make: 'Volvo', model: 'VNL', year: 2018, engine: 'D13', engineSize: 12.8, trim: 'TC' },
    { _id: 'volvo-vnl-2019-d13', make: 'Volvo', model: 'VNL', year: 2019, engine: 'D13', engineSize: 12.8, trim: 'TC' },
    { _id: 'volvo-vnl-2020-d13', make: 'Volvo', model: 'VNL', year: 2020, engine: 'D13', engineSize: 12.8, trim: 'TC' },
    { _id: 'volvo-vnl-2021-d13', make: 'Volvo', model: 'VNL', year: 2021, engine: 'D13', engineSize: 12.8, trim: 'TC' },
    { _id: 'volvo-vnl-2022-d13', make: 'Volvo', model: 'VNL', year: 2022, engine: 'D13', engineSize: 12.8, trim: 'TC' },
    { _id: 'volvo-vnl-2023-d13', make: 'Volvo', model: 'VNL', year: 2023, engine: 'D13', engineSize: 12.8, trim: 'TC' },
    { _id: 'volvo-vnl-2024-d13', make: 'Volvo', model: 'VNL', year: 2024, engine: 'D13', engineSize: 12.8, trim: 'TC' },
    { _id: 'volvo-vnl-2019-d11', make: 'Volvo', model: 'VNL', year: 2019, engine: 'D11', engineSize: 10.8, trim: '' },
    { _id: 'volvo-vnl-2020-d11', make: 'Volvo', model: 'VNL', year: 2020, engine: 'D11', engineSize: 10.8, trim: '' },

    // Kenworth T680 (2015-2023)
    { _id: 'kw-t680-2018-mx13', make: 'Kenworth', model: 'T680', year: 2018, engine: 'PACCAR MX-13', engineSize: 12.9, trim: '' },
    { _id: 'kw-t680-2019-mx13', make: 'Kenworth', model: 'T680', year: 2019, engine: 'PACCAR MX-13', engineSize: 12.9, trim: '' },
    { _id: 'kw-t680-2020-mx13', make: 'Kenworth', model: 'T680', year: 2020, engine: 'PACCAR MX-13', engineSize: 12.9, trim: '' },
    { _id: 'kw-t680-2021-mx13', make: 'Kenworth', model: 'T680', year: 2021, engine: 'PACCAR MX-13', engineSize: 12.9, trim: 'Next Gen' },
    { _id: 'kw-t680-2022-mx13', make: 'Kenworth', model: 'T680', year: 2022, engine: 'PACCAR MX-13', engineSize: 12.9, trim: 'Next Gen' },
    { _id: 'kw-t680-2023-mx13', make: 'Kenworth', model: 'T680', year: 2023, engine: 'PACCAR MX-13', engineSize: 12.9, trim: 'Next Gen' },
    { _id: 'kw-t680-2019-x15', make: 'Kenworth', model: 'T680', year: 2019, engine: 'Cummins X15', engineSize: 15.0, trim: '' },
    { _id: 'kw-t680-2020-x15', make: 'Kenworth', model: 'T680', year: 2020, engine: 'Cummins X15', engineSize: 15.0, trim: '' },

    // Freightliner Cascadia (2018-2023)
    { _id: 'frt-sl-2018-dd15', make: 'Freightliner', model: 'Cascadia', year: 2018, engine: 'DD15', engineSize: 14.8, trim: 'Evolution' },
    { _id: 'frt-sl-2019-dd15', make: 'Freightliner', model: 'Cascadia', year: 2019, engine: 'DD15', engineSize: 14.8, trim: 'Evolution' },
    { _id: 'frt-sl-2020-dd15', make: 'Freightliner', model: 'Cascadia', year: 2020, engine: 'DD15', engineSize: 14.8, trim: 'Evolution' },
    { _id: 'frt-sl-2021-dd15', make: 'Freightliner', model: 'Cascadia', year: 2021, engine: 'DD15', engineSize: 14.8, trim: 'Evolution' },
    { _id: 'frt-sl-2022-dd15', make: 'Freightliner', model: 'Cascadia', year: 2022, engine: 'DD15', engineSize: 14.8, trim: 'Evolution' },
    { _id: 'frt-sl-2019-dd13', make: 'Freightliner', model: 'Cascadia', year: 2019, engine: 'DD13', engineSize: 12.8, trim: '' },

    // Peterbilt 579
    { _id: 'pete-579-2019-mx13', make: 'Peterbilt', model: '579', year: 2019, engine: 'PACCAR MX-13', engineSize: 12.9, trim: '' },
    { _id: 'pete-579-2020-mx13', make: 'Peterbilt', model: '579', year: 2020, engine: 'PACCAR MX-13', engineSize: 12.9, trim: '' },
    { _id: 'pete-579-2021-mx13', make: 'Peterbilt', model: '579', year: 2021, engine: 'PACCAR MX-13', engineSize: 12.9, trim: '' },
    { _id: 'pete-579-2022-mx13', make: 'Peterbilt', model: '579', year: 2022, engine: 'PACCAR MX-13', engineSize: 12.9, trim: '' },

    // Mack Anthem
    { _id: 'mack-anthem-2019-mp8', make: 'Mack', model: 'Anthem', year: 2019, engine: 'MP8', engineSize: 12.8, trim: 'HE' },
    { _id: 'mack-anthem-2020-mp8', make: 'Mack', model: 'Anthem', year: 2020, engine: 'MP8', engineSize: 12.8, trim: 'HE' },
    { _id: 'mack-anthem-2021-mp8', make: 'Mack', model: 'Anthem', year: 2021, engine: 'MP8', engineSize: 12.8, trim: 'HE' }
]

const PRODUCTS = [
    {
        sku: '23920469',
        name: 'Volvo Fuel Filter',
        type: 'fuel-filter',
        brand: 'Volvo',
        price: 45.99,
        // Fits all Volvo VNL D13s and Mack Anthems (MP8 is same base engine)
        vehicles: [
            'volvo-vnl-2018-d13', 'volvo-vnl-2019-d13', 'volvo-vnl-2020-d13', 'volvo-vnl-2021-d13', 'volvo-vnl-2022-d13', 'volvo-vnl-2023-d13', 'volvo-vnl-2024-d13',
            'mack-anthem-2019-mp8', 'mack-anthem-2020-mp8', 'mack-anthem-2021-mp8'
        ]
    },
    {
        sku: 'AF26163M',
        name: 'Fleetguard Air Filter',
        type: 'air-filter',
        brand: 'Fleetguard',
        price: 68.50,
        // Fits older Volvos usually, but applying to newer for density
        vehicles: ['volvo-vnl-2018-d13', 'volvo-vnl-2019-d13']
    },
    {
        sku: 'P611696',
        name: 'Kenworth Air Element',
        type: 'air-filter',
        brand: 'Paccar',
        price: 89.99,
        // Fits T680s and 579s
        vehicles: [
            'kw-t680-2018-mx13', 'kw-t680-2019-mx13', 'kw-t680-2020-mx13', 'kw-t680-2021-mx13',
            'pete-579-2019-mx13', 'pete-579-2020-mx13', 'pete-579-2021-mx13'
        ]
    },
    {
        sku: 'FS20313',
        name: 'Fuel Water Separator',
        type: 'fuel-water-separator',
        brand: 'Fleetguard',
        price: 32.75,
        vehicles: ['mack-anthem-2019-mp8', 'volvo-vnl-2019-d13']
    },
    {
        sku: 'FS19915',
        name: 'Fuel Filter with Separator',
        type: 'fuel-water-separator',
        brand: 'Fleetguard',
        price: 41.25,
        vehicles: [
            'frt-sl-2018-dd15', 'frt-sl-2019-dd15', 'frt-sl-2020-dd15', 'frt-sl-2021-dd15',
            'frt-sl-2019-dd13'
        ]
    },
    {
        sku: 'D371061',
        name: 'Kenworth Air Filter',
        type: 'air-filter',
        brand: 'Kenworth',
        price: 95.00,
        vehicles: [
            'kw-t680-2021-mx13', 'kw-t680-2022-mx13', 'kw-t680-2023-mx13',
            'pete-579-2022-mx13'
        ]
    },
    {
        sku: '21715813',
        name: 'Volvo Air Filter',
        type: 'air-filter',
        brand: 'Volvo',
        price: 72.99,
        vehicles: [
            'volvo-vnl-2018-d13', 'volvo-vnl-2019-d13', 'volvo-vnl-2020-d13', 'volvo-vnl-2021-d13',
            'volvo-vnl-2019-d11'
        ]
    },
    {
        sku: 'FS19765',
        name: 'Universal Fuel Water Separator',
        type: 'fuel-water-separator',
        brand: 'Fleetguard',
        price: 28.50,
        // Fits ALMOST EVERYTHING
        vehicles: [
            'volvo-vnl-2018-d13', 'volvo-vnl-2019-d13', 'volvo-vnl-2020-d13',
            'kw-t680-2018-mx13', 'kw-t680-2019-mx13', 'kw-t680-2020-mx13',
            'frt-sl-2018-dd15', 'frt-sl-2019-dd15',
            'mack-anthem-2019-mp8'
        ]
    },
    {
        sku: 'FS19764',
        name: 'Cummins Fuel Water Separator',
        type: 'fuel-water-separator',
        brand: 'Fleetguard',
        price: 35.00,
        vehicles: [
            'frt-sl-2020-dd15', 'frt-sl-2021-dd15',
            'kw-t680-2019-x15', 'kw-t680-2020-x15'
        ]
    },
    {
        sku: '21707132',
        name: 'Volvo Bypass Oil Filter',
        type: 'oil-filter',
        brand: 'Volvo',
        price: 22.99,
        vehicles: [
            'volvo-vnl-2018-d13', 'volvo-vnl-2019-d13', 'volvo-vnl-2020-d13', 'volvo-vnl-2021-d13',
            'mack-anthem-2019-mp8', 'mack-anthem-2020-mp8'
        ]
    },
    {
        sku: '23658092',
        name: 'Long Life Oil Filter',
        type: 'oil-filter',
        brand: 'Volvo',
        price: 38.50,
        vehicles: ['volvo-vnl-2020-d13', 'volvo-vnl-2021-d13', 'volvo-vnl-2022-d13']
    },
    {
        sku: '23151592',
        name: 'Volvo Oil Filter',
        type: 'oil-filter',
        brand: 'Volvo',
        price: 26.75,
        vehicles: ['volvo-vnl-2018-d13', 'volvo-vnl-2019-d13', 'mack-anthem-2019-mp8']
    },
    {
        sku: 'P621725',
        name: 'Paccar Engine Air Filter',
        type: 'air-filter',
        brand: 'Paccar',
        price: 64.95,
        vehicles: [
            'kw-t680-2018-mx13', 'kw-t680-2019-mx13', 'kw-t680-2020-mx13',
            'pete-579-2019-mx13', 'pete-579-2020-mx13'
        ]
    },
    {
        sku: 'AF27879',
        name: 'Cascadia Air Filter',
        type: 'air-filter',
        brand: 'Fleetguard',
        price: 55.00,
        vehicles: ['frt-sl-2018-dd15', 'frt-sl-2019-dd15']
    },
    {
        sku: '03-42776-010',
        name: 'Freightliner Air Filter',
        type: 'air-filter',
        brand: 'Freightliner',
        price: 58.25,
        vehicles: ['frt-sl-2020-dd15', 'frt-sl-2021-dd15', 'frt-sl-2022-dd15']
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
            engine: v.engine,
            engineSize: v.engineSize,
            trim: v.trim
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
