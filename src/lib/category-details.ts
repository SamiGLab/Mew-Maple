export interface CategoryDetail {
  id: string;
  focusIntro: string;
  principles: string[];
}

export const categoryDetails: Record<string, CategoryDetail> = {
  play: {
    id: 'play',
    focusIntro: 'Indoor cats need purposeful daily activity that taps into natural hunting instincts: stalking, pouncing, climbing, and exploring. Our play guides focus on sustainable daily routines, safe DIY enrichment, and puzzle feeding rather than expensive gadgets.',
    principles: [
      'Interactive wand play satisfies predatory drives safely and prevents redirected frustration.',
      'Always store strand, ribbon, and feather toys immediately after supervised sessions.',
      'Rotate 2 to 3 sturdy toys weekly instead of buying endless novelties.',
    ],
  },
  homes: {
    id: 'homes',
    focusIntro: 'You do not need a huge suburban house to keep indoor cats fulfilled. Thoughtful vertical territory, clear sightlines, and smart resource distribution turn small studios and rental apartments into safe, low-conflict cat sanctuaries.',
    principles: [
      'Utilize existing furniture tops and wall-safe perches without drilling holes in rental drywall.',
      'In multi-cat homes, provide separate resource stations (food, water, litter) in distinct rooms.',
      'Position scratchers and resting pads near primary social hubs rather than tucked away in closets.',
    ],
  },
  gear: {
    id: 'gear',
    focusIntro: 'Every piece of cat furniture should earn its footprint in your home. Our buying guides compare cat trees, vertical perches, and scratching furniture against strict stability, safety, cleanability, and feline biomechanics standards.',
    principles: [
      'Stability always comes first: test base weight and post thickness before aesthetic features.',
      'Check sisal wrap height to ensure your adult cat can fully stretch vertically while scratching.',
      'Inspect suction cups, wall brackets, and mounting hardware on perches regularly for wear.',
    ],
  },
  care: {
    id: 'care',
    focusIntro: 'Day-to-day indoor cat wellbeing comes down to predictable routines, gentle environmental enrichment, and watching for subtle behavioral changes. Our everyday guides provide practical veterinary-aligned advice for calm home living.',
    principles: [
      'Keep feeding, interactive play, and quiet times predictable to reduce feline anxiety.',
      'Provide calm retreat zones where cats can rest undisturbed by household traffic or loud noises.',
      'Consult your veterinarian promptly if you notice sudden changes in litter habits, mobility, or grooming.',
    ],
  },
};
