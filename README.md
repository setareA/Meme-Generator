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

### Meme Management

#### Get all images

* HTTP method: `GET`  URL: `/api/images`
* Description: Get the full list of images
* Request body: _None_
* Request query parameter: _None_
* Response: `200 OK` (success)
* Response body: Array of objects, each describing one image:

``` JSON
[{
        "id": 2,
        "imgAddr": "img.png",
        "field": [
            {
                "pos": "10 10"
            }
        ]
}]
```

* Error responses:  `500 Internal Server Error` (generic error), `401` (not authenticated)

#### Get image by id

* HTTP method: `GET`  URL: `/api/images/:id`
* Description: Get the image corresponding to the id 
* Request body: _None_
* Response: `200 OK` (success)
* Response body: One object describing the required image:

``` JSON
{
        "id": 2,
        "imgAddr": "img.png",
        "field": [
            {
                "pos": "10 10"
            }
        ]
}
```

#### Get all memes

* HTTP method: `GET`  URL: `/api/memes/all`
* Description: Get the full list of memes
* Request body: _None_
* Response: `200 OK` (success)
* Response body: Array of objects, each describing one meme:

``` JSON
[{
        "id": 4,
        "imgAddr": "img.jpeg",
        "visibility": "public",
        "userId": 3,
        "userName": "setare@gmail.com",
        "userRealName": "setareh",
        "title": "title",
        "num_of_fields": 3,
        "font": "cursive",
        "color": "white",
        "field": [
            {
                "text": "hoho",
                "pos": "100 30"
            }
        ]
    }]
```

* Error responses:  `500 Internal Server Error` (generic error), `401` (not authenticated), `403` (not authorized)

#### Get meme by id

* HTTP method: `GET`  URL: `/api/memes/:id`
* Description: Get the meme corresponding to the id
* Request body: _None_
* Response: `200 OK` (success)
* Response body: One object describing the required meme:

``` JSON

        "id": 4,
        "imgAddr": "img.jpeg",
        "visibility": "public",
        "userId": 3,
        "userName": "setare@gmail.com",
        "userRealName": "setareh",
        "title": "title",
        "num_of_fields": 3,
        "font": "cursive",
        "color": "white",
        "field": [
            {
                "text": "hoho",
                "pos": "100 30"
            }
        ]
    }
```

* Error responses:  `500 Internal Server Error` (generic error), `404 Not Found` (not present or unavailable), `401` (not authenticated), `403` (not authorized)

#### Get all public memes

* HTTP method: `GET`  URL: `/api/publicMemes`
* Description: Get the full list of public memes
* Request body: _None_
* Response: `200 OK` (success)
* Response body: Array of objects, each describing one meme:

``` JSON
[{
        "id": 4,
        "imgAddr": "img.jpeg",
        "visibility": "public",
        "userId": 3,
        "userName": "setare@gmail.com",
        "userRealName": "setareh",
        "title": "title",
        "num_of_fields": 3,
        "font": "cursive",
        "color": "white",
        "field": [
            {
                "text": "hoho",
                "pos": "100 30"
            }
        ]
    }]
```

* Error responses:  `500 Internal Server Error` (generic error)

#### Add a new meme

* HTTP method: `POST`  URL: `/api/memes`
* Description: Add a new meme to the memes of the logged user
* Request body: description of the object to add
``` JSON
{
    "imgId": "1",
    "visibility": "public",
    "title": "title",
    "font":"Cursive",
    "color":"blue",
    "field":[{"text": "kk", "pos":"20 40"} , {"text": "jj", "pos":"60 70"} ]
}
```

* Response: `200 OK` (success)
* Response body: the object as represented in the database

* Error responses:  `500 Internal Server Error` (generic error), `404 Not Found` (if image is not found), `401` (not authenticated), `403` (not authorized)


#### Copy meme

* HTTP method: `POST`  URL: `api/memes/copy/:id`
* Description: copy a meme with given id 
* Request body: description of the object to copy
``` JSON
{
    "imgId": "1",
    "visibility": "public",
    "title": "title",
    "font":"Cursive",
    "color":"blue",
    "field":[{"text": "kk", "pos":"20 40"} , {"text": "jj", "pos":"60 70"} ]
}
```

* Response: `200 OK` (success)
* Response body: the object as represented in the database

* Error responses:  `500 Internal Server Error` (generic error), `404 Not Found` (if image is not found), `401` (not authenticated), `403` (not authorized)

#### Delete a meme

* HTTP method: `DELETE`  URL: `/api/memes/:id`
* Description: Delete an existing meme of the logged user
* Request body: _None_
* Response: `204 OK` (success)
* Response body: an empty object

* Error responses:  `500 Internal Server Error` (generic error), `401` (not authenticated), `403` (not authorized)

### User management

#### Login

* HTTP method: `POST`  URL: `/api/sessions`
* Description: authenticate the user who is trying to login
* Request body: credentials of the user who is trying to login

``` JSON
{
    "username": "username",
    "password": "password"
}
```

* Response: `200 OK` (success)
* Response body: authenticated user

``` JSON
{
    "id": 1,
    "username": "user@gmail.com", 
    "name": "user",
    "type": "creator"
}
```
* Error responses:  `500 Internal Server Error` (generic error), `401 Unauthorized User` (login failed)


#### Check if user is logged in

* HTTP method: `GET`  URL: `/api/sessions/current`
* Description: check if current user is logged in and get her data
* Request body: _None_
* Response: `200 OK` (success)

* Response body: authenticated user

``` JSON
{
    "id": 1,
    "username": "user@gmail.com", 
    "name": "user",
    "type": "creator"
}
```

* Error responses:  `500 Internal Server Error` (generic error), `401 Unauthorized User` (user is not logged in)


#### Logout

* HTTP method: `DELETE`  URL: `/api/sessions/current`
* Description: logout current user
* Request body: _None_
* Response: `200 OK` (success)

* Response body: _None_

* Error responses:  `500 Internal Server Error` (generic error), `401 Unauthorized User` (user is not logged in)


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
