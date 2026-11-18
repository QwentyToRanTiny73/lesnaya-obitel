// Готовые сценарии поездки: размещение + занятия. Цены не выдумываем —
// считаем проживание из domiki.json, остальное гость отмечает в заявке.
import domiki from "./domiki.json";
import { activityLabels } from "./bookingOptions";
import { perPerson } from "../lib/price";

interface TripSource {
  id: string;
  title: string;
  who: string;
  /** На сколько гостей рассчитан сценарий — по нему цена с человека и число гостей в заявке */
  guests: number;
  type: string;
  nights: number;
  activities: string[];
  text: string;
}

const sources: TripSource[] = [
  {
    id: "vdvoem",
    title: "Выходные вдвоём",
    who: "пара",
    guests: 2,
    type: "domik-4",
    nights: 2,
    activities: ["banya", "degustacia", "terenkur"],
    text: "Домик в стороне от дорожек, вечер в бане и бассейне, дегустация вин Красного Камня, утром прогулка к роднику.",
  },
  {
    id: "kompaniya",
    title: "Семьёй или компанией",
    who: "до 8 человек",
    guests: 8,
    type: "domik-6-8",
    nights: 3,
    activities: ["krasny-kamen", "ebikes", "moreprodukty"],
    text: "Подъём на Красный Камень, электробайки до яйлы, вечером устрицы и мидии с Донузлава у гриль-бара.",
  },
  {
    id: "vino",
    title: "Винные выходные",
    who: "до 6 человек",
    guests: 6,
    type: "apartamenty",
    nights: 2,
    activities: ["degustacia", "moreprodukty", "banya"],
    text: "Апартаменты с кухней и джакузи, дегустация вин Красного Камня, устрицы с бокалом Кокура, баня перед ужином.",
  },
];

export const trips = sources.map((t) => {
  const d = domiki.find((x) => x.id === t.type)!;
  const params = new URLSearchParams({ type: t.type, guests: String(t.guests) });
  for (const a of t.activities) params.append("activity", a);
  return {
    ...t,
    stayTitle: d.title,
    stayFrom: d.prices.offseason * t.nights,
    perPersonNight: perPerson(d.prices.offseason, t.guests),
    activityLabels: t.activities.map((a) => activityLabels[a] ?? a),
    bookingQuery: params.toString(),
  };
});
