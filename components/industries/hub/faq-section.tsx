'use client';

import content from '@/content/industries-hub.json';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus, Minus } from 'lucide-react';
import { Accordion, AccordionItem } from '@/components/ui/accordion';

export default function FaqSection() {
  const c = content.faq;
  const items = c.items;

  return (
    <section className='bg-black py-20 md:py-28'>
      <div className='mx-auto max-w-[960px] px-6'>
        <div className='mb-10 text-center md:mb-14'>
          <p className='text-overline mb-4 font-public font-semibold text-secondary'>
            {c.overline}
          </p>
          <h2 className='text-title-h4 font-anybody text-white'>{c.title}</h2>
        </div>

        <Accordion type='single' collapsible defaultValue='faq-0' className='w-full'>
          {items.map((item, index) => (
            <AccordionItem key={item.q} value={`faq-${index}`} className='border-white/15 border-b'>
              <AccordionPrimitive.Header className='flex'>
                <AccordionPrimitive.Trigger className='group flex w-full items-center justify-between gap-4 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-secondary'>
                  <h3 className='font-anybody text-base font-bold text-white transition-colors group-hover:text-secondary group-data-[state=open]:text-secondary md:text-lg'>
                    {item.q}
                  </h3>
                  <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded border border-white/60 text-white group-data-[state=open]:border-secondary group-data-[state=open]:bg-secondary group-data-[state=open]:text-absolute-black'>
                    <Plus className='h-4 w-4 group-data-[state=open]:hidden' />
                    <Minus className='h-4 w-4 group-data-[state=closed]:hidden' />
                  </span>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              {/* forceMount keeps every answer in the HTML for crawlers and AI engines; closed answers are only visually hidden */}
              <AccordionPrimitive.Content
                forceMount
                className='overflow-hidden data-[state=closed]:hidden'
              >
                <p className='pb-6 pr-12 font-public text-body-line leading-relaxed text-white/70'>
                  {item.a}
                </p>
              </AccordionPrimitive.Content>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
