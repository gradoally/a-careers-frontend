## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start - запуск frontend проекта в dev режиме
```

`Ссылка на деплой проекта` - https://deluxe-gingersnap-d2e6cb.netlify.app/

----

## Работа с Git

- [Нейминг коммитов](/docs/git-commits/README.md)
- [Работа с Gitflow](/docs/gitflow/README.md)

----

## Скрипты

- `npm run start` - Запуск frontend проекта на vite
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме (не минимизирован)
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером
- `npm run test:unit` - Запуск unit тестов с jest
- `npm run storybook` - запуск storybook
- `npm run storybook:build` - Сборка storybook билда

----

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design
Мы используем на проекте `kebab-case`

Проект на FSD состоит из слоев `(layers)`, каждый слой состоит из слайсов `(slices)` и каждый слайс состоит из сегментов `(segments)`.

Слои стандартизированы во всех проектах и расположены вертикально. Модули на одном слое могут взаимодействовать лишь с модулями, находящимися на слоях строго ниже. На данный момент слоев семь (снизу вверх):

- `shared` — переиспользуемый код, не имеющий отношения к специфике приложения/бизнеса (например, UIKit, libs, API).
- `entities (сущности)` — бизнес-сущности (например, User, Product, Order).
- `features (фичи)` — взаимодействия с пользователем, действия, которые несут бизнес-ценность для пользователя (например, SendComment, AddToCart, UsersSearch).
- `widgets (виджеты)` — композиционный слой для соединения сущностей и фич в самостоятельные блоки (например, IssuesList, UserProfile).
- `pages (страницы)` — композиционный слой для сборки полноценных страниц из сущностей, фич и виджетов.
- `processes (процессы)` — сложные сценарии, покрывающие несколько страниц (например, авторизация).
- `app` — настройки, стили и провайдеры для всего приложения.

Затем есть слайсы, разделяющие код по предметной области. Они группируют логически связанные модули, что облегчает навигацию по кодовой базе. Слайсы не могут использовать другие слайсы на том же слое, что обеспечивает высокий уровень связности (cohesion) при низком уровне зацепления (coupling).

В свою очередь, каждый слайс состоит из сегментов. Это маленькие модули, главная задача которых — разделить код внутри слайса по техническому назначению. Самые распространенные сегменты — `ui, config, types, model (store, actions), api и lib (utils/hooks)`, но в вашем слайсе может не быть каких-то сегментов, могут быть другие, по вашему усмотрению.

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.
Также есть babel plugin, который при `npm start` берет из всего проекта переводы и кладет их в папку extractedTranslations

Для комфортной работы рекомендуем установить плагин для webstorm/vscode

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

----

## Тесты

Файл с тестами создаем рядом с компонентом с расширением .test.ts

В проекте используются 2 вида тестов:
1) Обычные unit тесты на jest - `npm run unit`
2) Тесты на компоненты с React testing library -`npm run unit`

[Более детально](/docs/tests/README.md)

----

## Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

##### Запуск линтеров
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером

----

## Конфигурация проекта

Для разработки проект содержит в одном конфиге:
1. vite - vite.config.ts

----

## CI pipeline

Конфигурация github actions находится в /.github/workflows.
В ci прогоняются все виды тестов, сборка проекта и сторибука, линтинг.
