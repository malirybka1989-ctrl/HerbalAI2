import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ingredients = [
  {
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    category: 'Spice',
    tcmProperties: JSON.stringify({ nature: 'Warm', taste: 'Pungent', meridians: ['Lung', 'Spleen', 'Stomach'] }),
    ayurvedicProperties: JSON.stringify({ dosha: 'Balances Vata and Kapha', guna: 'Dry/Light' }),
    folkWisdom: 'Traditionally used in many cultures as a warming digestive support.',
    astrologicalAssoc: 'Mars',
    safetyNotes: 'Generally safe in culinary amounts.',
    contraindications: JSON.stringify(['Blood-thinning medication', 'Gallstones']),
    wellnessSuggestions: {
      create: [
        {
          tradition: 'TCM',
          title: 'Warming Ginger Infusion',
          description: 'Traditionally used to warm the body and support digestion.',
          instructions: 'Steep 3-5 thin slices of fresh ginger in hot water for 10 minutes.',
          safetyDisclaimer: 'Avoid if you have a stomach ulcer or are on blood thinners without consulting a doctor.',
        },
      ],
    },
  },
  {
    name: 'Peppermint',
    scientificName: 'Mentha piperita',
    category: 'Herb',
    tcmProperties: JSON.stringify({ nature: 'Cool', taste: 'Pungent', meridians: ['Liver', 'Lung'] }),
    ayurvedicProperties: JSON.stringify({ dosha: 'Balances all three doshas', guna: 'Light/Dry' }),
    folkWisdom: 'Known for its refreshing aroma and traditional use in soothing digestive comfort.',
    astrologicalAssoc: 'Mercury',
    safetyNotes: 'Avoid if you have severe acid reflux.',
    contraindications: JSON.stringify(['GERD']),
    wellnessSuggestions: {
      create: [
        {
          tradition: 'Acupressure',
          title: 'Refreshing Temple Ritual',
          description: 'Combine the scent of peppermint with gentle pressure for a mid-day refresh.',
          instructions: 'Inhale the scent of fresh peppermint while gently massaging the temples in circular motions.',
        },
      ],
    },
  },
  {
    name: 'Turmeric',
    scientificName: 'Curcuma longa',
    category: 'Spice',
    tcmProperties: JSON.stringify({ nature: 'Warm', taste: 'Bitter/Pungent', meridians: ['Spleen', 'Stomach', 'Liver', 'Heart'] }),
    ayurvedicProperties: JSON.stringify({ dosha: 'Balances Kapha', guna: 'Dry/Light' }),
    folkWisdom: 'A cornerstone of Ayurvedic wellness, traditionally used for vitality and joint comfort.',
    astrologicalAssoc: 'Jupiter',
    safetyNotes: 'May stain surfaces and clothing.',
    contraindications: JSON.stringify(['Bile duct obstruction', 'Pregnancy (in medicinal amounts)']),
    wellnessSuggestions: {
      create: [
        {
          tradition: 'Ayurveda',
          title: 'Golden Milk Ritual',
          description: 'A traditional evening ritual for grounding and vitality.',
          instructions: 'Whisk 1/2 tsp turmeric into 1 cup of warm plant-based milk with a pinch of black pepper.',
        },
      ],
    },
  },
  {
    name: 'Chamomile',
    scientificName: 'Matricaria chamomilla',
    category: 'Herb',
    tcmProperties: JSON.stringify({ nature: 'Neutral/Cool', taste: 'Bitter/Sweet', meridians: ['Liver', 'Spleen', 'Stomach'] }),
    ayurvedicProperties: JSON.stringify({ dosha: 'Balances Pitta and Kapha', guna: 'Dry/Light' }),
    folkWisdom: 'One of the most beloved herbs in European folk tradition for evening relaxation.',
    astrologicalAssoc: 'Sun',
    safetyNotes: 'Avoid if you have a known allergy to ragweed or the Asteraceae family.',
    contraindications: JSON.stringify(['Ragweed allergy']),
    wellnessSuggestions: {
      create: [
        {
          tradition: 'Folk Wisdom',
          title: 'Starlight Steep',
          description: 'A gentle ritual to signal the transition to rest.',
          instructions: 'Steep 1 tbsp of dried chamomile flowers in hot water for 5 minutes before bed.',
        },
      ],
    },
  },
  {
    name: 'Cinnamon',
    scientificName: 'Cinnamomum verum',
    category: 'Spice',
    tcmProperties: JSON.stringify({ nature: 'Hot', taste: 'Pungent/Sweet', meridians: ['Heart', 'Kidney', 'Liver', 'Spleen'] }),
    ayurvedicProperties: JSON.stringify({ dosha: 'Balances Vata and Kapha', guna: 'Light/Dry/Penetrating' }),
    folkWisdom: 'Traditionally associated with warmth, abundance, and digestive fire.',
    astrologicalAssoc: 'Sun',
    safetyNotes: 'Cassia cinnamon contains coumarin; Ceylon (true) cinnamon is preferred for regular use.',
    contraindications: JSON.stringify(['Liver disease (if using Cassia)']),
    wellnessSuggestions: {
      create: [
        {
          tradition: 'Astrology',
          title: 'Solar Vitality Brew',
          description: 'Cinnamon is ruled by the Sun and is traditionally used to support inner warmth.',
          instructions: 'Add a cinnamon stick to your morning tea or coffee to invite solar energy into your day.',
        },
      ],
    },
  },
  {
    name: 'Honey',
    scientificName: null,
    category: 'Household',
    tcmProperties: JSON.stringify({ nature: 'Neutral', taste: 'Sweet', meridians: ['Lung', 'Spleen', 'Large Intestine'] }),
    ayurvedicProperties: JSON.stringify({ dosha: 'Balances Vata and Kapha', guna: 'Heavy' }),
    folkWisdom: 'Used across cultures as a natural sweetener and for throat comfort.',
    astrologicalAssoc: 'Venus',
    safetyNotes: 'Not suitable for infants under 1 year old.',
    contraindications: JSON.stringify(['Infants under 1 year']),
    wellnessSuggestions: {
      create: [
        {
          tradition: 'Folk Wisdom',
          title: 'Honey Comfort Ritual',
          description: 'A simple soothing ritual passed down through generations.',
          instructions: 'Stir 1 tsp of raw honey into warm water or tea for a comforting moment.',
        },
      ],
    },
  },
  {
    name: 'Lemon',
    scientificName: 'Citrus limon',
    category: 'Fruit',
    tcmProperties: JSON.stringify({ nature: 'Cool', taste: 'Sour', meridians: ['Liver', 'Stomach', 'Lung'] }),
    ayurvedicProperties: JSON.stringify({ dosha: 'Balances Kapha, increases Vata and Pitta', guna: 'Light' }),
    folkWisdom: 'A traditional morning ritual in many cultures to freshen and invigorate.',
    astrologicalAssoc: 'Moon',
    safetyNotes: 'May erode tooth enamel if consumed undiluted.',
    contraindications: JSON.stringify(['Citrus allergy']),
    wellnessSuggestions: {
      create: [
        {
          tradition: 'Ayurveda',
          title: 'Morning Zest Ritual',
          description: 'A cleansing morning ritual to awaken the senses.',
          instructions: 'Squeeze half a lemon into warm water and sip first thing in the morning.',
        },
      ],
    },
  },
  {
    name: 'Garlic',
    scientificName: 'Allium sativum',
    category: 'Spice',
    tcmProperties: JSON.stringify({ nature: 'Warm', taste: 'Pungent', meridians: ['Spleen', 'Stomach', 'Lung', 'Large Intestine'] }),
    ayurvedicProperties: JSON.stringify({ dosha: 'Balances Vata and Kapha', guna: 'Heavy/Oily' }),
    folkWisdom: 'A staple in European folk tradition for winter wellness.',
    astrologicalAssoc: 'Mars',
    safetyNotes: 'May interact with blood-thinning medications.',
    contraindications: JSON.stringify(['Blood-thinning medication', 'Upcoming surgery']),
    wellnessSuggestions: {
      create: [
        {
          tradition: 'TCM',
          title: 'Warming Garlic Tonic',
          description: 'Traditional use of garlic to support the body during cold seasons.',
          instructions: 'Crush 1 clove of garlic, let it sit for 10 minutes, then add to warm broth.',
        },
      ],
    },
  },
];

async function main() {
  console.log('🌱 Seeding ingredient database...');

  for (const data of ingredients) {
    const { wellnessSuggestions, ...ingredientData } = data;
    await prisma.ingredient.upsert({
      where: { name: ingredientData.name },
      update: ingredientData,
      create: {
        ...ingredientData,
        wellnessSuggestions,
      },
    });
    console.log(`  ✅ ${ingredientData.name}`);
  }

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });