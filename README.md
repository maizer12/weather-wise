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


