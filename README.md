# blog-posts

The purpose of this project is to take blog post data from an external API and organize it for the end user.

## How it Works
- Parse the client's query
- Fetch blog post data as an array of objects from an external API (URL hidden for privacy) based on 'tag' query 
- Combine arrays and remove duplicate elements
- Sort data based on desired sorting method from client
- Output data as JSON with appropriate HTTP status

## Features
- Parsing user input for errors prior to making requests
- Concurrent HTTP requests (making the requests in parallel) to provide complete data at once
- Suitable async error handling
- Async/await notation for readability
- Unit testing using Jest to ensure robust functionality
- Efficient sorting and filtering

## Technologies
- NodeJS
- Express
- Jest
- Axios
- For development: ESLint, Nodemon, REST Client (VS Code extension) 
