export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Extracts FAQ question/answer pairs from guide Markdown content.
 * Looks for the "## Frequently asked questions" section and parses bold questions followed by answers.
 */
export function extractFaqs(markdown: string): FaqItem[] {
  if (!markdown) return [];
  const faqSection = markdown.match(/## Frequently asked questions([\s\S]*?)(?=##|$)/)?.[1] || '';
  const pairs: FaqItem[] = [];
  const regex = /\*\*([^*?]+\?)\*\*\s*([\s\S]*?)(?=(?:\r?\n\r?\n\*\*|$))/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(faqSection)) !== null) {
    const question = m[1].trim();
    const answer = m[2].trim().replace(/\r?\n/g, ' ').replace(/\[\d+\]/g, '').trim();
    if (question && answer) {
      pairs.push({ question, answer });
    }
  }
  return pairs;
}
