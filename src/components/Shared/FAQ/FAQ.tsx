import { useState } from "react";
import SectionHeading from "../../Reusable/SectionHeading/SectionHeading";
import { ICONS } from "../../../assets";
import Container from "../Container/Container";

const FAQ = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState<number>(0);

  const faqs = [
    {
      question: "What is PMGURUKKUL?",
      answer:
        "PMGURUKKUL is a leading ed-tech company in India that provides trending courses to enhance skills required in today's world. It offers flexible courses, making online learning practical and convenient.",
    },
    {
      question: "What is the PMGURUKKUL Affiliate program?",
      answer:
        "PMGURUKKUL provides an opportunity to earn money online by promoting its courses.",
    },
    {
      question: "What is the cost of subscribing to PMGURUKKUL's courses?",
      answer: "The pricing varies based on the selected course or package.",
    },
    {
      question:
        "Can I watch the videos of my training courses immediately after I join PMGURUKKUL?",
      answer:
        "Yes, once you purchase a course, you can watch the videos immediately using your login ID.",
    },
    {
      question: "Is PMGURUKKUL a government-certified company?",
      answer:
        "Yes, PMGURUKKUL is a government certified company, registered under the Limited Liability Partnership Act 2008, Ministry of Corporate Affairs, New Delhi.",
    },
    {
      question:
        "What benefits do I get if I join PMGURUKKUL and buy the courses?",
      answer:
        "You can learn skills at your convenience and also earn a commission by promoting these courses.",
    },
    {
      question: "Can I access the course according to my convenience?",
      answer:
        "Yes, the courses are designed for easy access anytime and anywhere.",
    },
    {
      question: "Is it necessary to do KYC to become an affiliate?",
      answer:
        "Yes, you must provide your Aadhar card and PAN card to become an affiliate.",
    },
    {
      question:
        "If we want to purchase any course of PMGURUKKUL, to whom should we make the payment?",
      answer: "Payments must be made directly to the company's bank account.",
    },
    {
      question: "Do you provide any customer support?",
      answer: `Yes, we have a dedicated support team. You can contact us via email at <a href="mailto:support@pmgurukkul.com" class="text-blue-10 hover:underline font-semibold">support@pmgurukkul.com</a> or call our customer care number.`,
    },
  ];

  const handleClick = (index: number) =>
    setIsAccordionOpen((prevIndex) => (prevIndex === index ? -1 : index));

  return (
    <div className="bg-white py-[96px] flex flex-col items-center justify-center gap-[56px]">
      <SectionHeading
        heading="Got Questions? We’ve Got Answers!"
        description="Here’s everything you’ve been wondering about, explained."
      />
      <Container>
        <div className="flex gap-3 flex-col items-center justify-center w-full">
          {faqs.map((faq, index) => (
            <article
              key={index}
              className="shadow-faq-box-shadow bg-white py-[14px] px-4 w-full rounded-[10px] max-w-[600px] mx-auto border border-neutral-15"
            >
              <div
                className="flex gap-2 cursor-pointer items-center justify-between w-full"
                onClick={() => handleClick(index)}
              >
                <h1 className="text-primary-10 font-semibold">
                  {faq.question}
                </h1>
                <img
                  src={ICONS.downArrow}
                  alt="right-arrow"
                  className={`${
                    isAccordionOpen === index && "rotate-[180deg]"
                  }`}
                />
              </div>
              <div
                className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                  isAccordionOpen === index
                    ? "grid-rows-[1fr] opacity-100 mt-5"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <p
                  className="text-neutral-30 overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FAQ;
