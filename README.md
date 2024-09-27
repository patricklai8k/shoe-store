# ALDO shoe sale dashboard

I've created a dashboard based on the take home challenged provided

This dashboard uses API endpoints that are intercepted and mocked by MirageJS
It also uses Mapbox to render a map to allow the user to better orient themselves when looking at the list of stores they are monitoring
The app will listen to the websocket connection to Ruby app and update the UI if inventory reaches a threshold

you will need am `.env` file to run the app
`REACT_APP_MAP_BOX_TOKEN={{MAP_BOX_TOKEN}}`

to run the project:
`npm start`

### Breaking down the Assignment

* Potloc wants to evaluate my technical and problem solving abilities, then later my presentation skills.
* Skills to highlight within the Assignment:
    * Understanding business/user pains
    * Solution Planning & execution (front-end technologies, APIs)
    * Soft Skills (stating assumptions, logical reasoning, creativity, attention to detail)

### Understanding business/user pains

* The inventory department needs real-time information to react to inventory problems.
* Inventory problem examples:
    * No inventory/low inventory
        * No inventory is bad for business because it could lead to a missed sale opportunity if a user comes into the store and no shoes are available.
        * Ideally the inventory department learns about Low Inventory before it becomes No Inventory. That way decisions can be made before disappointing customers. 
        * Example reactions for low inventory, suggest shoe transfers from one store to another.
        * Business Logic notes: 
    * Stale/stagnant inventory
        * Stale inventory is bad for business because it takes up space in store without generating sales. Reasons could vary based on marketing, product quality/customer reviews, or seasonal demand changes.
        * Example reactions for stagnant inventory could be:
            * Move inventory to locations where the sales have been higher
            * Discount the prices of the shoes

### Solution Planning

* Scope
    * For simplicity of the take-home exercise, I focused on the No/low inventory problem instead of the Stale/stagnant inventory problem. One reason I deprioritized it was because data around stock dates would be required, and were not included in the sample app. I’d be happy to discuss how I would approach this in our conversation.

* No Inventory user flow
    * Simple user flow diagram: https://drive.google.com/file/d/1gQu0uADWHeI_ItB-JjAR_L6GMnwsa7Ea/view?usp=sharing

* Skills incorporated
    * Mapbox integration
    * ReChart graph integration
    * MirageJS API mocking
    * WebSocket integration
