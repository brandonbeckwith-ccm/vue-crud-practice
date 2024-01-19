
# Todo Application

## WUSIWYG

All components should be labeled accordingly, but here is a quick summary
- The bar and button at the top are used to add todos
- The elements below, from left to right, 
   - A filter input that dynamically updates the list
   - A sort descending toggle
   - A completion status filter that shows *only* completed tasks
   - A refresh button that makes a pull request and updates the tasks

Each task can be marked as completed and deleted (no delete confirmation, live dangerously)

Any api requests are logged in the console and failed requests are displayed to the user. In the event of a failed get request it will reload using old data