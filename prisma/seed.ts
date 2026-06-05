import { PrismaClient } from "@prisma/client";
import sampleIngredients from "../data/sample_ingredients.json";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding ingredient database...");

  // Check if data already exists
  const existingCount = await prisma.ingredient.count();
  if (existingCount > 0) {
    console.log(`📦 ${existingCount} ingredients already exist. Skipping seed.`);
    return;
  }

  for (const item of sampleIngredients) {
    const ingredient = await prisma.ingredient.create({
      data: {
        name: item.name,
        scientificName: item.scientific_name,
        category: item.category,
        tcmProperties: item.tcm_properties as any,
        ayurvedicProperties: item.ayurvedic_properties as any,
        folkWisdom: item.folk_wisdom,
        astrologicalAssoc: item.astrological_assoc,
        safetyNotes: item.safety_notes,
        contraindications: item.contraindications as any,
      },
    });

    // Create wellness suggestions
    if (item.rituals && Array.isArray(item.rituals)) {
      for (const ritual of item.rituals) {
        await prisma.wellnessSuggestion.create({
          data: {
            ingredientId: ingredient.id,
            tradition: ritual.tradition,
            title: ritual.title,
            description: ritual.description,
            instructions: ritual.instructions,
          },
        });
      }
    }

    console.log(`  ✅ Seeded: ${item.name}`);
  }

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });