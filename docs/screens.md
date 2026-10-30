# Screens

Archivo Figma vigente: [Referidos](https://www.figma.com/design/LqlQ7jHqGKF7m6Aeuft7mH/Referidos) (`fileKey` LqlQ7jHqGKF7m6Aeuft7mH), página "07 - Vici" (`279:134`) con todo el flujo. Los node ID de abajo son de ese archivo; los frames que no cambiaron conservan el ID del archivo anterior (Coderhouse case of study, `Dox8zlDLFe1FedxEJeEAE8`).

Cada frame se verificó con un diff de píxeles contra su captura de Figma (390×844, Chrome). La columna **Dif.** es el porcentaje de píxeles distintos; lo que queda es, sobre todo, el antialiasing del texto (Figma y Chrome lo renderizan distinto) y las esquinas redondeadas del frame de Figma.

| # | Frame | Node ID | Ruta | Sale hacia | Dif. |
| --- | --- | --- | --- | --- | --- |
| 00 | Pantalla de inicio del iPhone | `301:690` | `/` | tocar el logo de vici (el ícono crece hasta llenar la pantalla) → `/splash` | 1,16 % |
| 01 | Splash | `279:1423` | `/splash` | automático (~2,4 s) → `/onboarding` | 0,02 % |
| 02 | Onboarding 1 | `80:14519` | `/onboarding` | avanza solo (4 s) o con swipe; "Omitir" e "Iniciar sesión" → `/login`; "Crear cuenta" → `/registro` | 0,11 % |
| 02 | Onboarding 2 | `80:14552` | `/onboarding` | ídem | 0,45 % |
| 02 | Onboarding 3 | `80:14590` | `/onboarding` | ídem | 0,23 % |
| 03 | Login | `80:14425` | `/login` | "Iniciar sesión", Google o Apple (sin validar) → `/home` | 0,32 % |
| 03 | Registro | `82:14656` | `/registro` | "Crear cuenta", Google o Apple (sin validar) → `/home` | 0,65 % |
| 04 | Home | `293:3723` | `/home` | card de Rapanui → `/tienda/rapanui`; chips Helados / Pizzas / Burgers → su tienda; buscador → modo búsqueda; botón naranja del tab bar → `/categorias` | 1,19 %¹ |
| 05 | Categorías | `80:14175` | `/categorias` | Helados → Rapanui, Pizzas → Pizzería Fuego, Hamburguesas → Burger House | 0,13 % |
| 07 | Tienda – Rapanui | `80:14082` | `/tienda/rapanui` | helado → `/tienda/rapanui/producto/:id`; "Ver mi carrito" → `/carrito` | 0,83 % |
| 07 | Tienda – Pizzería Fuego | `82:14817` | `/tienda/pizzeria-fuego` | Pepperoni clásica → `/tienda/pizzeria-fuego/producto/pepperoni` | 4,87 %¹ |
| 07 | Tienda – Burger House | `82:14724` | `/tienda/burger-house` | Doble cheddar → `/tienda/burger-house/producto/doble-cheddar` | 4,28 %¹ |
| 08 | Personalizá tu pedido (helado) | `80:14004` | `/tienda/rapanui/producto/:id` | "Agregar al carrito" → vuelve a la tienda | 0,52 % |
| 08 | Personalizá tu pizza de pepperoni | `94:445` | `/tienda/pizzeria-fuego/producto/pepperoni` | ídem | 0,98 %² |
| 08 | Personalizá (Doble cheddar) | `82:14910` | `/tienda/burger-house/producto/doble-cheddar` | ídem | 0,53 % |
| 09 | Mi carrito (Detalle de compra) | `80:13928` | `/carrito` | "Pagar" → `/pedido-confirmado` | 0,59 % |
| 09 | Congrats | `279:1292` | `/pedido-confirmado` | automático (~3,2 s) → `/seguimiento` | 0,43 % |
| 10 | Seguí tu pedido | `279:255` | `/seguimiento` | final del flujo | 0,55 % |
| 11 | Pedidos | `288:1973` | `/pedidos` | la card del pedido → `/seguimiento`; sin pedido muestra un estado vacío (sin frame) | 1,36 % |
| — | Soporte | `279:1626` | `/soporte` | buscador que filtra las preguntas | 1,60 % |
| — | Perfil | `279:1454` / `279:1540` | `/perfil` | "Cerrar sesión" → `/login` | 0,53 % |

Cómo se mide: captura del prototipo con el marco de escritorio (390×844) contra el PNG de Figma. Los frames de 842 px de alto (Home, Perfil, Soporte) se exportan con 1 px de corrimiento vertical, que se compensa antes de comparar.

¹ Incluye lo deshabilitado a propósito (opacidad reducida, ver abajo) y, en las tiendas, la barra "Ver mi carrito" tal como queda tras agregar el producto.
² El botón "Agregar al carrito" de ese frame tiene el ícono y el texto alineados a la izquierda; el del resto de los frames (y el sistema) los centra, y se respeta el sistema.

El archivo no tiene frame 06 (la numeración salta de 05 a 07).

## Lo que todavía no tiene diseño: deshabilitado

Todo lo que no tiene pantalla diseñada se ve con la opacidad reducida (token `opacity-disabled`, 40 %), mismas medidas y sin reacción al toque. Se resuelve con la prop `disabled` (o la ausencia de `to` / `customization` en los datos), no con avisos.

- Categorías: todas salvo Helados, Pizzas y Hamburguesas.
- Home: los comercios sin flujo (La Riviera, BBS Sushi, Bakery).
- Tiendas: pestañas distintas de Promociones y productos sin pantalla de personalización (Franui, Margherita, Carnes, Nudos de ajo, Clásica, Pollo crispy, Papas Fritas).
- Home: chips Café y Papas.
- Perfil: Editar, Favoritos, Premios y Métodos de pago. Soporte: las preguntas. Pedidos: llamar y chatear con el repartidor. Carrito: lápiz de la dirección.

## Decisiones donde el diseño no define el comportamiento

- **Sin pantallas intermedias:** Categorías lleva directo a la única tienda de cada rubro (no hay frame para elegir comercio).
- **Categorías:** el botón naranja del tab bar abre Categorías; desde ahí cada rubro lleva directo a su tienda.
- **Personalizá:** el helado arranca con Chocolate y Dulce de Leche, como en el frame (máximo según el producto, cantidad de 1 a 9). La pizza arranca sin ají molido y la hamburguesa sin pepino, como en sus frames; "Todo incluido" aparece si no se quita nada.
- **Carrito de un solo comercio:** si agregás algo de otro comercio, el carrito arranca de nuevo con ese producto.
- **Carrito:** los gustos se listan en el orden en que se eligieron (el frame muestra otro orden fijo). El lápiz del producto vuelve a Personalizá con lo elegido.
- **Seguimiento:** el frame muestra a La Riviera, aunque se haya pedido en otro comercio; se respeta el diseño. El repartidor avanza despacio recién a los 3 s.
- **Login / Registro:** no se validan datos; cualquier ingreso lleva a la Home. "Cerrar sesión" vuelve al Login.
- **Perfil:** el nombre del frame (Nadin Lourdes) no coincide con el saludo de la Home (Yamila); se respeta cada frame.
- **Textos del diseño que no están en voseo:** "Puedes quitar o agregar" (Personalizá hamburguesa) y "Escribe aquí… / Escribe tu email / Escribe tu contraseña" (Login y Registro) se dejaron como están en Figma.
- El mapa de Seguimiento es la imagen original de Figma, no un mapa real.

## Buscador y estados vacíos (sin frame de Figma)

- **Buscador de la Home:** es un input real, así que al tocarlo se abre el teclado. La Home pasa a "modo búsqueda" (el mismo input sigue montado para que el teclado no se cierre): se ocultan saludo, chips y promos, aparece "Cancelar" y se listan comercios y productos que coinciden (sin distinguir mayúsculas ni tildes).
- **Estados vacíos** (componente `EmptyState`, armado con tokens del sistema): búsqueda sin texto ("Buscá tu comida favorita" + sugerencias), búsqueda sin resultados ("No encontramos “…”" + "Borrar búsqueda"), categoría sin resultados en Categorías, y Pedidos sin pedido ("Todavía no tenés pedidos" + "Pedir ahora").
- **Pedidos:** la pestaña muestra el pedido que se acaba de pagar (vive en memoria, se pierde al recargar). Sin pedido, el estado vacío.

## Congrats: confetis saliendo de la bolsa

La imagen del frame (bolsa + confetis en una sola pieza) se separó en piezas con transparencia (`public/images/congrats/confetti/`) conservando su posición original. La bolsa entra con un resorte y ~0,55 s después cada confeti sale disparado desde la boca de la bolsa (detrás de ella) hasta su lugar en el frame, y queda flotando apenas. Con "reducir movimiento" activado en el sistema aparecen ya en su lugar.

## Pantallas chicas (iPhone 12 en Safari, iPhone SE, Android chicos)

- El marco ocupa `100dvh` (la altura visible, sin la barra del navegador) y en mobile no hay scroll de página.
- Lo flotante está anclado abajo y queda fijo: tab bar, barra "Ver mi carrito", CTAs de Personalizá y Carrito, botones del Onboarding (con `env(safe-area-inset-bottom)` para los iPhone con barra home).
- Las composiciones hechas con medidas absolutas de Figma (slides del Onboarding, ruta y marcadores de Seguimiento) se achican con `FitStage` si la pantalla es más baja; Login y Registro suben el bloque y, si igual no entra, scrollean. En Seguimiento la card del comercio se oculta en pantallas de menos de 844 px de alto.
- El indicador de inicio del teléfono solo se dibuja en el marco de escritorio.
- Se revisó en 390×664, 375×667, 360×640 y 390×844.

