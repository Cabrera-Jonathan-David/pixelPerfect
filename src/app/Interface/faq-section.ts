import { FaqQuestion } from "./faq-question";

export interface FaqSection {
    title: string;
    questions: FaqQuestion[];
}
