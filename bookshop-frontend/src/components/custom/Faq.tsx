"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "We offer standard shipping (2-3 business days) and express shipping (1 business day). Orders are processed within 24 hours of placement.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes! We ship to over 50 countries worldwide. International shipping typically takes 7-14 business days depending on the destination.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day money-back guarantee on all books. If you're not satisfied, simply return the book in its original condition for a full refund.",
    },
    {
      question: "Can I pre-order upcoming books?",
      answer:
        "You can pre-order any upcoming release on our website. We'll ship it to you on the release date at no extra cost.",
    },
    {
      question: "Do you have a loyalty program?",
      answer:
        "Yes! Join our BookHaven Rewards program to earn points on every purchase. Accumulate points for discounts, free books, and exclusive member events.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our support team via email, phone, or live chat. We're available 24/7 to help with any questions or concerns.",
    },
  ];

  return (
    <section
      id="faq"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/5"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-2">
            Questions?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our services and policies.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden bg-card hover:border-primary/30 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="text-left font-semibold text-foreground">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-primary transition-transform flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 border-t border-border bg-muted/30">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
