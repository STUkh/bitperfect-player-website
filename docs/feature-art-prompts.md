# FeatureArt: единое руководство и промпты

Это основной источник визуальных требований к изображениям FeatureArt. При генерации, замене или редактировании карточек используйте этот документ и текущие изображения серии как референсы. Требования распространяются и на другие изображения аудиоустройств для сайта, если у задачи нет отдельного арт-дирекшена.

## Визуальная идея

Уютное современное пространство для прослушивания музыки: натуральное дерево, матовый металл, ткань акустики, мягкий свет. Красота возникает из пропорций, материалов и правдоподобных деталей устройства. Композиция спокойная, предметы выглядят доступными для реального использования дома.

Ориентиры утверждённого направления:

- [Home Privacy](references/listening-lifestyle-approved.webp) — утверждённый эталон аудиотематики, атмосферы, натуральных материалов и мягкого света. Масштаб и оптика свободны: от близких планов до панорам и широкоугольной комнаты. Подробные [правила и промпт](listening-photography.md).
- [USB DAC](../public/img/features/usb-dac.webp) — основной референс материалов и устройства: ореховые боковины, матовая панель, регулятор, выход для наушников, естественный свет.
- [AI Enhancer](../public/img/features/ai-enhancer.webp) — основной референс технической иллюстрации: телефон с аккуратным разрезом и видимым чипом, в той же домашней аудиосреде.
- [Casting](../public/img/features/casting.webp) и [DSP](../public/img/features/dsp.webp) — согласованные примеры деревянных корпусов, ткани и графитового металла.

## Постоянные требования серии

### Единые референсы оборудования

Для новых генераций и согласованных замен используйте эти референсы во всей серии. Они уточняют форму оборудования в сюжетных промптах ниже. Актуальный пример совместной сцены — [`home-statement.webp`](../public/img/home-statement.webp).

- **DAC:** [референс корпуса](references/dac-hardware.png). Приземистый прямоугольный корпус, вентиляция сверху, широкий пустой дисплей из тёмного стекла, два верхних регулятора справа и реальные аудиоразъёмы. Матовый графит, ореховые боковины; допустимы дополнительные конструктивные деревянные вставки. Дизайн можно адаптировать. Удалять `R2R`, `R2R PRO`, названия, логотипы и надписи с боковин, верхней панели и органов управления. Золотые ободки заменять графитовыми. Дисплей по умолчанию выключен: без делений, графиков, свечения и выдуманных показаний.
- **Наушники:** [референс открытой конструкции](references/open-back-headphones.png). Крупные округло-овальные открытые чашки с сеткой, наружная несущая рама и отдельное подвесное оголовье. Сохранять характерную конструкцию, добавлять аккуратные ореховые вставки по периметру чашек или в раме. Удалять `Elite`, эмблемы, логотипы и маркировку разъёмов. Не заменять на обычные закрытые круглые наушники.
- **Телефон:** форма S25 Ultra без брендинга: широкий плоский прямоугольный экран, почти прямые углы с небольшим скруглением, тонкая равномерная рамка, прямые графитовые металлические грани, маленькая центральная фронтальная камера.
- **Экран телефона:** обязателен наш полноэкранный плеер из [`public/screens/now-playing-hero.webp`](../public/screens/now-playing-hero.webp) либо другого явно выбранного настоящего скриншота Now Playing. Скриншот передаётся генератору отдельным референсом. Сохранять обложку, композицию интерфейса, полосу воспроизведения и кнопки. Не заменять произвольным плеером, сеткой библиотеки или пустым экраном. Текст реального интерфейса разрешён; аппаратный брендинг запрещён.

Оригиналы референсов намеренно сохранены с исходной маркировкой для узнаваемости формы. Эта маркировка не должна попадать в финальные материалы. Уже существующие изображения обновляются отдельным согласованным проходом; наличие нового референса не означает, что старые файлы автоматически перегенерированы.

**Утверждённое исключение для `home-privacy`:** текущий кадр с библиотекой сохраняется как есть и служит эталоном фотографии. Требование полноэкранного плеера не применяется к нему задним числом. Для новых личных сцен экран выбирается по смыслу и прямым требованиям задачи, как описано в [правилах фотографии](listening-photography.md#экран-и-оборудование).

| Параметр | Требование |
| --- | --- |
| Палитра | Угольный графит, тёмный орех, небольшие акценты приглушённой меди примерно `#8B5E45`. Медь — материал детали, а не цветовая заливка кадра. |
| Дерево | Натуральная текстура, матовое масло, аккуратные скругления. На аудиоустройстве уместны деревянные боковины или корпус; одного деревянного стола недостаточно для смягчения безликого металлического блока. |
| Металл | Матовый или мягко шлифованный алюминий, тёмные функциональные регуляторы. |
| Свет | Мягкий рассеянный дневной свет сверху слева, умеренная экспозиция, мягкие тени. |
| Фон | Тёмная домашняя комната для прослушивания, дерево и графит. Допустимы размытая акустика, пластинки и растение; предметы второго плана не конкурируют с главным объектом. |
| Устройства | Современные, конструктивно правдоподобные, без брендинга. Узнаваемые регуляторы, корректные разъёмы, швы корпуса и ножки там, где они нужны. |
| Композиция | Один главный сюжет, примерно 60–65% кадра. Важные детали ближе к центру, с запасом под `object-cover`. |
| Детализация | Материалы и главная идея читаются в карточке 640×360. Микродетали не заменяют понятный силуэт. |
| Надписи | Без аппаратного брендинга, рекламных надписей, водяных знаков и сгенерированного псевдотекста. Настоящий интерфейс приложения на экране и метки положения регулятора допустимы. |

Дерево добавляется там, где оно конструктивно естественно: боковины DAC, корпус колонки, щёчки студийного модуля. Телефон сохраняет современный стеклянно-металлический корпус; деревянный декор на него переносить не нужно.

## Чего избегать

- Золота, латуни, позолоченной окантовки, ювелирного блеска и демонстративной роскоши.
- Неоновых контуров, светящихся кабелей, искр, частиц, голограмм, дымки и драматических прожекторов.
- Сильной оранжевой тонировки, глянцевых отражений и чрезмерного контраста.
- Безликих чёрных коробок, случайно расставленных ручек, невозможных портов и декоративных псевдомеханизмов.
- Рекламных коллажей, больших стрелок, значков мозга, парящих микросхем и нагромождения технических эффектов.
- Буквальных сравнений «сломанное старое устройство → дорогое новое»: они отвлекают от обработки аудио и могут создавать неверное впечатление о функции.

Для AI Enhancer выбран сюжет **обработки внутри телефона**. Предыдущий сюжет с переходом серой волны в медную больше не используется.

## Как собирать промпт

Для новой генерации объедините три блока в указанном порядке:

1. Общий промпт ниже.
2. Сюжет нужной карточки из раздела «Промпты сюжетов».
3. Общие ограничения из блока `Avoid`.

Прикладывайте актуальный USB DAC как референс материалов и света. При обновлении отдельной карточки прикладывайте её текущее изображение как цель редактирования. Явно указывайте роль каждого изображения: цель редактирования или референс стиля.

### Общий промпт

```text
Photorealistic 3D render, 1920×1080, wide 16:9 composition.
An understated editorial product image for an audio player website feature card.
A quiet contemporary home listening room, with a dark walnut desk or shelf and a charcoal background.
Natural oiled walnut, matte charcoal brushed aluminium, woven speaker fabric where appropriate, and only small accents of muted aged copper around #8B5E45.
Soft diffused daylight from the upper left, soft shadows, moderate exposure, low saturation, natural material colors, tactile warmth.
Believable contemporary audio equipment with realistic proportions, functional controls, correctly sized ports, coherent seams and feet, with all branding removed.
Use fitted walnut side cheeks or wooden enclosures where appropriate for real audio hardware. Keep phones in realistic graphite metal and glass.
One clear subject occupying roughly 60–65 percent of the frame, with breathing room and important details near the center for object-cover cropping.
The idea must remain readable at 640×360. Refined through materials, proportions and careful construction, with a calm, welcoming atmosphere.
```

### Avoid — добавлять к каждому сюжету

```text
No text, letters, numbers, labels, logos, pseudo-writing, people or watermark.
No gold, brass, gold trim, exaggerated luxury, glossy ornament or jewelry-like detailing.
No glowing edges, luminous cables, neon, holograms, floating chips, energy beams, sparkles, particles, cinematic haze or dramatic spotlights.
No orange color wash, mirror-like surfaces, excessive contrast, clutter, collage, borders or before-after panels.
No featureless industrial boxes, arbitrary controls, impossible connectors or decorative fake engineering.
```

## Промпты сюжетов

### `usb-dac` — Direct USB DAC output

```text
A believable compact desktop USB DAC / headphone amplifier on a dark walnut listening desk, seen at a three-quarter angle.
Slim matte charcoal brushed aluminium front and top, fitted oiled walnut side cheeks with gently rounded corners, subtle natural grain, small rubber feet.
One practical dark metal volume knob on the front right, one correctly sized 6.35 mm headphone output on the front left, and one tiny dim white status indicator.
The right wooden cheek is clearly visible. A dark braided USB cable connects to the rear panel and curves naturally behind the device.
Quiet supporting context: dark over-ear headphones with a restrained walnut earcup rim, a softly blurred speaker and a plant near the window.
The DAC is the clear subject, slightly right of center. It looks like real home hi-fi hardware photographed with its branding removed.
```

### `eq` — 32-band parametric EQ

```text
A row of thirty-two slender vertical matte dark copper bars of varying heights on a simple dark walnut base.
Their heights form a smooth gently undulating frequency response.
The copper is oxidized brown and catches soft daylight without emitting light.
A restrained tactile sculptural representation of an audio equalizer in a home listening room.
Low, slightly angled camera, charcoal background, no glass reflections or stepped pedestal.
```

Число полос проверьте отдельно: генератор может ошибиться даже при точном указании количества. Не выдавайте приблизительный ряд за проверенную схему 32 полос.

### `library` — Local lossless library

```text
An orderly modest row of thin charcoal paper record sleeves on a dark walnut shelf, receding toward the right.
One unprinted warm muted brown sleeve is pulled slightly forward.
Tactile paper, real wood grain, a calm home record collection and a simple composition.
A softly blurred turntable may sit nearby as secondary context.
No metallic sleeve edges, shiny records or decorative floor grids.
```

### `casting` — Bi-directional streaming

```text
A plain modern graphite phone lying flat on the left and a small contemporary speaker standing on the right, both on a walnut desk.
The speaker has muted charcoal woven fabric, a dark walnut enclosure and softly rounded corners, with realistic construction and no branding.
Two very faint thin muted copper arcs suggest audio streaming in opposite directions.
Keep the arcs as minimal secondary graphic traces with small arrowheads, no bloom or particles.
Balanced composition with both devices fully inside the central safe area. Quiet home listening context, soft daylight.
```

Исключение для этого сюжета: две тонкие направленные дуги допустимы. Они не должны превращаться в яркую рекламную инфографику.

### `dsp` — Studio-grade DSP rack

```text
A compact believable stack of contemporary studio audio processing modules on a walnut listening desk.
Matte charcoal metal front panels, fitted dark walnut side cheeks, functional dark knurled knobs and a few simple toggle switches.
Controls are coherently arranged as real audio hardware, with restrained proportions, visible construction seams and small feet.
Three-quarter view with breathing room around the stack, soft focus beyond the first module.
No branding, writing, numbered scales, gold surrounds or glowing LEDs.
```

### `ai-enhancer` — AI Enhancer

```text
A single modern graphite smartphone resting at a shallow diagonal on a dark walnut listening desk, viewed from above at a three-quarter angle.
The whole phone fits comfortably inside the central 65 percent of the frame.
A precise rectangular technical cutaway in the upper middle of the dark front glass reveals a small section of the black circuit board and one square matte copper-brown neural processor integrated into the phone.
The chip must remain visually legible at thumbnail scale. Its surface carries a delicate abstract interconnected-node circuit etching, without letters or a brain icon.
Fine plausible circuit traces and a few tiny components surround it. The rest of the phone is clean black glass, a thin graphite metal frame and quietly rounded corners.
Dark headphones and a softly blurred audio component may provide subtle listening context near the edges.
An understated technical editorial image conveying on-device AI audio processing, with believable construction and warm tactile materials.
No floating processor, exploded parts, external circuitry, arrows, glowing screen graphics or audio waveform transformation.
```

Разрез телефона — намеренная техническая иллюстрация. Изображение передаёт идею обработки на устройстве; оно не является схемой конкретной модели телефона или её процессора.

## Редактирование существующего изображения

Меняйте только то, что требуется задаче. Сохраняйте удачные композицию, освещение, фон и масштаб; не пересобирайте всю сцену ради одной детали.

```text
Edit the supplied image. Preserve its composition, camera angle, soft upper-left daylight, walnut listening environment, background objects and restrained charcoal palette.
Change only: [describe the requested change precisely].
Keep the hardware physically plausible, with coherent materials, controls, ports and construction.
Match the approved FeatureArt references. Preserve the wide 16:9 composition, realistic proportions and central crop-safe subject.
```

После этого блока добавьте конкретное изменение и общий `Avoid`. Например, для DAC: добавить ореховые боковины, регулятор и фронтальный выход для наушников, перенести USB-подключение на заднюю панель; сохранить стол, свет и фон.

## Проверка результата

- Вся серия выглядит снятой в одной домашней аудиосреде: согласованные дерево, графит, мягкость света и насыщенность.
- Главный объект узнаваем в размере 640×360 и при более узком центральном кропе. Ключевая деталь — разъём, чип или колонка — не теряется.
- Устройство выглядит конструктивно убедительно: нет сломанных соединений, случайных регуляторов, лишних портов или деформированной геометрии.
- Дерево имеет естественную текстуру, медь не выглядит золотом, металл не выглядит пластиковым или хромированным.
- Нет брендинга, псевдотекста, лишних световых эффектов и декоративной роскоши.
- AI Enhancer показывает телефон с чипом; DAC имеет деревянные детали и узнаваемые органы управления.

## Экспорт и подключение

- Формат: WebP, **1920×1080**, качество **80**, цветовой режим RGB.
- Проверяйте фактический размер результата генератора. Если он отличается, выполните качественное масштабирование и минимальную подрезку до 16:9 без растяжения пропорций.
- Финальные файлы: `public/img/features/<slug>.webp`.
- Слаги: `usb-dac`, `eq`, `library`, `casting`, `dsp`, `ai-enhancer`.
- Компонент: [`src/components/primitives/FeatureArt.tsx`](../src/components/primitives/FeatureArt.tsx). Он загружает WebP по слагу через `withBase`, использует `object-cover`, заданные размеры и отложенную загрузку.
- При согласованной замене сохраняйте существующий путь, чтобы компонент подхватил изображение. Варианты для сравнения храните отдельно от финальных файлов.
- После замены проверьте файл, карточку на мобильном и десктопе, затем сборку `npm run build`.
- Обновляйте этот документ, если меняются согласованные сюжет или стиль. Финальные промпты должны описывать актуальные изображения.
