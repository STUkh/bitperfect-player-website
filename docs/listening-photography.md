# Личная сцена прослушивания: эталон фотографии

Утверждённый пользователем эталон — [`home-privacy.webp`](../public/img/home-privacy.webp). Его фиксированная копия сохранена в [`references/listening-lifestyle-approved.webp`](references/listening-lifestyle-approved.webp), чтобы будущая замена рабочего файла не потеряла исходный ориентир.

Это основной референс **атмосферы, аудиотематики, света и материалов**. Его ракурс и масштаб не обязательны: допустимы близкие планы, длиннофокусные кадры, панорамы и широкоугольные фотографии целой комнаты. Форму конкретного DAC и полноразмерных наушников задают отдельно [референсы оборудования](feature-art-prompts.md#единые-референсы-оборудования).

## Что повторять

- **Личная ситуация.** Телефон и небольшие наушники лежат там, где человек действительно мог бы слушать музыку. Обжитая сцена без людей в кадре.
- **Понятный сюжет.** Иерархию задаёт задача: главным может быть телефон, аудиосистема или вся комната. Масштаб предметов соответствует выбранному плану, лишнее оборудование не добавляется без причины.
- **Свободный выбор оптики.** Крупный план, длинный фокус, панорама, широкий угол и взгляд сверху равноправны. Выбирайте ракурс, который лучше передаёт аудиосцену; сохраняйте естественную перспективу и правдоподобный масштаб.
- **Натуральная среда.** Тёплый орех с различимым рисунком, мягкая графитовая ткань, фрагмент нейтральной керамики, немного зелени у окна. Второстепенные предметы входят краем кадра и не образуют декоративный натюрморт.
- **Свет из окна.** Мягкий дневной свет сверху слева, естественные тени и умеренные блики на стекле. Экран читается, не светится как прожектор.
- **Спокойный цвет.** Коричневое дерево, графит, нейтральный металл и немного естественного зелёного. Цвет обложек остаётся внутри экрана. Без общей оранжевой тонировки и золотой отделки.
- **Правдоподобные детали.** Реальные пропорции телефона, естественный кабель, аккуратные разъёмы, мягкая ткань. Нет чрезмерной резкости, пластикового дерева и стерильного рекламного блеска.
- **Настоящий интерфейс.** На экране выбранный скриншот приложения. Он помогает понять сюжет и остаётся частью фотографии.

Не нужно копировать каждую чашку, складку и ветку. Повторять следует характер фотографии и иерархию предметов.

## Экран и оборудование

В утверждённом `home-privacy` показана библиотека из `public/screens/library.webp`. **Этот кадр утверждён как есть: не заменять библиотеку полноэкранным плеером автоматически.**

Для новой сцены выбирайте настоящий скриншот под её смысл: библиотека для локальной коллекции, Now Playing для воспроизведения. Если задача прямо требует полноэкранный плеер, используйте `public/screens/now-playing-hero.webp` или другой выбранный скриншот Now Playing. Прямое требование задачи имеет приоритет.

Новые телефоны используют согласованную форму S25 Ultra без брендинга. Маленькие внутриканальные наушники допустимы для личной сцены; референс больших открытых наушников применяется, когда нужны именно полноразмерные наушники. Не добавляйте большой DAC или студийную стойку в камерный кадр только ради унификации оборудования.

## Промпт-шаблон

Прикладывайте фиксированный эталон как **референс фотографии**, а нужный скриншот — как **источник содержимого экрана**. Это разные роли.

```text
Create a photorealistic editorial photograph of a quiet personal listening moment.
Reference image 1 defines the photographic atmosphere, composition, lighting and materials, not a set of props to duplicate literally.
Reference image 2 provides the actual app screenshot for the phone display.

A single unbranded modern graphite smartphone on a natural oiled walnut side table beside small dark earphones, with a casually curved cable.
Choose framing and lens for the scene: close detail, a long-lens composition, a panorama or a wide-angle listening room are all valid. Keep realistic perspective and comfortable breathing room.
Give the listening scene a clear visual hierarchy. When the phone screen is visible, show the supplied app screenshot faithfully within it, preserving its layout and recognizable content.
Subtle supporting context at the frame edges: soft charcoal fabric, a fragment of neutral ceramic, a little natural greenery near a window. Keep the scene simple and plausible.
Soft diffuse daylight from the upper left, gentle natural shadows, moderate contrast, subdued warm wood and neutral graphite, honest tactile materials.
A private, calm, lived-in listening corner photographed naturally, without advertising theatrics.
Keep the whole phone and important accessories visible in both a 16:9 frame and a mild central 2:1 crop.

No hardware branding, added promotional text, watermarks, people, hands, gold trim, exaggerated luxury, neon, particles, dramatic glow, studio spotlights, floating UI, clouds, locks, shields or arrows.
Do not invent an app interface or replace the supplied screenshot with a generic player.
```

Меняйте предметы, масштаб, оптику и экран по задаче, сохраняя аудиотематику, спокойный свет и натуральность. Для этого типа кадров используйте фотографический язык; не добавляйте `cinematic product render`, `luxury advertising`, `dramatic rim light` или `volumetric haze`.

## Проверка и экспорт

1. Сравните с фиксированным эталоном: кадр такой же спокойный, тёплый и личный, без лишнего оборудования и эффектов.
2. Проследите каждый кабель от одного физического разъёма до другого: без исчезающих участков, лишних ветвей и соединений с поверхностью стола. Левая и правая чашки наушников должны иметь одну конструкцию, одинаковые материалы, кольца, решётки, амбушюры и согласованные крепления с учётом перспективы. Проверьте телефон и экран на ошибки геометрии, псевдобрендинг и выдуманный интерфейс. Дисплей DAC по умолчанию пустой и тёмный: не выдумывайте деления, графики и показания.
3. Проверьте целиком телефон и смысл сцены в мобильном 16:9 и широком 2:1 кропе. Интерфейс на маленьком экране не обязан читаться построчно, но должен быть узнаваемым.
4. Для лендинга экспортируйте WebP 2560×1440, качество 80. Для другого места используйте его целевые размеры без растяжения предметов.

Этот документ фиксирует стиль. Само изображение `home-privacy.webp` при документировании не изменяется.
