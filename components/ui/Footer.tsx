import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-forest-dark border-t border-forest/30 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-georgia text-cream text-xl mb-4">Лесная Обитель</h3>
            <p className="font-inter text-sand/70 text-sm leading-relaxed">
              Закрытая эко-база у скалы Красный Камень.<br />
              Краснокаменка, ЮБК, Крым.
            </p>
            <p className="font-inter text-sand/50 text-xs mt-4 italic">
              Вино, которое росло здесь.<br />
              Тишина, которую не привозят.
            </p>
          </div>

          <div>
            <h4 className="font-inter text-xs tracking-widest uppercase text-gold mb-4">Разделы</h4>
            <ul className="space-y-2">
              {[
                { href: "/domiki", label: "Домики" },
                { href: "/aktivnosti", label: "Активности" },
                { href: "/degustacii", label: "Дегустации и ферма" },
                { href: "/akvazona", label: "Аквазона" },
                { href: "/pitanie", label: "Питание" },
                { href: "/prays", label: "Прайс-лист" },
                { href: "/kontakty", label: "Контакты" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-sand/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-inter text-xs tracking-widest uppercase text-gold mb-4">Связь</h4>
            <div className="space-y-3">
              <a
                href="tel:+79787776655"
                className="block font-inter text-sm text-sand/70 hover:text-gold transition-colors"
              >
                +7 (978) 777-66-55
              </a>
              <a
                href="https://t.me/lesnaya_obitel"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-inter text-sm text-sand/70 hover:text-gold transition-colors"
              >
                Telegram
              </a>
              <a
                href="https://wa.me/79787776655"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-inter text-sm text-sand/70 hover:text-gold transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="mailto:info@lesnaya-obitel.ru"
                className="block font-inter text-sm text-sand/70 hover:text-gold transition-colors"
              >
                info@lesnaya-obitel.ru
              </a>
            </div>
            <Link
              href="/bron"
              className="btn-primary text-xs py-2 px-6 mt-6 inline-block"
            >
              Забронировать
            </Link>
          </div>
        </div>

        <div className="border-t border-forest/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-inter text-xs text-sand/40">
            © 2024 Лесная Обитель. Все права защищены.
          </p>
          <p className="font-inter text-xs text-sand/40">
            Краснокаменка, Ялтинский район, Крым
          </p>
        </div>
      </div>
    </footer>
  );
}
