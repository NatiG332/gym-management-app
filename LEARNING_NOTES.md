# Learning Notes

## How this app maps to MVC
- Model: the files in src/models handle database interactions.
- View: the frontend in public/index.html displays information to the user.
- Controller: the files in src/controllers process requests and return responses.
- Routes: the files in src/routes connect URLs to controllers.

## Security concepts in this project
- Password hashing with bcryptjs
- JWT-based authentication
- Role-based access control for class creation
- Logging middleware

## Database concept
- users stores accounts
- classes stores gym sessions
- bookings links users to classes

## Presentation talking points
- Explain why the app uses separate folders for routes, controllers, and models.
- Describe how the API accepts requests from the frontend.
- Describe how JWTs make a user session stateful in a simple way.
