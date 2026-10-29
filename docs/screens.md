# Screens

Archivo Figma: [Coderhouse case of study](https://www.figma.com/design/Dox8zlDLFe1FedxEJeEAE8/Coderhouse-case-of-study) (`fileKey` Dox8zlDLFe1FedxEJeEAE8). Página "Tech handoff" (`80:13827`) con todo el happy path.

Cada frame se verificó con un diff de píxeles contra su captura de Figma (390×844, Chrome). La columna **Dif.** es el porcentaje de píxeles distintos; lo que queda es, sobre todo, el antialiasing del texto (Figma y Chrome lo renderizan distinto) y las esquinas redondeadas del frame de Figma.

| # | Frame | Node ID | Ruta | Sale hacia | Dif. |
| --- | --- | --- | --- | --- | --- |
| 01 | Splash | `80:14624` | `/` | automático (~2,4 s) → `/onboarding` | 0,26 % |
| 02 | Onboarding 1 | `80:14519` | `/onboarding` | avanza solo (4 s) o con swipe; "Omitir" e "Iniciar sesión" → `/login`; "Crear cuenta" → `/registro` | 0,11 % |
| 02 | Onboarding 2 | `80:14552` | `/onboarding` | ídem | 0,45 % |
| 02 | Onboarding 3 | `80:14590` | `/onboarding` | ídem | 0,23 % |
| 03 | Login | `80:14425` | `/login` | "Iniciar sesión", Google o Apple (sin validar) → `/home` | 0,32 % |
| 03 | Registro | `82:14656` | `/registro` | "Crear cuenta", Google o Apple (sin validar) → `/home` | 0,65 % |
| 04 | Home | `96:15150` | `/home` | card de Rapanui → `/tienda/rapanui`; buscador o botón naranja del tab bar → `/categorias`; tab Soporte / Perfil | 1,56 %¹ |
| 05 | Categorías | `80:14175` | `/categorias` | Helados → Rapanui, Pizzas → Pizzería Fuego, Hamburguesas → Burger House | 0,13 % |
| 07 | Tienda – Rapanui | `80:14082` | `/tienda/rapanui` | helado → `/tienda/rapanui/producto/:id`; "Ver mi carrito" → `/carrito` | 0,83 % |
| 07 | Tienda – Pizzería Fuego | `82:14817` | `/tienda/pizzeria-fuego` | Pepperoni clásica → `/tienda/pizzeria-fuego/producto/pepperoni` | 4,87 %¹ |
| 07 | Tienda – Burger House | `82:14724` | `/tienda/burger-house` | Doble cheddar → `/tienda/burger-house/producto/doble-cheddar` | 4,28 %¹ |
| 08 | Personalizá tu pedido (helado) | `80:14004` | `/tienda/rapanui/producto/:id` | "Agregar al carrito" → vuelve a la tienda | 0,52 % |
| 08 | Personalizá tu pizza de pepperoni | `94:445` | `/tienda/pizzeria-fuego/producto/pepperoni` | ídem | 0,98 %² |
| 08 | Personalizá (Doble cheddar) | `82:14910` | `/tienda/burger-house/producto/doble-cheddar` | ídem | 0,53 % |
| 09 | Mi carrito (Detalle de compra) | `80:13928` | `/carrito` | "Pagar" → `/pedido-confirmado` | 0,59 % |
| 09 | Congrats | `80:14493` | `/pedido-confirmado` | automático (~3,2 s) → `/seguimiento` | 0,53 % |
| 10 | Seguí tu pedido | `80:13828` | `/seguimiento` | final del flujo | 0,66 % |
| — | Soporte | `96:15763` | `/soporte` | buscador que filtra las preguntas | 1,60 %³ |
| — | Perfil | `96:15455` / `96:15673` | `/perfil` | "Cerrar sesión" → `/login` | 0,53 % |

Cómo se mide: captura del prototipo en 390×844 contra el PNG de Figma. Los frames de 842 px de alto (Home, Perfil, Soporte) se exportan con 1 px de corrimiento vertical, que se compensa antes de comparar.

¹ Incluye lo deshabilitado a propósito (opacidad reducida, ver abajo) y, en las tiendas, la barra "Ver mi carrito" tal como queda tras agregar el producto.
² El botón "Agregar al carrito" de ese frame tiene el ícono y el texto alineados a la izquierda; el del resto de los frames (y el sistema) los centra, y se respeta el sistema.
³ Figma usa Roboto en el buscador y en las preguntas; el prototipo usa Plus Jakarta Sans, la tipografía del design system.

El archivo no tiene frame 06 (la numeración salta de 05 a 07).

## Lo que todavía no tiene diseño: deshabilitado

Todo lo que no tiene pantalla diseñada se ve con la opacidad reducida (token `opacity-disabled`, 40 %), mismas medidas y sin reacción al toque. Se resuelve con la prop `disabled` (o la ausencia de `to` / `customization` en los datos), no con avisos.

- Categorías: todas salvo Helados, Pizzas y Hamburguesas.
- Home: los comercios sin flujo (La Riviera, BBS Sushi, Bakery) y los chips de categorías sin comercios (Burgers).
- Tiendas: pestañas distintas de Promociones y productos sin pantalla de personalización (Franui, Margherita, Carnes, Nudos de ajo, Clásica, Pollo crispy, Papas Fritas).
- Perfil: Editar, Favoritos, Premios y Métodos de pago. Soporte: las preguntas. Tab bar: Pedidos. Carrito: lápiz de la dirección.

## Decisiones donde el diseño no define el comportamiento

- **Sin pantallas intermedias:** Categorías lleva directo a la única tienda de cada rubro (no hay frame para elegir comercio).
- **Home → Categorías:** el buscador de la Home y el botón naranja del tab bar abren Categorías. Si venís del buscador, el cursor queda en el campo de búsqueda.
- **Personalizá:** el helado arranca con Chocolate y Dulce de Leche, como en el frame (máximo según el producto, cantidad de 1 a 9). La pizza arranca sin ají molido y la hamburguesa sin pepino, como en sus frames; "Todo incluido" aparece si no se quita nada.
- **Carrito de un solo comercio:** si agregás algo de otro comercio, el carrito arranca de nuevo con ese producto.
- **Carrito:** los gustos se listan en el orden en que se eligieron (el frame muestra otro orden fijo). El lápiz del producto vuelve a Personalizá con lo elegido.
- **Seguimiento:** el frame muestra a La Riviera, aunque se haya pedido en otro comercio; se respeta el diseño. El repartidor avanza despacio recién a los 3 s.
- **Login / Registro:** no se validan datos; cualquier ingreso lleva a la Home. "Cerrar sesión" vuelve al Login.
- **Perfil:** el nombre del frame (Nadin Lourdes) no coincide con el saludo de la Home (Yamila); se respeta cada frame.
- **Textos del diseño que no están en voseo:** "Puedes quitar o agregar" (Personalizá hamburguesa) y "Escribe aquí… / Escribe tu email / Escribe tu contraseña" (Login y Registro) se dejaron como están en Figma.
- El mapa de Seguimiento es la imagen original de Figma, no un mapa real.
