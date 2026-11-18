// Все фотографии сайта и подписи к ним — в одном месте.
// Исходники лежат в src/assets/photos/ (уже уменьшены, без EXIF и геометок).
// Astro при сборке делает из них AVIF/WebP нужных размеров.
//
// Добавить фото: положите JPG в src/assets/photos/, импортируйте здесь
// и передайте в нужный компонент (Photo, PageHero, ArtTile, Gallery).
import type { ImageMetadata } from "astro";

import ayuDagPanorama from "../assets/photos/ayu-dag-panorama.jpg";
import ayuDagTuman from "../assets/photos/ayu-dag-tuman.jpg";
import territoriyaSverhu from "../assets/photos/territoriya-sverhu.jpg";
import domik16 from "../assets/photos/domik-16.jpg";
import domikTerrasa from "../assets/photos/domik-terrasa.jpg";
import gamak from "../assets/photos/gamak.jpg";
import grilBarRaduga from "../assets/photos/gril-bar-raduga.jpg";
import vezdSkala from "../assets/photos/vezd-skala.jpg";
import ploshchadka from "../assets/photos/ploshchadka.jpg";
import futbolnoePole from "../assets/photos/futbolnoe-pole.jpg";
import kuhnya from "../assets/photos/kuhnya.jpg";
import kuhnyaPlita from "../assets/photos/kuhnya-plita.jpg";
import prihozhaya from "../assets/photos/prihozhaya.jpg";
import spalnya from "../assets/photos/spalnya.jpg";
import elektrobajki from "../assets/photos/elektrobajki.jpg";
import degustaciya from "../assets/photos/degustaciya.jpg";
import rybalka from "../assets/photos/rybalka.jpg";

export interface SitePhoto {
  src: ImageMetadata;
  /** Описание для незрячих и поисковиков */
  alt: string;
  /** Короткая подпись в галерее */
  caption?: string;
  /** Точка фокуса при кадрировании (CSS object-position) */
  position?: string;
}

export const photos = {
  ayuDagPanorama: {
    src: ayuDagPanorama,
    alt: "Вид с территории базы на гору Аю-Даг и море, на переднем плане сад и спортивная площадка",
    position: "30% 55%",
  },
  ayuDagTuman: {
    src: ayuDagTuman,
    alt: "Аю-Даг над облаками, вид от спортивных площадок базы",
    caption: "Аю-Даг в облаках — вид от футбольного поля",
  },
  territoriyaSverhu: {
    src: territoriyaSverhu,
    alt: "Территория базы сверху: домики в лесу, футбольное поле, площадка, огород и сад",
    caption: "Территория сверху: домики в лесу, поле, огород и сад",
  },
  domik16: {
    src: domik16,
    alt: "Деревянный домик №16 среди сосен, каменная дорожка к входу",
  },
  domikTerrasa: {
    src: domikTerrasa,
    alt: "Деревянный домик с террасой, стена увита девичьим виноградом",
  },
  gamak: {
    src: gamak,
    alt: "Гамак в тени деревьев у двухэтажного деревянного домика",
    caption: "Гамаки в тени у домиков",
    position: "50% 25%",
  },
  grilBarRaduga: {
    src: grilBarRaduga,
    alt: "Гриль-бар на лужайке, над ним радуга, справа Аю-Даг",
    caption: "Гриль-бар с видом на Аю-Даг",
  },
  vezdSkala: {
    src: vezdSkala,
    alt: "Въезд на территорию базы у подножия скалы",
    caption: "Въезд на базу у подножия скалы",
  },
  ploshchadka: {
    src: ploshchadka,
    alt: "Площадка для волейбола и баскетбола, за сеткой ограждения море и скалы",
    caption: "Волейбол и баскетбол с видом на море",
  },
  futbolnoePole: {
    src: futbolnoePole,
    alt: "Футбольное поле с искусственным газоном, вдоль поля беседки и кипарисы",
    caption: "Футбольное поле и беседки для болельщиков",
  },
  kuhnya: {
    src: kuhnya,
    alt: "Кухня: холодильник, стиральная машина, мойка, чайник",
    caption: "Кухня с холодильником и стиральной машиной",
  },
  kuhnyaPlita: {
    src: kuhnyaPlita,
    alt: "Кухня: варочная панель, духовой шкаф, микроволновка, вытяжка",
  },
  prihozhaya: {
    src: prihozhaya,
    alt: "Прихожая с кулером для воды, двери в душевую и туалет",
    caption: "Прихожая, душевая и туалет",
  },
  spalnya: {
    src: spalnya,
    alt: "Светлая спальня с двумя кроватями, высокими окнами и кондиционером",
    caption: "Спальня с кондиционером и окнами в сад",
  },
  elektrobajki: {
    src: elektrobajki,
    alt: "Электробайки на яйле, внизу море и побережье",
    caption: "На электробайках — на яйлу, к обрывам над морем",
  },
  degustaciya: {
    src: degustaciya,
    alt: "Вечерняя дегустация: бутылки вина и бокалы на столе, внизу огни побережья",
    caption: "Вечерняя дегустация",
    position: "50% 60%",
  },
  rybalka: {
    src: rybalka,
    alt: "Лодка выходит в море на рассвете, впереди Аю-Даг, в кадре удочка",
    caption: "Морская рыбалка на рассвете у Аю-Дага",
    position: "50% 50%",
  },
} satisfies Record<string, SitePhoto>;

/** Главное фото каждого типа размещения (id из domiki.json) */
export const domikPhotos: Record<string, SitePhoto> = {
  apartamenty: photos.kuhnyaPlita,
  "domik-4": photos.domik16,
  "domik-6-8": photos.domikTerrasa,
  "vsya-baza": photos.territoriyaSverhu,
};
