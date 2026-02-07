
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { createClient } from 'next-sanity';
import dotenv from 'dotenv';
import { basename } from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Initialize Sanity client
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN, // Needed for write operations
    useCdn: false,
});

const CSV_FILE_PATH = path.resolve(process.cwd(), 'wc-product-export-7-2-2026-1770454935660.csv');

async function downloadImage(url: string): Promise<Buffer | null> {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
    } catch (error) {
        console.error(`Error downloading image ${url}:`, error);
        return null;
    }
}

async function uploadImageToSanity(buffer: Buffer, filename: string) {
    try {
        const asset = await client.assets.upload('image', buffer, {
            filename: filename
        });
        return asset;
    } catch (error) {
        console.error(`Error uploading image ${filename} to Sanity:`, error);
        return null;
    }
}

// Helper to determine product type from CSV data
function getProductType(category: string, name: string): string {
    const lowerCat = category?.toLowerCase() || '';
    const lowerName = name?.toLowerCase() || '';

    if (lowerCat.includes('lamp') || lowerName.includes('lamp')) return 'lamp';
    if (lowerCat.includes('kit') || lowerName.includes('kit')) return 'multi-system-filter-kit';
    if (lowerName.includes('fuel water separator')) return 'fuel-water-separator';
    if (lowerName.includes('fuel filter')) return 'fuel-filter';
    if (lowerName.includes('oil filter')) return 'oil-filter';
    if (lowerName.includes('cabin')) return 'cabin-air-filter';
    if (lowerName.includes('air filter')) return 'air-filter';

    return 'other'; // Fallback, though schema might not allow it directly if strict
}

async function importProducts() {
    console.log('Starting product import...');

    interface CSVRecord {
        ID: string;
        Type: string;
        SKU: string;
        Name: string;
        Published: string;
        "Is featured?": string;
        "Visibility in catalog": string;
        "Short description": string;
        Description: string;
        "Regular price": string;
        Categories: string;
        Images: string;
        [key: string]: string;
    }

    try {
        const fileContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            bom: true
        }) as CSVRecord[];

        console.log(`Found ${records.length} records to process.`);

        for (const record of records) {
            const sku = record['SKU'];
            const name = record['Name'];

            if (!sku || !name) {
                console.warn('Skipping record with missing SKU or Name:', record);
                continue;
            }

            console.log(`Processing ${sku}: ${name}`);

            // texture images
            const imageUrls = record['Images']
                ? record['Images'].split(',').map((url: string) => url.trim())
                : [];

            const imageAssets = [];
            for (const url of imageUrls) {
                if (!url) continue;
                console.log(`  Downloading image: ${url}`);
                const buffer = await downloadImage(url);
                if (buffer) {
                    const filename = basename(url);
                    const asset = await uploadImageToSanity(buffer, filename);
                    if (asset) {
                        imageAssets.push({
                            _type: 'image',
                            asset: {
                                _type: 'reference',
                                _ref: asset._id
                            }
                        });
                    }
                }
            }

            const productType = getProductType(record['Categories'], name);
            const price = parseFloat(record['Regular price']) || 0;

            // Generate a slug
            const slug = record['Name']
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');

            // Generate a safe ID from SKU
            const sanitizedSku = sku.toLowerCase().replace(/[^a-z0-9_\-]/g, '-');
            // Helper to strip HTML tags
            function stripHtml(html: string): string {
                if (!html) return '';
                return html
                    .replace(/<br\s*\/?>/gi, '\n')
                    .replace(/<\/p>/gi, '\n\n')
                    .replace(/<\/div>/gi, '\n')
                    .replace(/<\/li>/gi, '\n')
                    .replace(/<[^>]+>/g, '') // Strip remaining tags
                    .replace(/&nbsp;/g, ' ')
                    .replace(/&amp;/g, '&')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/\n\s*\n/g, '\n\n') // Collapse multiple newlines
                    .trim();
            }

            const descriptionText = stripHtml(record['Description'] || record['Short description'] || '');

            const productDoc = {
                _id: `product-${sanitizedSku}`,
                _type: 'product',
                name: name,
                slug: { _type: 'slug', current: slug },
                partNumber: sku,
                price: price,
                productType: productType,
                brand: 'CoralFly', // Defaulting as per previous logic, or extract if available
                images: imageAssets,
                description: [
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [
                            {
                                _type: 'span',
                                text: descriptionText
                            }
                        ]
                    }
                ],
                seoTitle: `${name} | CoralFly`,
                seoDescription: descriptionText.slice(0, 160)
            };

            await client.createOrReplace(productDoc);
            console.log(`  Created/Updated product: ${productDoc._id}`);
        }

        console.log('Import complete!');

    } catch (error) {
        console.error('Import failed:', error);
    }
}

importProducts();
