import { PrismaClient } from "@prisma/client";
import seedDataRaw from "../data/seed-ingredients.json";

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const seedData: any[] = seedDataRaw as any[];

async function main() {
  console.log("🌱 Seeding ingredient database...");

  const existingCount = await prisma.ingredient.count();
  if (existingCount > 0) {
    console.log(`📦 ${existingCount} ingredients already exist. Skipping seed.`);
    return;
  }

  for (const item of seedData) {
    const ingredient = await prisma.ingredient.create({
      data: {
        name: item.name,
        scientificName: item.scientific_name || null,
        category: item.category || "Other",
        tcmProperties: item.tcm_properties || {},
        ayurvedicProperties: item.ayurvedic_properties || {},
        folkWisdom: item.folk_wisdom || null,
        astrologicalAssoc: item.astrological_assoc || null,
        safetyNotes: item.safety_notes || null,
        contraindications: item.contraindications || [],
      },
    });

    // Create wellness suggestions from rituals
    if (item.rituals && Array.isArray(item.rituals)) {
      for (const ritual of item.rituals) {
        await prisma.wellnessSuggestion.create({
          data: {
            ingredientId: ingredient.id,
            tradition: ritual.tradition || "Folk",
            title: ritual.title || `${item.name} Ritual`,
            description: ritual.description || "",
            instructions: ritual.instructions || "",
          },
        });
      }
    }

    console.log(`  ✅ ${item.name}`);
  }

  console.log(`🎉 Seeded ${seedData.length} ingredients with rituals!`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });