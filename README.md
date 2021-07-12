# Exam #1234: "Meme Generator"
## Student: s288485 Askarifirouzjaei Setareh

## React Client Application Routes

- Route `/home`: home page which contains list of memes 
- Route `/login`: login page
- Route `/meme/:id`: specific meme page 

## API Server

- POST `/api/login`
  - request parameters and request body content
  - response body content
- GET `/api/something`
  - request parameters
  - response body content
- POST `/api/something`
  - request parameters and request body content
  - response body content
- ...

## Database Tables

- Table `meme` - contains id imagName visibility userId title numOfsentences font color
- Table `meme_sentence` - contains id text memeId position
- Table `image` - contains id imageName numOfFields
- Table `image_text_field` - contains id text memeId position
- Table `user` - contains id username password

## Main React Components

- `Meme` (in `Meme.js`): contains all information of a meme
- `MemeCard` (in `MemeCard.js`): each meme in the homepage which contains the button for copy, delete and view
- `MemeModal` (in `MemeModal.js`): used for copy and creating new meme
- `LoginForm` (in `LoginForm.js`): used for login
- `Home` (in `Home.js`): main page, shows list of all memes

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](/img/Screenshot.png)

## Users Credentials

- setare@gmail.com, 123456 
- sara@gmail.com, asdfg
- user@gmail.com, qwert
