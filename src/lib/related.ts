export interface PostLike {
  id: string;
  data: {
    title: string;
    description: string;
    category: string;
  };
}

const stopWords = new Set([
  'this', 'that', 'with', 'from', 'have', 'your', 'will', 'what', 'when',
  'which', 'their', 'there', 'about', 'more', 'some', 'than', 'them', 'these',
  'only', 'also', 'into', 'just', 'does', 'guide', 'ideas', 'indoor', 'cats', 'cat'
]);

function extractKeywords(post: PostLike): Set<string> {
  const text = `${post.data.title} ${post.data.description}`.toLowerCase();
  return new Set(text.split(/[^a-z0-9]+/).filter(w => w.length > 3 && !stopWords.has(w)));
}

export function getRelatedGuides<T extends PostLike>(
  current: T,
  candidates: T[],
  limit: number = 3
): T[] {
  const currentKeywords = extractKeywords(current);

  const scored = candidates
    .filter(p => p.id !== current.id)
    .map(candidate => {
      let score = 0;
      if (candidate.data.category === current.data.category) {
        score += 10;
      }
      const candidateKeywords = extractKeywords(candidate);
      for (const kw of currentKeywords) {
        if (candidateKeywords.has(kw)) {
          score += 3;
        }
      }
      return { post: candidate, score };
    });

  scored.sort((a, b) => b.score - a.score || a.post.data.title.localeCompare(b.post.data.title));
  return scored.slice(0, limit).map(item => item.post);
}
