# Screens

Archivo Figma: [Coderhouse case of study](https://www.figma.com/design/Dox8zlDLFe1FedxEJeEAE8/Coderhouse-case-of-study) (`fileKey` Dox8zlDLFe1FedxEJeEAE8). Página "Tech handoff" (`80:13827`) con todo el happy path.

Cada frame se verificó con un diff de píxeles contra su captura de Figma (390×844, Chrome). La columna **Dif.** es el porcentaje de píxeles distintos; lo que queda es, sobre todo, el antialiasing del texto (Figma y Chrome lo renderizan distinto) y las esquinas redondeadas del frame de Figma.

| # | Frame | Node ID | Ruta | Sale hacia | Dif. |
| --- | --- | --- | --- | --- | --- |
| 01 | Splash | `80:14624` | `/` | automático (~2,4 s) → `/onboarding` | 0,26 % |
| 02 | Onboarding 1 | `80:14519` | `/onboarding` | avanza solo (4 s) o con swipe; "Omitir", "Crear cuenta", "Iniciar sesión" → `/login` | 0,11 % |
| 02 | Onboarding 2 | `80:14552` | `/onboarding` | ídem | 0,45 % |
| 02 | Onboarding 3 | `80:14590` | `/onboarding` | ídem | 0,23 % |
| 03 | Login | `80:14425` | `/login` | "Iniciar sesión", Google o Apple (sin validar) → `/home` | 0,16 % |
| 04 | Home | `80:14281` | `/home` | buscador o botón naranja del tab bar → `/categorias` | 0,79 % |
| 05 | Categorías | `80:14175` | `/categorias` | "Helados" → `/tienda/rapanui` | 0,13 % |
| 07 | Tienda (Rapanui) | `80:14082` | `/tienda/rapanui` | producto con gustos → `/tienda/rapanui/producto/:id`; "Ver mi carrito" → `/carrito` | 0,83 % |
| 08 | Personalizá tu pedido | `80:14004` | `/tienda/rapanui/producto/:id` | "Agregar al carrito" → vuelve a la tienda | 0,55 % |
| 09 | Mi carrito (Detalle de compra) | `80:13928` | `/carrito` | "Pagar" → `/pedido-confirmado` | 0,59 % |
| 09 | Congrats | `80:14493` | `/pedido-confirmado` | automático (~3,2 s) → `/seguimiento` | 0,53 % |
| 10 | Seguí tu pedido | `80:13828` | `/seguimiento` | final del flujo | 0,66 % |

El archivo no tiene frame 06 (la numeración salta de 05 a 07).

## Decisiones donde el diseño no define el comportamiento

- **Home → Categorías:** el buscador de la Home y el botón naranja del tab bar abren Categorías. Si venís del buscador, el cursor queda en el campo de búsqueda de Categorías.
- **Categorías:** solo "Helados" tiene camino diseñado. El resto muestra un aviso ("Esta categoría no está en el prototipo").
- **Tienda:** las pestañas "Franui" y "Chocolates" no tienen diseño. "Franui" filtra el producto; "Chocolates" muestra que no está en el prototipo. El producto **Franui** no tiene gustos, así que se suma directo al carrito.
- **Personalizá:** arranca con Chocolate y Dulce de Leche elegidos, como en el frame. Máximo de gustos según el producto (4, 3 o 2). Cantidad de 1 a 9.
- **Carrito:** los gustos se listan en el orden en que se eligieron (el frame muestra otro orden fijo). El lápiz del producto vuelve a Personalizá con lo elegido; el de la dirección todavía no hace nada.
- **Seguimiento:** el frame muestra a La Riviera, aunque se haya pedido en Rapanui; se respeta el diseño. El repartidor avanza despacio recién a los 3 s (el frame es una foto fija).
- **Login:** cualquier ingreso lleva a la Home, no se validan credenciales.
- **Pedidos, Soporte y Perfil** (tab bar) todavía no tienen diseño y muestran "Esta pantalla todavía no está diseñada".
- El mapa de Seguimiento es la imagen original de Figma, no un mapa real.
