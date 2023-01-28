# Mind-Map

**Mind-Map** is a web application for creating mind maps similar to XMind or MindMeister. Mind maps are a way of organizing thoughts and concepts into diagrams and **Mind-Map** seeks to improve the user's productivity by providing them a simple and powerful way to create such diagrams. It provides flexible functionality to create and customize mind maps and schemas of varying degrees of complexicity. The app can support multiple users who are using different accounts independently of each other. It provides the ability to save, delete and highlight multuple mind maps for each user.

## Installation

To run **Mind-Map** on your local machine you'll need to have NodeJS installed. To run and install the dependencies for the client side run the code below in the *client* directory.

```bash
npm install
npm start
```

However the app requires the server side running to function properly. Use this code in the *server* directory to run the server side and install it's dependencies.

```bash
npm install
npm run dev
```

Note that **Mind-Map** requires a *MongoDB Server* running on your machine for all the features to be usable. Without it the app will still work in demo mode however you won't be able to create an account or save anything.

## Usage

To start using the app create an account and login. If you're using demo mode you can login under any email and password.

From there you can use the application to create and manage different mind maps. You can rename, highlight and delete them as well as use the search bar to find the project you're looking for. This will be unavailable in demo mode.

To start working with a mind map just click on it. From there you'll be able to create new ideas, connect them together and customize it so it's perfect for you.

![Customization](/assets/customization.gif "Customization functionality")
