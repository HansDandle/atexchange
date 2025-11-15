const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function importVenues() {
    const venues = JSON.parse(fs.readFileSync('venues.json', 'utf-8'));

    for (const venue of venues) {
        try {
            await prisma.venue.create({
                data: {
                    name: venue.name,
                    address: venue.address,
                },
            });
            console.log(`Imported: ${venue.name}`);
        } catch (error) {
            console.error(`Failed to import ${venue.name}:`, error);
        }
    }

    console.log('Venue import complete.');
}

importVenues()
    .catch((error) => console.error('Error importing venues:', error))
    .finally(async () => await prisma.$disconnect());