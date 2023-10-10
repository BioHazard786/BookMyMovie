# Documentation

## Routes

### GET

- `/` : Responds if the app is up and running

### POST

- `/getInvoice` : Responds with invoice link if telegram bot api successfully created invoice link

- ```bash
  # Structure of Request body of route /getInvoice

  {
    title: string, # Title of movie
    description: string, # Breif description of movie
    photo_url: string, # photo url of movie
    ticket_data: {
        ticket_count: number, # number of tickets booked
        price_per_ticket: number, # price per ticket
        schedule: string # schedule date of movie
    },
    initData: string # data from telegram web app to validate data on api
  }
  ```

## Swagger Documentation

Run the project and access the documentation at:

[http://localhost:3000/docs](http://localhost:3000/docs)

## Screenshots

See the result after construction:

![Swagger Docs](https://github.com/BioHazard786/BookMyMovie/assets/54793151/5fc69992-c096-4873-9044-3af28aa4c4b3)
