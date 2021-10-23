## 3. Building Pagination

1. Modify the EventService API call to take `perPage` and `page`
2. Parse and set the current `page` from the router using Function Mode
3. Modify EventList.vue to pass on `page` number to EventService API
4. Add Pagination links to the EventList Template
5. Only show the Next page link when there is a Next page
6. Improve the pagination styling