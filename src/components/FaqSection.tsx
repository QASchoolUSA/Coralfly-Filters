export type FaqItem = { question: string; answer: string };

export function FaqSection({ title = "Frequently Asked Questions", faqs, id = "faq" }: { title?: string; faqs: FaqItem[]; id?: string }) {
  if (!faqs.length) return null;
  return <section className="faq-section" id={id} aria-labelledby={`${id}-heading`}>
    <h2 className="faq-section__title" id={`${id}-heading`}>{title}</h2>
    <div className="faq-section__list">{faqs.map((faq, index) => <details className="faq-item" key={faq.question} open={index === 0}><summary className="faq-item__question">{faq.question}</summary><div className="faq-item__answer"><p>{faq.answer}</p></div></details>)}</div>
  </section>;
}
