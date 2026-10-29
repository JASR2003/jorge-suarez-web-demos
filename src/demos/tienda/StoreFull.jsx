import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  MapPin,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Truck,
  UserRound,
} from "lucide-react";
import heroImage from "../../assets/tienda/forma-hero.jpg";
import lampImage from "../../assets/tienda/lampara-nube.jpg";
import chairImage from "../../assets/tienda/silla-uno.jpg";
import vaseImage from "../../assets/tienda/jarron-forma.jpg";
import tableImage from "../../assets/tienda/mesa-terra.jpg";
import sconceImage from "../../assets/tienda/aplique-alba.jpg";
import trayImage from "../../assets/tienda/bandeja-curva.jpg";
import stoolImage from "../../assets/tienda/banco-sur.jpg";
import throwImage from "../../assets/tienda/manta-linea.jpg";
import "./store-full.css";

const base = "/tienda";
const products = [
  {
    id: 1,
    name: "Lámpara Nube",
    category: "Iluminación",
    price: 164,
    image: lampImage,
    code: "LN-02",
    note: "Lino crudo · luz cálida",
    badge: "Nuevo",
    stock: 12,
    rating: 4.9,
    reviews: 37,
    dimensions: "Ø 58 × 32 cm",
    material: "Lino, acero y latón cepillado",
  },
  {
    id: 2,
    name: "Sillón Uno",
    category: "Mobiliario",
    price: 628,
    image: chairImage,
    code: "SU-01",
    note: "Fresno · bouclé lavanda",
    badge: "Más vendido",
    stock: 4,
    rating: 4.8,
    reviews: 24,
    dimensions: "76 × 82 × 74 cm",
    material: "Fresno certificado y bouclé",
  },
  {
    id: 3,
    name: "Jarrón Forma",
    category: "Objetos",
    price: 86,
    image: vaseImage,
    code: "JF-04",
    note: "Cerámica torneada",
    badge: "",
    stock: 18,
    rating: 4.7,
    reviews: 19,
    dimensions: "Ø 22 × 34 cm",
    material: "Gres esmaltado a mano",
  },
  {
    id: 4,
    name: "Mesa Baja Terra",
    category: "Mobiliario",
    price: 890,
    image: tableImage,
    code: "MT-03",
    note: "Travertino natural",
    badge: "Edición limitada",
    stock: 2,
    rating: 5,
    reviews: 11,
    dimensions: "110 × 65 × 34 cm",
    material: "Travertino romano sellado",
  },
  {
    id: 5,
    name: "Aplique Alba",
    category: "Iluminación",
    price: 142,
    image: sconceImage,
    code: "AA-05",
    note: "Metal lacado · vidrio opal",
    badge: "",
    stock: 9,
    rating: 4.6,
    reviews: 16,
    dimensions: "28 × 18 × 42 cm",
    material: "Acero lacado y vidrio opal",
  },
  {
    id: 6,
    name: "Bandeja Curva",
    category: "Objetos",
    price: 72,
    image: trayImage,
    code: "BC-06",
    note: "Aluminio reciclado",
    badge: "",
    stock: 21,
    rating: 4.8,
    reviews: 29,
    dimensions: "Ø 39 × 3 cm",
    material: "Aluminio reciclado cepillado",
  },
  {
    id: 7,
    name: "Banco Sur",
    category: "Mobiliario",
    price: 246,
    image: stoolImage,
    code: "BS-07",
    note: "Roble certificado",
    badge: "Nuevo",
    stock: 7,
    rating: 4.9,
    reviews: 8,
    dimensions: "44 × 36 × 48 cm",
    material: "Roble macizo FSC",
  },
  {
    id: 8,
    name: "Manta Línea",
    category: "Textiles",
    price: 118,
    image: throwImage,
    code: "ML-08",
    note: "Algodón orgánico",
    badge: "",
    stock: 14,
    rating: 4.7,
    reviews: 32,
    dimensions: "140 × 190 cm",
    material: "Algodón orgánico tejido",
  },
];
const money = (value) => `$${value}`;
const getPage = () => {
  const part = window.location.pathname.replace(/\/+$/, "").split("/").pop();
  return [
    "catalogo",
    "producto",
    "bolsa",
    "envios",
    "favoritos",
    "checkout",
    "cuenta",
    "pedido",
  ].includes(part)
    ? part
    : "inicio";
};

function Header({ count, favoriteCount }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="sf-service">
        Envío gratuito desde $150 <span>·</span> Devoluciones durante 30 días{" "}
        <span>·</span> Diseño y producción local
      </div>
      <header className="sf-header">
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Abrir menú"
        >
          <Menu />
        </button>
        <a className="sf-logo" href={`${base}/`}>
          FORMA<span>objetos cotidianos</span>
        </a>
        <nav className={open ? "is-open" : ""}>
          <a href={`${base}/catalogo/`}>Comprar</a>
          <a href={`${base}/catalogo/?coleccion=nuevo`}>Novedades</a>
          <a href={`${base}/#historia`}>La marca</a>
          <a href={`${base}/envios/`}>Ayuda</a>
        </nav>
        <div>
          <a href={`${base}/catalogo/?buscar=1`} aria-label="Buscar">
            <Search />
          </a>
          <a
            href={`${base}/favoritos/`}
            aria-label={`Favoritos, ${favoriteCount}`}
          >
            <Heart />
            <span>{favoriteCount}</span>
          </a>
          <a href={`${base}/cuenta/`} aria-label="Cuenta">
            <UserRound />
          </a>
          <a href={`${base}/bolsa/`} aria-label={`Bolsa, ${count} productos`}>
            <ShoppingBag />
            <span>{count}</span>
          </a>
        </div>
      </header>
    </>
  );
}
function Visual({ product, large = false, detail = false }) {
  return (
    <div
      className={`sf-visual ${large ? "large" : ""} ${detail ? "detail" : ""}`}
    >
      <img src={product.image} alt={product.name} />
      <span>{product.code}</span>
      <small>{product.badge}</small>
    </div>
  );
}
function Card({ product, add, favorites = [], toggleFavorite = () => {} }) {
  const saved = favorites.includes(product.id);
  return (
    <article className="sf-card">
      <div className="sf-card-media">
        <a href={`${base}/producto/?id=${product.id}`}>
          <Visual product={product} />
        </a>
        <button
          className={`sf-heart ${saved ? "saved" : ""}`}
          onClick={() => toggleFavorite(product)}
          aria-label={`${saved ? "Quitar" : "Guardar"} ${product.name}`}
        >
          <Heart />
        </button>
        <button className="sf-quick" onClick={() => add(product)}>
          Añadir rápido
        </button>
      </div>
      <div>
        <p>{product.category}</p>
        <h3>
          <a href={`${base}/producto/?id=${product.id}`}>{product.name}</a>
        </h3>
        <span>{product.note}</span>
        <div className="sf-rating">
          <Star /> {product.rating} <span>({product.reviews})</span>
        </div>
        <strong>{money(product.price)}</strong>
        <button
          onClick={() => add(product)}
          aria-label={`Añadir ${product.name}`}
        >
          <Plus />
        </button>
      </div>
    </article>
  );
}
function Newsletter() {
  const [sent, setSent] = useState(false);
  return (
    <section className="sf-news">
      <div>
        <p className="sf-eye">CARTA FORMA / DOS VECES AL MES</p>
        <h2>Casas reales, objetos bien elegidos.</h2>
      </div>
      {sent ? (
        <div className="sf-form-success" role="status">
          <Check />
          <div>
            <strong>Ya formas parte de la lista.</strong>
            <span>
              En una tienda real recibirías un correo de confirmación.
            </span>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label htmlFor="sf-email">Tu correo electrónico</label>
          <div>
            <input
              id="sf-email"
              type="email"
              placeholder="nombre@email.com"
              required
            />
            <button>
              Suscribirme <ArrowRight />
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

function Home({ add, favorites, toggleFavorite }) {
  return (
    <main id="store-main">
      <section className="sf-hero">
        <div>
          <p className="sf-eye">COLECCIÓN 02 — CASA SERENA</p>
          <h1>
            Menos ruido.
            <br />
            <em>Más hogar.</em>
          </h1>
          <p>
            Objetos honestos para espacios vividos. Una colección de formas
            suaves, materiales duraderos y producción local.
          </p>
          <div className="sf-actions">
            <a href={`${base}/catalogo/`}>
              Explorar colección <ArrowRight />
            </a>
            <a href="#historia">Nuestra forma de hacer</a>
          </div>
        </div>
        <figure>
          <img
            src={heroImage}
            alt="Lámpara Nube y mesa Terra en un interior cálido"
          />
          <figcaption>
            <span>01 / 04</span>
            <strong>Lámpara Nube</strong>
            <a href={`${base}/producto/?id=1`}>Descubrir</a>
          </figcaption>
        </figure>
      </section>
      <nav className="sf-categories">
        <a href={`${base}/catalogo/?categoria=Mobiliario`}>
          Mobiliario <span>03</span>
        </a>
        <a href={`${base}/catalogo/?categoria=Iluminación`}>
          Iluminación <span>02</span>
        </a>
        <a href={`${base}/catalogo/?categoria=Objetos`}>
          Objetos <span>02</span>
        </a>
        <a href={`${base}/catalogo/?categoria=Textiles`}>
          Textiles <span>01</span>
        </a>
      </nav>
      <section className="sf-curation">
        <header>
          <p className="sf-eye">SELECCIÓN DE TEMPORADA</p>
          <h2>Piezas para quedarse.</h2>
          <a href={`${base}/catalogo/`}>
            Ver las 8 piezas <ArrowRight />
          </a>
        </header>
        <div className="sf-grid">
          {products.slice(0, 4).map((p) => (
            <Card
              key={p.id}
              product={p}
              add={add}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>
      <section className="sf-room-edit">
        <div>
          <p className="sf-eye">EDIT / SALÓN SERENO</p>
          <h2>Una habitación, cuatro gestos.</h2>
          <p>
            Combina madera clara, piedra, luz tamizada y una nota de color. La
            selección completa funciona junta sin obligarte a comprar un
            conjunto.
          </p>
          <a href={`${base}/catalogo/?categoria=Mobiliario`}>
            Comprar el edit <ArrowRight />
          </a>
        </div>
        <div className="sf-room-products">
          {products.slice(0, 4).map((p, i) => (
            <a key={p.id} href={`${base}/producto/?id=${p.id}`}>
              <img src={p.image} alt={p.name} />
              <span>0{i + 1}</span>
              <strong>{p.name}</strong>
              <small>{money(p.price)}</small>
            </a>
          ))}
        </div>
      </section>
      <section className="sf-services">
        <article>
          <Truck />
          <span>01</span>
          <h3>Entrega a tu medida</h3>
          <p>
            Paquetería, entrega concertada o recogida. Eliges fecha y modalidad
            antes de pagar.
          </p>
        </article>
        <article>
          <PackageCheck />
          <span>02</span>
          <h3>30 días para decidir</h3>
          <p>Devuelve las piezas sin usar desde casa o en nuestro estudio.</p>
        </article>
        <article>
          <ShieldCheck />
          <span>03</span>
          <h3>Garantía de dos años</h3>
          <p>Reparamos o sustituimos cualquier defecto de fabricación.</p>
        </article>
        <article>
          <MapPin />
          <span>04</span>
          <h3>Estudio Forma</h3>
          <p>Visítanos con cita para ver materiales y probar mobiliario.</p>
        </article>
      </section>
      <section className="sf-story" id="historia">
        <div>
          <p className="sf-eye">NUESTRO CRITERIO</p>
          <h2>Diseñamos despacio para acompañarte mucho tiempo.</h2>
        </div>
        <div>
          <p>
            Cada pieza empieza por una necesidad cotidiana y se produce en
            series cortas junto a talleres independientes. Elegimos materiales
            reparables, embalajes mínimos y proveedores cercanos.
          </p>
          <dl>
            <div>
              <dt>82%</dt>
              <dd>materiales de origen local</dd>
            </div>
            <div>
              <dt>14</dt>
              <dd>talleres colaboradores</dd>
            </div>
            <div>
              <dt>2 años</dt>
              <dd>garantía en toda la colección</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="sf-testimonials">
        <p className="sf-eye">EN CASAS REALES</p>
        <blockquote>
          “La mesa Terra llegó perfectamente embalada y es incluso más bonita al
          natural. Se nota que no es una pieza producida sin cuidado.”
        </blockquote>
        <div>
          <span>4.9 / 5 valoración media</span>
          <span>Marina G. · compra verificada</span>
        </div>
      </section>
      <Newsletter />
    </main>
  );
}

function Catalog({ add, favorites, toggleFavorite }) {
  const params = new URLSearchParams(window.location.search),
    initial = params.get("categoria") || "Todo",
    onlyNew = params.get("coleccion") === "nuevo";
  const [category, setCategory] = useState(initial),
    [sort, setSort] = useState("curated"),
    [query, setQuery] = useState("");
  const shown = useMemo(
    () =>
      products
        .filter(
          (p) =>
            (category === "Todo" || p.category === category) &&
            (!onlyNew || p.badge === "Nuevo") &&
            p.name.toLowerCase().includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "low"
            ? a.price - b.price
            : sort === "high"
              ? b.price - a.price
              : a.id - b.id,
        ),
    [category, sort, query, onlyNew],
  );
  return (
    <main id="store-main" className="sf-catalog">
      <header>
        <p className="sf-eye">CATÁLOGO / 2026</p>
        <h1>Objetos para habitar.</h1>
        <p>
          Una colección pequeña y combinable para construir espacios personales,
          no escaparates perfectos.
        </p>
      </header>
      <div className="sf-tools">
        <label>
          <Search />
          <span className="sr-only">Buscar productos</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre"
          />
        </label>
        <div className="sf-filters">
          <SlidersHorizontal />
          {["Todo", "Mobiliario", "Iluminación", "Objetos", "Textiles"].map(
            (c) => (
              <button
                className={category === c ? "active" : ""}
                onClick={() => setCategory(c)}
                key={c}
              >
                {c}
              </button>
            ),
          )}
        </div>
        <label className="sf-sort">
          Ordenar{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="curated">Selección</option>
            <option value="low">Precio menor</option>
            <option value="high">Precio mayor</option>
          </select>
          <ChevronDown />
        </label>
      </div>
      <div className="sf-catalog-meta">
        <p className="sf-results">
          {shown.length} productos · {category}
        </p>
        <p>Todos disponibles online · impuestos incluidos</p>
      </div>
      <div className="sf-grid catalog">
        {shown.map((p) => (
          <Card
            key={p.id}
            product={p}
            add={add}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
      {!shown.length && (
        <div className="sf-empty">
          <h2>No encontramos esa pieza.</h2>
          <button
            onClick={() => {
              setQuery("");
              setCategory("Todo");
            }}
          >
            Limpiar búsqueda
          </button>
        </div>
      )}
    </main>
  );
}

function Product({ add, favorites, toggleFavorite }) {
  const id = Number(new URLSearchParams(window.location.search).get("id") || 1),
    product = products.find((p) => p.id === id) || products[0];
  const [finish, setFinish] = useState("Natural"),
    [quantity, setQuantity] = useState(1),
    [postalResult, setPostalResult] = useState("");
  const saved = favorites.includes(product.id);
  return (
    <main id="store-main" className="sf-detail">
      <div className="sf-crumb">
        <a href={`${base}/catalogo/`}>
          <ArrowLeft /> Catálogo
        </a>
        <span>
          {product.category} / {product.name}
        </span>
      </div>
      <section>
        <div className="sf-gallery">
          <Visual product={product} large />
          <div>
            <Visual product={product} detail />
            <div className="sf-material-shot">
              <span>Material</span>
              <strong>{product.material}</strong>
              <small>Seleccionado por durabilidad, reparación y tacto.</small>
            </div>
          </div>
        </div>
        <div className="sf-info">
          <div className="sf-product-kicker">
            <p className="sf-eye">
              {product.category} · {product.code}
            </p>
            <button
              className={saved ? "saved" : ""}
              onClick={() => toggleFavorite(product)}
            >
              <Heart /> {saved ? "Guardado" : "Guardar"}
            </button>
          </div>
          <h1>{product.name}</h1>
          <div className="sf-product-rating">
            <span>{product.rating}</span>
            <div>
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} />
              ))}
            </div>
            <a href="#opiniones">{product.reviews} opiniones</a>
          </div>
          <p className="sf-price">
            {money(product.price)} <span>Impuestos incluidos</span>
          </p>
          <p className="sf-lead">
            Una pieza de presencia serena, diseñada para integrarse en la rutina
            y ganar carácter con el uso.
          </p>
          <fieldset>
            <legend>
              Acabado: <strong>{finish}</strong>
            </legend>
            <div>
              {["Natural", "Arcilla", "Grafito"].map((c) => (
                <button
                  className={finish === c ? "active" : ""}
                  onClick={() => setFinish(c)}
                  key={c}
                  type="button"
                >
                  {c}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="sf-buy">
            <div>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Quitar unidad"
              >
                <Minus />
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Añadir unidad"
              >
                <Plus />
              </button>
            </div>
            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) add(product);
              }}
            >
              Añadir a la bolsa · {money(product.price * quantity)}
            </button>
          </div>
          <p className="sf-stock">
            <Check /> {product.stock} unidades disponibles · sale del taller en
            2–4 días
          </p>
          <div className="sf-delivery-check">
            <MapPin />
            <div>
              <strong>Comprueba entrega y recogida</strong>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPostalResult(
                    "Entrega disponible en 3–5 días. Recogida disponible mañana.",
                  );
                }}
              >
                <label className="sr-only" htmlFor="postal">
                  Código postal
                </label>
                <input
                  id="postal"
                  inputMode="numeric"
                  pattern="[0-9]{4,8}"
                  placeholder="Código postal"
                  required
                />
                <button>Comprobar</button>
              </form>
              {postalResult && (
                <p className="sf-postal-result" role="status">
                  <Check /> {postalResult}
                </p>
              )}
            </div>
          </div>
          {[
            [
              "Descripción y medidas",
              `Serie corta y numerada. Medidas: ${product.dimensions}. Cada pieza puede presentar matices propios del material.`,
            ],
            [
              "Materiales y cuidados",
              `${product.material}. Limpiar con un paño suave ligeramente húmedo y evitar productos abrasivos.`,
            ],
            [
              "Envíos, montaje y devoluciones",
              "Entrega concertada disponible para mobiliario. Envío gratuito desde $150 y devoluciones durante 30 días.",
            ],
          ].map(([title, copy], i) => (
            <details open={!i} key={title}>
              <summary>
                {title}
                <Plus />
              </summary>
              <p>{copy}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="sf-specs">
        <p className="sf-eye">FICHA DE LA PIEZA</p>
        <div>
          <article>
            <span>01</span>
            <h3>Diseño</h3>
            <p>Forma Studio, Caracas</p>
          </article>
          <article>
            <span>02</span>
            <h3>Material</h3>
            <p>{product.material}</p>
          </article>
          <article>
            <span>03</span>
            <h3>Medidas</h3>
            <p>{product.dimensions}</p>
          </article>
          <article>
            <span>04</span>
            <h3>Origen</h3>
            <p>Producido en serie corta</p>
          </article>
        </div>
      </section>
      <section className="sf-reviews" id="opiniones">
        <header>
          <p className="sf-eye">OPINIONES VERIFICADAS</p>
          <h2>{product.rating} de 5</h2>
          <p>{product.reviews} personas han valorado esta pieza.</p>
        </header>
        <div>
          <article>
            <div>
              <strong>Muy especial y bien terminada</strong>
              <span>★★★★★</span>
            </div>
            <p>
              La textura y el color son exactamente como aparecen en las fotos.
              El embalaje protege muy bien la pieza y llegó antes de la fecha
              estimada.
            </p>
            <small>Andrea P. · compra verificada</small>
          </article>
          <article>
            <div>
              <strong>Se siente hecha para durar</strong>
              <span>★★★★★</span>
            </div>
            <p>
              Buena atención antes de comprar y materiales excelentes. Agradecí
              poder comprobar las medidas y la entrega antes del pago.
            </p>
            <small>Luis R. · compra verificada</small>
          </article>
        </div>
      </section>
      <section className="sf-recommend">
        <header>
          <p className="sf-eye">TAMBIÉN EN ESTA CASA</p>
          <h2>Combina bien con.</h2>
        </header>
        <div className="sf-grid">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 3)
            .map((p) => (
              <Card
                key={p.id}
                product={p}
                add={add}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

function Cart({ cart, setCart }) {
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const subtotal = cart.reduce((sum, p) => sum + p.price, 0),
    total = Math.max(0, subtotal - discount),
    grouped = products
      .map((p) => ({ ...p, qty: cart.filter((x) => x.id === p.id).length }))
      .filter((p) => p.qty);
  return (
    <main id="store-main" className="sf-cart">
      <header>
        <p className="sf-eye">TU SELECCIÓN</p>
        <h1>
          Bolsa <span>{cart.length}</span>
        </h1>
      </header>
      {!cart.length ? (
        <div className="sf-cart-empty">
          <ShoppingBag />
          <h2>Tu bolsa está esperando.</h2>
          <p>Explora piezas hechas para acompañarte durante años.</p>
          <a href={`${base}/catalogo/`}>
            Ver catálogo <ArrowRight />
          </a>
        </div>
      ) : (
        <div className="sf-cart-layout">
          <section>
            {grouped.map((p) => (
              <article key={p.id}>
                <Visual product={p} />
                <div>
                  <p>{p.category}</p>
                  <h2>{p.name}</h2>
                  <span>Acabado natural · {p.code}</span>
                  <div>
                    <button
                      onClick={() => {
                        const i = cart.findIndex((x) => x.id === p.id);
                        setCart(cart.filter((_, idx) => idx !== i));
                      }}
                    >
                      <Minus />
                    </button>
                    <span>{p.qty}</span>
                    <button onClick={() => setCart([...cart, p])}>
                      <Plus />
                    </button>
                  </div>
                </div>
                <strong>{money(p.price * p.qty)}</strong>
              </article>
            ))}
          </section>
          <aside>
            <h2>Resumen</h2>
            <form
              className="sf-promo"
              onSubmit={(e) => {
                e.preventDefault();
                setDiscount(promo.trim().toUpperCase() === "FORMA10" ? subtotal * 0.1 : 0);
              }}
            >
              Código promocional{" "}
              <span>
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Prueba FORMA10"
                />
                <button>Aplicar</button>
              </span>
              {promo && (
                <small role="status">
                  {discount
                    ? `Descuento aplicado: -${money(discount)}`
                    : "Introduce FORMA10 para activar el descuento demo."}
                </small>
              )}
            </form>
            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd>{money(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div>
                  <dt>Descuento</dt>
                  <dd>−{money(discount)}</dd>
                </div>
              )}
              <div>
                <dt>Envío</dt>
                <dd>{total >= 150 ? "Gratuito" : "Calculado después"}</dd>
              </div>
              <div>
                <dt>Total estimado</dt>
                <dd>{money(total)}</dd>
              </div>
            </dl>
            {subtotal < 150 && (
              <p>Te faltan {money(150 - subtotal)} para el envío gratuito.</p>
            )}
            <a
              className="sf-checkout-link"
              href={`${base}/checkout/${discount ? "?promo=FORMA10" : ""}`}
            >
              Continuar al pago <ArrowRight />
            </a>
            <small>Pago seguro · Visa · Mastercard · PayPal</small>
          </aside>
        </div>
      )}
    </main>
  );
}

function Favorites({ favorites, add, toggleFavorite }) {
  const saved = products.filter((p) => favorites.includes(p.id));
  return (
    <main id="store-main" className="sf-wishlist">
      <header>
        <p className="sf-eye">TU LISTA PERSONAL</p>
        <h1>
          Favoritos <span>{saved.length}</span>
        </h1>
        <p>
          Guardamos esta selección en tu dispositivo para que puedas volver
          cuando quieras.
        </p>
      </header>
      {saved.length ? (
        <div className="sf-grid">
          {saved.map((p) => (
            <Card
              key={p.id}
              product={p}
              add={add}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="sf-cart-empty">
          <Heart />
          <h2>Aún no guardaste piezas.</h2>
          <p>Utiliza el corazón del catálogo para crear una selección.</p>
          <a href={`${base}/catalogo/`}>
            Explorar catálogo <ArrowRight />
          </a>
        </div>
      )}
    </main>
  );
}

function Checkout({ cart, setCart }) {
  const hasPromo = new URLSearchParams(window.location.search).get("promo") === "FORMA10";
  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState("home");
  const [payment, setPayment] = useState("card");
  const [processing, setProcessing] = useState(false);
  const subtotal = cart.reduce((sum, p) => sum + p.price, 0);
  const discount = hasPromo ? subtotal * 0.1 : 0;
  const deliveryFee = delivery === "scheduled" ? 25 : 0;
  const total = subtotal - discount + deliveryFee;
  const completeOrder = () => {
    setProcessing(true);
    const order = {
      number: `FRM-${String(Date.now()).slice(-6)}`,
      date: new Date().toLocaleDateString("es-VE"),
      total,
      delivery,
      items: cart.map((item) => item.id),
      status: "Pedido confirmado",
    };
    localStorage.setItem("forma-last-order", JSON.stringify(order));
    window.setTimeout(() => {
      setCart([]);
      window.location.href = `${base}/pedido/?numero=${order.number}`;
    }, 900);
  };
  if (!cart.length)
    return (
      <main id="store-main" className="sf-checkout">
        <div className="sf-cart-empty">
          <ShoppingBag />
          <h2>No hay productos para tramitar.</h2>
          <a href={`${base}/catalogo/`}>
            Volver al catálogo <ArrowRight />
          </a>
        </div>
      </main>
    );
  return (
    <main id="store-main" className="sf-checkout">
      <header>
        <a href={`${base}/bolsa/`}>
          <ArrowLeft /> Volver a la bolsa
        </a>
        <div>
          <button className={step >= 1 ? "active" : ""} onClick={() => setStep(1)}>1. Datos</button>
          <button className={step >= 2 ? "active" : ""} onClick={() => step >= 2 && setStep(2)}>2. Entrega</button>
          <button className={step >= 3 ? "active" : ""} onClick={() => step >= 3 && setStep(3)}>3. Pago</button>
        </div>
        <strong>
          Compra segura <ShieldCheck />
        </strong>
      </header>
      <div className="sf-checkout-layout">
        <section>
          <p className="sf-eye">PASO {step} DE 3</p>
          {step === 1 && (
            <div className="sf-checkout-panel">
              <h1>¿Dónde entregamos?</h1>
              <p>
                Podrás revisar todo antes de confirmar. Esta demostración no
                envía ni almacena datos.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
              >
                <label>
                  Correo electrónico
                  <input type="email" placeholder="nombre@email.com" required />
                </label>
                <div>
                  <label>
                    Nombre
                    <input required />
                  </label>
                  <label>
                    Apellido
                    <input required />
                  </label>
                </div>
                <label>
                  Dirección
                  <input placeholder="Calle, edificio, apartamento" required />
                </label>
                <div>
                  <label>
                    Ciudad
                    <input required />
                  </label>
                  <label>
                    Código postal
                    <input inputMode="numeric" required />
                  </label>
                </div>
                <label>
                  Teléfono
                  <input type="tel" placeholder="+58" required />
                </label>
                <button>
                  Continuar a entrega <ArrowRight />
                </button>
              </form>
            </div>
          )}
          {step === 2 && (
            <div className="sf-checkout-panel">
              <h1>Elige cómo recibirlo.</h1>
              <div className="sf-delivery-options">
                <button
                  className={delivery === "home" ? "selected" : ""}
                  onClick={() => setDelivery("home")}
                >
                  <Truck />
                  <span>
                    <strong>Entrega a domicilio</strong>
                    <small>3–5 días laborables · Gratuita</small>
                  </span>
                  {delivery === "home" && <Check />}
                </button>
                <button
                  className={delivery === "scheduled" ? "selected" : ""}
                  onClick={() => setDelivery("scheduled")}
                >
                  <PackageCheck />
                  <span>
                    <strong>Entrega concertada</strong>
                    <small>Elige fecha y franja horaria · $25</small>
                  </span>{delivery === "scheduled" && <Check />}
                </button>
                <button
                  className={delivery === "pickup" ? "selected" : ""}
                  onClick={() => setDelivery("pickup")}
                >
                  <MapPin />
                  <span>
                    <strong>Recogida en estudio</strong>
                    <small>Disponible mañana · Gratuita</small>
                  </span>{delivery === "pickup" && <Check />}
                </button>
              </div>
              <button className="sf-next" onClick={() => setStep(3)}>
                Continuar al pago <ArrowRight />
              </button>
            </div>
          )}
          {step === 3 && (
            <div className="sf-checkout-panel">
              <h1>Pago seguro.</h1>
              <p>
                Formulario demostrativo. No introduzcas datos bancarios reales.
              </p>
              <div className="sf-payment-methods" role="group" aria-label="Método de pago">
                <button className={payment === "card" ? "active" : ""} onClick={() => setPayment("card")}>Tarjeta</button>
                <button className={payment === "paypal" ? "active" : ""} onClick={() => setPayment("paypal")}>PayPal demo</button>
                <button className={payment === "transfer" ? "active" : ""} onClick={() => setPayment("transfer")}>Transferencia</button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  completeOrder();
                }}
              >
                {payment === "card" && <>
                  <label>
                    Número de tarjeta de prueba
                    <input inputMode="numeric" pattern="[0-9 ]{16,19}" placeholder="4242 4242 4242 4242" required />
                  </label>
                  <div>
                    <label>Caducidad<input pattern="(0[1-9]|1[0-2]) / [0-9]{2}" placeholder="12 / 30" required /></label>
                    <label>CVC<input inputMode="numeric" pattern="[0-9]{3,4}" placeholder="123" required /></label>
                  </div>
                  <label>Nombre de la tarjeta<input placeholder="Cliente Demo" required /></label>
                </>}
                {payment === "paypal" && <div className="sf-payment-note"><strong>PayPal demo</strong><p>Al finalizar simularemos la autorización y volverás a la confirmación de Forma.</p></div>}
                {payment === "transfer" && <div className="sf-payment-note"><strong>Transferencia simulada</strong><p>El pedido quedará confirmado con instrucciones ficticias. No se mostrarán datos bancarios reales.</p></div>}
                <label className="sf-check">
                  <input type="checkbox" required /> Acepto las condiciones
                  simuladas de compra
                </label>
                <button disabled={processing}>
                  {processing ? "Procesando pago simulado…" : `Finalizar pedido demo · ${money(total)}`} {!processing && <ArrowRight />}
                </button>
              </form>
            </div>
          )}
        </section>
        <aside>
          <h2>Tu pedido</h2>
          {products.map((p) => {
            const qty = cart.filter((x) => x.id === p.id).length;
            return qty ? (
              <article key={p.id}>
                <img src={p.image} alt="" />
                <div>
                  <strong>{p.name}</strong>
                  <span>Cantidad {qty}</span>
                </div>
                <b>{money(p.price * qty)}</b>
              </article>
            ) : null;
          })}
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            {discount > 0 && <div><dt>Descuento FORMA10</dt><dd>−{money(discount)}</dd></div>}
            <div>
              <dt>Envío</dt>
              <dd>{deliveryFee ? money(deliveryFee) : "Gratuito"}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </main>
  );
}

function Account() {
  const [logged, setLogged] = useState(false);
  const lastOrder = (() => {
    try { return JSON.parse(localStorage.getItem("forma-last-order") || "null"); }
    catch { return null; }
  })();
  return <main id="store-main" className="sf-account"><header><p className="sf-eye">CUENTA FORMA</p><h1>Tu espacio.</h1><p>Acceso demostrativo para consultar pedidos, favoritos y direcciones.</p></header><div><section>{logged?<div className="sf-account-success"><Check/><h2>Sesión demo iniciada.</h2><p>No se ha enviado ni almacenado ninguna contraseña.</p><a href={`${base}/favoritos/`}>Ver favoritos <ArrowRight/></a></div>:<><h2>Iniciar sesión</h2><form onSubmit={e=>{e.preventDefault();setLogged(true)}}><label>Correo electrónico<input type="email" placeholder="nombre@email.com" required/></label><label>Contraseña demo<input type="password" minLength="4" placeholder="Cualquier valor de prueba" required/></label><button>Entrar a la cuenta <ArrowRight/></button></form><button className="sf-text-button" onClick={()=>setLogged(true)}>Crear una cuenta demo</button></>}</section><aside><h2>Seguir un pedido</h2><p>Consulta el último pedido realizado en este dispositivo.</p>{lastOrder?<><strong>{lastOrder.number}</strong><span>{lastOrder.status} · {lastOrder.date}</span><a href={`${base}/pedido/?numero=${lastOrder.number}`}>Ver seguimiento <ArrowRight/></a></>:<><span>Todavía no hay pedidos simulados.</span><a href={`${base}/catalogo/`}>Empezar una compra <ArrowRight/></a></>}</aside></div></main>;
}

function OrderConfirmation() {
  const order = (() => { try { return JSON.parse(localStorage.getItem("forma-last-order") || "null"); } catch { return null; } })();
  if (!order) return <main id="store-main" className="sf-order"><div className="sf-cart-empty"><PackageCheck/><h2>No encontramos un pedido reciente.</h2><p>Completa el checkout simulado para generar una confirmación.</p><a href={`${base}/catalogo/`}>Ir al catálogo <ArrowRight/></a></div></main>;
  const labels={home:"Entrega a domicilio",scheduled:"Entrega concertada",pickup:"Recogida en estudio"};
  return <main id="store-main" className="sf-order"><section className="sf-order-hero"><div className="sf-order-check"><Check/></div><p className="sf-eye">PEDIDO CONFIRMADO</p><h1>Gracias.<br/>Ya está en marcha.</h1><p>Esta es una confirmación completamente ficticia. No se realizó ningún cobro ni se enviaron datos.</p><dl><div><dt>Número</dt><dd>{order.number}</dd></div><div><dt>Fecha</dt><dd>{order.date}</dd></div><div><dt>Total</dt><dd>{money(order.total)}</dd></div><div><dt>Entrega</dt><dd>{labels[order.delivery]}</dd></div></dl></section><section className="sf-order-status"><p className="sf-eye">SEGUIMIENTO DEMO</p><h2>Estado del pedido</h2><ol><li className="done"><Check/><div><strong>Pedido confirmado</strong><span>Completado ahora</span></div></li><li className="active"><PackageCheck/><div><strong>Preparación en taller</strong><span>Estimado: próximo día laborable</span></div></li><li><Truck/><div><strong>En camino</strong><span>Estimado: 3–5 días</span></div></li><li><MapPin/><div><strong>Entregado</strong><span>Fecha por confirmar</span></div></li></ol><div><a href={`${base}/catalogo/`}>Seguir comprando <ArrowRight/></a><a href={`${base}/cuenta/`}>Ir a mi cuenta</a></div></section></main>;
}

function Help() {
  return (
    <main id="store-main" className="sf-help">
      <header>
        <p className="sf-eye">AYUDA / COMPRA TRANQUILA</p>
        <h1>Antes y después de elegir.</h1>
      </header>
      <div>
        <aside>
          <a href="#envios">Envíos</a>
          <a href="#devoluciones">Devoluciones</a>
          <a href="#garantia">Garantía</a>
          <a href="#contacto">Contacto</a>
          <a href="#accesibilidad">Accesibilidad</a>
        </aside>
        <section>
          {[
            [
              "envios",
              "01",
              "Envíos",
              "Preparamos cada pedido entre 2 y 4 días laborables. El plazo estimado aparece antes de completar la compra.",
            ],
            [
              "devoluciones",
              "02",
              "Devoluciones",
              "Tienes 30 días desde la entrega. La pieza debe conservar su embalaje y no mostrar señales de uso.",
            ],
            [
              "garantia",
              "03",
              "Garantía",
              "Todas las piezas incluyen dos años de garantía frente a defectos de fabricación.",
            ],
            [
              "contacto",
              "04",
              "¿Necesitas ayuda?",
              "Escríbenos con una foto o la referencia del producto. Respondemos en un día laborable.",
            ],
            [
              "accesibilidad",
              "05",
              "Accesibilidad",
              "La tienda permite navegación con teclado, contraste legible, etiquetas de formulario y estados comunicados mediante texto. Si encuentras una barrera, escríbenos.",
            ],
          ].map(([id, n, title, copy]) => (
            <article id={id} key={id}>
              <span>{n}</span>
              <div>
                <h2>{title}</h2>
                <p>{copy}</p>
                {id === "contacto" && (
                  <a href="mailto:hola@forma.demo">
                    hola@forma.demo <ArrowRight />
                  </a>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="sf-footer">
      <div>
        <a className="sf-logo" href={`${base}/`}>
          FORMA
        </a>
        <p>Objetos cotidianos producidos con intención.</p>
        <span>© 2026 Forma Studio</span>
      </div>
      <div>
        <strong>Comprar</strong>
        <a href={`${base}/catalogo/`}>Todo</a>
        <a href={`${base}/catalogo/?categoria=Mobiliario`}>Mobiliario</a>
        <a href={`${base}/catalogo/?categoria=Iluminación`}>Iluminación</a>
        <a href={`${base}/favoritos/`}>Favoritos</a>
      </div>
      <div>
        <strong>Ayuda</strong>
        <a href={`${base}/envios/`}>Envíos y devoluciones</a>
        <a href={`${base}/envios/#garantia`}>Garantía</a>
        <a href={`${base}/envios/#contacto`}>Contacto</a>
        <a href={`${base}/envios/#accesibilidad`}>Accesibilidad</a>
      </div>
      <div>
        <strong>Estudio</strong>
        <span>Av. Principal, Caracas</span>
        <span>Lun–Sáb · 10:00–18:00</span>
        <a href="mailto:hola@forma.demo">hola@forma.demo</a>
        <a href="/">← Todas las demos</a>
      </div>
    </footer>
  );
}
export default function StoreFull() {
  const [cart, setCart] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("forma-cart") || "[]")
          .map((id) => products.find((p) => p.id === id))
          .filter(Boolean);
      } catch {
        return [];
      }
    }),
    [favorites, setFavorites] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("forma-favorites") || "[]");
      } catch {
        return [];
      }
    }),
    page = getPage(),
    add = (p) => setCart((c) => [...c, p]),
    toggleFavorite = (p) =>
      setFavorites((list) =>
        list.includes(p.id)
          ? list.filter((id) => id !== p.id)
          : [...list, p.id],
      );
  useEffect(
    () =>
      localStorage.setItem("forma-cart", JSON.stringify(cart.map((p) => p.id))),
    [cart],
  );
  useEffect(
    () => localStorage.setItem("forma-favorites", JSON.stringify(favorites)),
    [favorites],
  );
  return (
    <div className="sf-site">
      <a className="demo-skip" href="#store-main">
        Saltar al contenido
      </a>
      {page !== "checkout" && (
        <Header count={cart.length} favoriteCount={favorites.length} />
      )}{" "}
      {page === "inicio" && (
        <Home add={add} favorites={favorites} toggleFavorite={toggleFavorite} />
      )}{" "}
      {page === "catalogo" && (
        <Catalog
          add={add}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}{" "}
      {page === "producto" && (
        <Product
          add={add}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}{" "}
      {page === "bolsa" && <Cart cart={cart} setCart={setCart} />}{" "}
      {page === "favoritos" && (
        <Favorites
          favorites={favorites}
          add={add}
          toggleFavorite={toggleFavorite}
        />
      )}{" "}
      {page === "checkout" && <Checkout cart={cart} setCart={setCart} />}{" "}
      {page === "cuenta" && <Account />}{" "}
      {page === "pedido" && <OrderConfirmation />}{" "}
      {page === "envios" && <Help />}
      {page !== "checkout" && <Footer />}
    </div>
  );
}
