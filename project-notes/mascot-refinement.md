# Кот для первого экрана

Использован встроенный Imagegen, редактирование присланного пользователем изображения потягивающегося кота. Добавлена новогодняя шапка, очищены края, сохранён прозрачный фон. Итоговый ассет: `public/mascot/stretch-hat.webp`, 800 × 965, alpha сохранён. Контур проверен на синем `#3b8beb` и тёмном `#111318` фоне.

На телефоне ширина маскота 112 px; он размещён справа на снежной кромке городской панорамы. На десктопе ширина до 320 px.

## Итоговый промпт

Use case: precise-object-edit. Edit target: the provided black long-haired cat in an exact stretching/play-bow pose, raised curved fluffy tail, hindquarters high, forelegs stretched toward the viewer, face low. Add a small realistic red Santa hat with soft white fur trim and a white pom-pom, naturally sitting on this cat's head between/around the ears. The hat must fit the head's downward angle and perspective; do not cover the eyes or muzzle. Preserve the cat's exact pose, silhouette, raised tail, four paws, proportions, expression, yellow eyes, black fur texture and whiskers. Keep whole cat visible, no crop. No sitting or lying pose. Do not change the cat identity. Also clean the existing extraction edges: remove all stray white/gray matte pixels and blocky halos outside the actual fur, while preserving wispy dark fur and whiskers. Background must be actual transparent alpha, including between legs and around tail; no baked checkerboard, no white or black background. No floor, scenery, cast shadow, text, or other objects. Output only this same stretching cat now wearing the Santa hat, carefully cut out for use over a saturated blue webpage.
