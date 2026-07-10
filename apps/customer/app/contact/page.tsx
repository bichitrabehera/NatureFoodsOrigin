import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { SectionHeading } from "@/components/sections/section-heading";
import { ContactCard } from "@/components/shared/contact-card";

const contactItems = [
  {
    id: "1",
    icon: MapPin,
    label: "Address",
    value: "123 Green Street, Nature Valley, NY 10001",
  },
  {
    id: "2",
    icon: Phone,
    label: "Phone",
    value: "+91 99169 18565",
  },
  {
    id: "3",
    icon: Mail,
    label: "Email",
    value: "naturefoodsorigin@gmail.com",
  },
  {
    id: "4",
    icon: Clock,
    label: "Opening Hours",
    value: "Mon–Sat: 8AM–10PM\nSun: 9AM–9PM",
  },
];

export default function Page() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="We'd love to hear from you. Reach out or visit us anytime."
        />

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-6 sm:grid-cols-2">
            {contactItems.map((item) => (
              <ContactCard
                key={item.id}
                icon={item.icon}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>

          <div className="overflow-hidden rounded-[32px] border-2 border-[#0D530E] bg-white ">
            <iframe
              title="Nature Foods Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d289.00089328267063!2d77.71510989088421!3d12.951553273651939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13005deabdef%3A0xbdd17193fd9c1f1a!2sAsha%20Tiffins!5e0!3m2!1sen!2sin!4v1783629781997!5m2!1sen!2sin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full border-0 lg:h-full lg:min-h-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
