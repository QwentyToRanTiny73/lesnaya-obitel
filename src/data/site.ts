// Единственный источник правды для контактов, адреса и реквизитов.
// Все страницы берут данные отсюда — менять только здесь.

export const site = {
  name: "Лесная Обитель",
  tagline: "Тишина, которую не привозят.",
  description:
    "Закрытая частная эко-база у скалы Красный Камень. Восемь гектаров леса, четырнадцать домиков и апартаменты, собственное вино, ферма, аквазона. Краснокаменка, Южный берег Крыма.",

  phone: { raw: "+79785905650", display: "+7 (978) 590-56-50" },
  telegram: "CaDi1440",
  // У Max нет стабильной публичной ссылки на чат по номеру — показываем номер.
  max: { display: "+7 (978) 590-56-50" },

  address: {
    street: "ул. имени Исмаила Гаспринского, 33",
    locality: "пгт Краснокаменка",
    district: "муниципальный округ Ялта",
    region: "Республика Крым",
  },

  listings: {
    cian: "https://krym.cian.ru/rent/suburban/327153966/",
    avito: "https://www.avito.ru/yalta/doma_dachi_kottedzhi/2-k._taunhaus_55_m_7602383662",
  },

  // Заполнить, когда будут данные: без них страница реквизитов скрыта,
  // а в политике указан только адрес и телефон.
  legal: {
    operator: null as string | null, // «ИП Иванов Иван Иванович» / «ООО …»
    inn: null as string | null,
    ogrn: null as string | null,
    // Номер в Едином реестре объектов классификации (средства размещения)
    registry: null as string | null,
  },

  minNights: 2,
  checkIn: "14:00",
  checkOut: "12:00",
} as const;

export const telegramUrl = `https://t.me/${site.telegram}`;
export const phoneUrl = `tel:${site.phone.raw}`;
export const fullAddress = [
  site.address.street,
  site.address.locality,
  site.address.district,
  site.address.region,
].join(", ");
