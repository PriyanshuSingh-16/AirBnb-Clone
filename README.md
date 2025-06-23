
# Airbnb Clone

A full-stack web application clone of Airbnb built with Node.js, Express.js, MongoDB, and EJS templating engine. This project allows users to create, view, edit, and delete property listings, leave reviews, and manage user authentication.

## Features

- **User Authentication**: Sign up, login, and logout functionality using Passport.js
- **Property Listings**: Create, read, update, and delete property listings
- **Image Upload**: Upload property images using Cloudinary
- **Reviews System**: Add and manage reviews for properties
- **Interactive Maps**: Integration with MapTiler for location display
- **Session Management**: Secure session handling with MongoDB store
- **Flash Messages**: User feedback with connect-flash
- **Responsive Design**: Mobile-friendly UI with Bootstrap

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with local strategy
- **Templating**: EJS with EJS-Mate
- **File Upload**: Multer with Cloudinary storage
- **Session Store**: MongoDB with connect-mongo
- **Maps**: MapTiler SDK
- **Styling**: Bootstrap, Custom CSS

## Prerequisites

Before running this application, make sure you have:

- Node.js (v16.13.0 or higher)
- MongoDB Atlas account or local MongoDB installation
- Cloudinary account for image storage
- MapTiler account for maps integration

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
ATLAS_DB=your_mongodb_connection_string
SECRET=your_session_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_maptiler_api_key
```

## Installation

1. Clone the repository or fork it on Replit
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables
4. Initialize the database with sample data (optional):
   ```bash
   node init/index.js
   ```
5. Start the application:
   ```bash
   node app.js
   ```

The application will run on port 8080.

## Project Structure

```
├── controllers/          # Route controllers
├── init/                # Database initialization scripts
├── models/              # MongoDB models
├── public/              # Static assets (CSS, JS)
├── routes/              # Express routes
├── utils/               # Utility functions
├── views/               # EJS templates
├── middleware.js        # Custom middleware
├── schema.js           # Joi validation schemas
├── cloudConfig.js      # Cloudinary configuration
└── app.js              # Main application file
```

## Deployment on Replit

### Step 1: Set up Environment Variables
1. Go to the Secrets tab in your Replit workspace
2. Add all required environment variables listed above

### Step 2: Configure Run Command
The application is already configured to run with:
```bash
node app.js
```

### Step 3: Deploy to Production
1. Click the "Deploy" button in Replit
2. Choose "Autoscale" deployment type
3. Use the following configuration:
   - **Build command**: Leave empty (no build step required)
   - **Run command**: `node app.js`
   - **Port**: The app runs on port 8080
4. Click "Deploy" to publish your application

### Step 4: Custom Domain (Optional)
- Set up a custom domain in the deployment settings
- Configure DNS settings as provided by Replit

## Database Setup

This project uses MongoDB Atlas. To set up:

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create database user credentials
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs in development)
5. Get your connection string and add it to the `ATLAS_DB` environment variable

## File Upload Configuration

Images are stored using Cloudinary:

1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret
3. Add these to your environment variables
4. Images will be automatically uploaded to the "AirbnbClone_DEV" folder

## Authentication

The application uses Passport.js with local strategy:
- Users can sign up with email and username
- Passwords are hashed and stored securely
- Session-based authentication with MongoDB session store
- Protected routes require user authentication

## API Endpoints

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Show create listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - View single listing
- `GET /listings/:id/edit` - Show edit listing form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Add review to listing
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

### User Authentication
- `GET /signup` - Show signup form
- `POST /signup` - Register new user
- `GET /login` - Show login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB connection is working
4. Check Cloudinary configuration for image upload issues

## Production Considerations

- Set `NODE_ENV=production` in production environment
- Use strong session secrets
- Implement rate limiting
- Set up proper error logging
- Configure HTTPS
- Optimize images and assets
- Implement proper backup strategies for your database
