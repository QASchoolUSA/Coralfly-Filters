
import { createClient } from 'next-sanity';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Initialize Sanity client
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function verify() {
    try {
        const query = `*[_type == "product"][0..2]{_id, name, "description": description[0].children[0].text}`;
        const products = await client.fetch(query);
        console.log(`Checking descriptions for ${products.length} products...`);
        products.forEach((p: any) => {
            console.log(`\nProduct: ${p.name}`);
            console.log(`Description: ${p.description.substring(0, 200)}...`);
        });
    } catch (error) {
        console.error("Verification failed:", error);
    }
}

verify();
