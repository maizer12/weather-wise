## English

Updated text:

Functionality:

1. Search:
   Autocomplete is supported, allowing you to search using both entered text and suggestions from the autocomplete. The button has a loading state.

Error handling includes:

1. Lack of entered text.
2. Absence of information about the city.
3. Attempt to add a city that has already been added.

2.Weather Cards:
Upon the first login, the application automatically determines the user's location based on their IP address and creates one weather card accordingly. Two types of photos are available: day and night. The photo type is automatically determined based on data about the specific city. All weather cards are added to local storage immediately after the search.

The maximum number of cards for searching is 5. If the user already has 5 cards, they will receive a warning in the form of a modal window. A modal window also appears when deleting cards from the search.

Each card has two types of data that can be toggled: data for today and data for 5 days. You can add or remove a card from favorites.

When you click on a specific card, a chart opens below all the cards with information for 5 days. Upon a second click, the selection is hidden.

## Ukrainian

Функционал:

1.Поиск:
Поддерживается автокомплит, который позволяет вам искать как введенный текст, так и выбирать подсказки из автокомплита. Также есть состояние загрузки кнопки.

Обработка ошибок включает в себя:

1. Отсутствие введенного текста.
2. Отсутствие информации о городе.
3. Попытка добавления города, который уже был добавлен.

2.Картки с погодой:

При первом входе приложение автоматически определяет местоположение пользователя по IP-адресу и на основе этой информации создает одну карточку. Доступны два типа фотографий: дневные и ночные. Тип фотографии автоматически определяется на основе данных о конкретном городе. Все карточки с погодой добавляются в локальное хранилище сразу после поиска.

Максимальное количество карточек для поиска - 5. Если у пользователя уже есть 5 карточек, он получит предупреждение в виде модального окна. При удалении карточек из поиска также появляется модальное окно.

У каждой карточки есть два типа данных, которые можно переключить: данные за сегодня и за 5 дней. Карточку можно добавить в избранное или удалить оттуда.

Когда вы нажимаете на определенную карточку, открывается график под всеми карточками с информацией на протяжении 5 дней. При повторном нажатии выборка скрывается.
