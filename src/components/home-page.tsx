import { useState, type FormEvent } from "react";
import {
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  ChevronDown,
} from "lucide-react";
import { CallButtons } from "@/components/call-buttons";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import {
  BUSINESS_NAME,
  CITY,
  INCIDENT_OPTIONS,
  PHONE_DISPLAY,
  PHONE_TEL,
  ADDRESS,
  ADDRESS_LINE,
  MAPS_URL,
  MAPS_EMBED,
  LAT,
  LNG,
  whatsappUrl,
} from "@/lib/contact";

type Incident = (typeof INCIDENT_OPTIONS)[number]["value"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EmergencyService",
  name: BUSINESS_NAME,
  telephone: PHONE_TEL,
  image: "/images/hero.jpg",
  url: MAPS_URL,
  hasMap: MAPS_URL,
  areaServed: ["João Pinheiro", "Minas Gerais", "Brasil"],
  openingHours: "Mo-Su 00:00-23:59",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Álvaro José da Silva, 351",
    addressLocality: "João Pinheiro",
    addressRegion: "MG",
    postalCode: "38770-000",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: LAT,
    longitude: LNG,
  },
  description:
    "Guincho 24 horas em João Pinheiro e região. Transporte de veículos para todo o Brasil.",
};

export function HomePage() {
  return (
    <div className="min-h-screen bg-asphalt text-fog">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="hazard-bar" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Fleet />
        <Coverage />
        <RescueForm />
        <Faq />
      </main>
      <Footer />
      <StickyCta />
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-fog/10 bg-asphalt/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#topo" className="flex min-h-11 items-center gap-3 no-underline">
          <span className="flex size-10 items-center justify-center rounded-md bg-signal text-signal-ink">
            <Truck className="size-5" strokeWidth={2.4} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold uppercase tracking-wide text-fog">
              Auto Socorro Rocha
            </span>
            <span className="block text-xs font-medium uppercase tracking-widest text-muted">
              Guincho 24 horas
            </span>
          </span>
        </a>
        <a
          href={`tel:${PHONE_TEL}`}
          className="hidden min-h-11 items-center gap-2 font-display text-xl font-semibold tracking-wide text-signal no-underline sm:flex"
        >
          <Phone className="size-5" />
          {PHONE_DISPLAY}
        </a>
        <div className="hidden lg:block">
          <CallButtons size="md" callLabel="Ligar" />
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="topo" className="relative isolate overflow-hidden">
      <img
        src="/images/hero.jpg"
        alt="Plataforma Auto Socorro Rocha em João Pinheiro"
        width={1600}
        height={900}
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover object-center outline outline-1 -outline-offset-1 outline-fog/10"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-asphalt/95 via-asphalt/55 to-asphalt/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/25 to-asphalt/40" />

      <div className="relative mx-auto flex min-h-[34rem] max-w-6xl flex-col justify-end px-4 py-16 sm:min-h-[40rem] sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-signal px-3 py-1 font-sans text-xs font-bold uppercase tracking-widest text-signal-ink">
            <span className="relative flex size-2">
              <span className="motion-pulse absolute inline-flex size-2 rounded-full bg-signal-ink" />
              <span className="relative inline-flex size-2 rounded-full bg-signal-ink" />
            </span>
            Atendimento 24 horas
          </p>
          <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-wide text-fog sm:text-7xl">
            Guincho agora
            <span className="block text-signal">em João Pinheiro</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-fog/85 sm:text-xl">
            Pane, acidente ou transporte do veículo para outro estado. O Auto
            Socorro Rocha vai até você — de madrugada, no feriado, na chuva.
          </p>
          <p className="mt-4 font-display text-3xl font-semibold tracking-wide text-signal sm:text-4xl">
            {PHONE_DISPLAY}
          </p>
          <CallButtons size="xl" className="mt-8" />
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: Clock, label: "24 horas, todos os dias" },
    { icon: MapPin, label: CITY },
    { icon: Truck, label: "Transporte para todo o Brasil" },
    { icon: ShieldCheck, label: "Resgate rápido e seguro" },
  ];
  return (
    <section className="border-y border-fog/10 bg-charcoal">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-6">
        {items.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-start gap-3">
            <Icon className="mt-0.5 size-5 shrink-0 text-signal" />
            <span className="text-sm font-medium leading-snug text-fog">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Services() {
  const cards = [
    {
      title: "Guincho 24 horas",
      copy: "Pane, acidente, pneu furado, bateria. A gente sai na hora e te tira do aperto.",
      image: "/images/resgate.jpg",
      alt: "Guincho amarelo do Auto Socorro Rocha com carro na plataforma",
    },
    {
      title: "João Pinheiro e região",
      copy: "Atendimento local com quem conhece a cidade, as estradas e o interior.",
      image: "/images/cidade.jpg",
      alt: "Guincho Auto Socorro Rocha no pátio em João Pinheiro",
    },
    {
      title: "Todo o Brasil",
      copy: "Precisa levar o veículo para outra cidade ou estado? Fazemos o transporte.",
      image: "/images/transporte.jpg",
      alt: "Frota de guinchos Rocha pronta para transporte de veículos",
    },
  ];

  return (
    <section id="servicos" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal">
        O que a gente faz
      </p>
      <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl">
        Socorro na hora.
        <span className="block text-muted">Transporte quando precisar.</span>
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className="overflow-hidden rounded-lg bg-charcoal shadow-[0_0_0_1px_rgb(245_245_240_/_0.08)]"
          >
            <img
              src={card.image}
              alt={card.alt}
              width={1600}
              height={1200}
              loading="lazy"
              className="aspect-4/3 w-full object-cover outline outline-1 -outline-offset-1 outline-fog/10"
            />
            <div className="p-6">
              <h3 className="font-display text-2xl font-semibold uppercase tracking-wide">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{card.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Fleet() {
  const shots = [
    {
      src: "/images/plataforma.jpg",
      alt: "Plataforma Auto Socorro Rocha",
      className: "md:col-span-2 md:row-span-2",
    },
    { src: "/images/resgate.jpg", alt: "Guincho com carro na plataforma" },
    { src: "/images/atendimento.jpg", alt: "Caminhão Rocha no pátio" },
    { src: "/images/cidade.jpg", alt: "Guincho amarelo no pátio em João Pinheiro" },
    { src: "/images/patio.jpg", alt: "Frota de guinchos no pátio" },
  ];

  return (
    <section id="frota" className="bg-charcoal">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal">
          A frota
        </p>
        <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl">
          Fotos reais do pátio
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Plataforma e guincho em João Pinheiro. O que você vê no Google Maps é
          o que sai na hora do chamado.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
          {shots.map((shot) => (
            <figure
              key={shot.src}
              className={`overflow-hidden rounded-lg bg-asphalt ${shot.className ?? ""}`}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                className="size-full min-h-40 object-cover outline outline-1 -outline-offset-1 outline-fog/10"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Coverage() {
  const places = [
    "João Pinheiro",
    "Paracatu",
    "Presidente Olegário",
    "Lagoa Grande",
    "Brasilândia de Minas",
    "Guarda-Mor",
    "Vazante",
    "Todo o Brasil",
  ];

  return (
    <section id="onde" className="bg-asphalt">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal">
            Onde estamos
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl">
            Panorama,
            <span className="block">João Pinheiro — MG</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Base na Rua Álvaro José da Silva, 351. Resgate na cidade e na
            região. Transporte de veículos para qualquer estado.
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 items-center gap-2 text-signal no-underline"
          >
            <MapPin className="size-5" />
            <span>
              <span className="block font-medium text-fog">{ADDRESS}</span>
              <span className="block text-sm text-muted">
                {ADDRESS_LINE} · Ver no Maps
              </span>
            </span>
          </a>
          <ul className="mt-8 flex flex-wrap gap-2">
            {places.map((place) => (
              <li
                key={place}
                className="rounded-full bg-charcoal px-3 py-1.5 text-sm text-fog shadow-[0_0_0_1px_rgb(245_245_240_/_0.1)]"
              >
                {place}
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-lg bg-charcoal shadow-[0_0_0_1px_rgb(245_245_240_/_0.08)]">
          <iframe
            title="Mapa do Auto Socorro Rocha em João Pinheiro"
            src={MAPS_EMBED}
            className="aspect-4/3 h-full min-h-72 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function RescueForm() {
  const [incident, setIncident] = useState<Incident>(INCIDENT_OPTIONS[0].value);
  const [place, setPlace] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const option = INCIDENT_OPTIONS.find((item) => item.value === incident);
    const lines = [
      "Olá, preciso de um guincho.",
      `Situação: ${option?.label ?? incident}`,
    ];
    if (place.trim()) {
      lines.push(`Local: ${place.trim()}`);
    }
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="chamar" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid gap-10 overflow-hidden rounded-lg bg-charcoal shadow-[0_0_0_1px_rgb(245_245_240_/_0.08)] lg:grid-cols-2">
        <div className="p-6 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal">
            Pedido rápido
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide">
            Chama no WhatsApp
          </h2>
          <p className="mt-3 text-muted">
            Conta o que aconteceu. A mensagem já vai montada — é só enviar.
          </p>
          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
            <label className="flex flex-col gap-2 text-sm font-medium">
              O que aconteceu
              <select
                value={incident}
                onChange={(event) =>
                  setIncident(event.target.value as Incident)
                }
                className="h-12 rounded-md bg-asphalt px-3 text-base font-normal text-fog shadow-[0_0_0_1px_rgb(245_245_240_/_0.14)] outline-none focus:shadow-[0_0_0_2px_var(--color-signal)]"
              >
                {INCIDENT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Onde você está
              <input
                value={place}
                onChange={(event) => setPlace(event.target.value)}
                placeholder="Ex.: BR-040, João Pinheiro"
                autoComplete="street-address"
                suppressHydrationWarning
                className="h-12 rounded-md bg-asphalt px-3 text-base font-normal text-fog shadow-[0_0_0_1px_rgb(245_245_240_/_0.14)] outline-none placeholder:text-muted focus:shadow-[0_0_0_2px_var(--color-signal)]"
              />
            </label>
            <Button type="submit" variant="zap" size="lg" className="w-full sm:w-auto">
              <WhatsAppIcon className="size-5" />
              Enviar no WhatsApp
            </Button>
          </form>
        </div>
        <div className="flex flex-col justify-between gap-6 bg-asphalt p-6 sm:p-10">
          <div>
            <p className="font-display text-2xl font-semibold uppercase tracking-wide">
              Prefere ligar?
            </p>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-3 block font-display text-4xl font-bold tracking-wide text-signal no-underline sm:text-5xl"
            >
              {PHONE_DISPLAY}
            </a>
            <p className="mt-3 text-sm text-muted">
              Toque no número. No celular, a chamada começa na hora.
            </p>
          </div>
          <CallButtons fullWidth />
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "Atende de madrugada e no feriado?",
    a: "Sim. Guincho 24 horas, todos os dias — inclusive madrugada, domingo e feriado.",
  },
  {
    q: "Atende só em João Pinheiro?",
    a: "Atendemos João Pinheiro e toda a região. Também fazemos transporte de veículos para qualquer lugar do Brasil.",
  },
  {
    q: "Que tipo de veículo vocês levam?",
    a: "Carros, SUVs e utilitários. No WhatsApp ou no telefone a gente confirma o modelo e o tipo de guincho.",
  },
  {
    q: "Como peço o guincho?",
    a: "Liga para (38) 99842-4385 ou manda mensagem no WhatsApp. Informe o local e o que aconteceu — o resto a gente resolve.",
  },
];

function Faq() {
  return (
    <section className="border-t border-fog/10 bg-charcoal">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="font-display text-4xl font-bold uppercase tracking-wide">
          Perguntas rápidas
        </h2>
        <div className="mt-8 divide-y divide-fog/10">
          {FAQS.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left font-medium">
                {item.q}
                <ChevronDown className="size-5 shrink-0 text-signal transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="mt-2 pr-8 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-fog/10 pb-28 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-2xl font-semibold uppercase tracking-wide">
            Auto Socorro Rocha
          </p>
          <p className="mt-1 text-sm text-muted">
            Guincho 24 horas · {ADDRESS}, {ADDRESS_LINE}
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm text-signal no-underline"
          >
            <MapPin className="size-4" />
            Ver no Google Maps
          </a>
        </div>
        <a
          href={`tel:${PHONE_TEL}`}
          className="font-display text-2xl font-semibold tracking-wide text-signal no-underline"
        >
          {PHONE_DISPLAY}
        </a>
      </div>
    </footer>
  );
}

function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-fog/10 bg-asphalt/95 p-3 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <Button asChild variant="primary" size="md" className="flex-1">
          <a href={`tel:${PHONE_TEL}`}>
            <Phone className="size-5" strokeWidth={2.4} />
            Ligar
          </a>
        </Button>
        <Button asChild variant="zap" size="md" className="flex-1">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-5" />
            WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
