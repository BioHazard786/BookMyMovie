[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/BioHazard786/BookMyMovie">
    <img src="images/BookMyMovieLogo.png" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">BookMyMovie</h3>

  <p align="center">
    This is a Telegram Mini App. Book any imaginary movie with it seamlessly with a unique interface. Made for the contest to be held on 10/10/2023.
    <br />
    <br />
    <a href="https://t.me/BookMyMovieBot">View Demo</a>
    ·
    <a href="https://github.com/BioHazard786/BookMyMovie/issues">Report Bug</a>
    ·
    <a href="https://github.com/BioHazard786/BookMyMovie/issues">Request Feature</a>
  </p>
</div>

## Table of Contents

- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Screenshots

[![BookMyMovie Screen Shot][screenshot-1]](https://t.me/BookMyMovie)

[![BookMyMovie Screen Shot][screenshot-2]](https://t.me/BookMyMovie)

[![BookMyMovie Screen Shot][screenshot-3]](https://t.me/BookMyMovie)

## Getting Started

### Prerequisites

#### Required Variables

- `BOT_TOKEN`: Create a bot using [@BotFather](https://telegram.dog/BotFather), and get the Telegram API token.

- `API_ID`: Get this value from [telegram.org](https://my.telegram.org/apps)

- `API_HASH`: Get this value from [telegram.org](https://my.telegram.org/apps)

- `PROVIDER_TOKEN`: Get this value from [BotFather](https://telegram.dog/BotFather), for more info see [telegram.org](https://core.telegram.org/bots/payments#getting-a-token).

#### Required Softwares

- `NodeJS`: Get this from [nodejs.org](https://nodejs.org/en/download).

- `Python`: Get this from [python.org](https://www.python.org/downloads/)

### Installation

#### 1. Installing requirements

- Clone this repo:

```bash
git clone https://github.com/BioHazard786/BookMyMovie.git
```

#### 2. Setting up ENV vars

**Frontend**

- _Edit the .env file in frontend folder_

```
cd frontend
```

_Fields :-_

- `VITE_API_URL`: Url of API after deploying it. `Str`

**API**

- _Edit the .env file in api folder_

```
cd backend/api
```

_Fields :-_

- `BOT_TOKEN`: The Telegram Bot Token that you got from [@BotFather](https://t.me/BotFather). `Str`

- `PROVIDER_TOKEN`: The Telegram Provider Token that you got from [@BotFather](https://t.me/BotFather). `Str`

- `PORT`: Port for deploying API. Default is 3000. `Int`

**Bot**

- _Edit the .env file in bot folder_

```
cd backend/bot
```

_Fields :-_

- `BOT_TOKEN`: The Telegram Bot Token that you got from [@BotFather](https://t.me/BotFather). `Str`

- `TELEGRAM_API`: This is to authenticate your Telegram account for downloading Telegram files. You can get this from <https://my.telegram.org>. `Int`
- `TELEGRAM_HASH`: This is to authenticate your Telegram account for downloading Telegram files. You can get this from <https://my.telegram.org>. `Str`

#### 2. Running Locally

**Frontend**

```bash
# Navigate to the project directory
cd frontend

# Install dependencies
npm install

# Run Locally
npm run dev
```

**API**

```bash
# Navigate to the project directory
cd backend/api

# Install dependencies
npm install

# Run Locally
node api.js
```

**Bot**

```bash
# Navigate to the project directory
cd backend/bot

# Install dependencies
pip install -r requirements.txt

# Run Locally
python bot.py
```

## Features

- [x] Custom interface using javascript
- [x] Smooth animations using framer motion nad pure CSS animations
- [x] Responsive Layout
- [x] Compatible with telegram mini apps api

## Built With

- [React](https://reactjs.org/) - The JavaScript library used

- [Framer Motion](https://www.framer.com/motion/) - The Animation library used
- [React Router](https://reactrouter.com/en/main) - The Routing library used
- [Zustand](https://github.com/pmndrs/zustand/) - The State Management library used
- [Express](https://expressjs.com/) - The web framework used for API
- [Pyrogram](https://pyrogram.org/) - The python telegram framework used

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Mohd Zaid - [@LuLu786](https://t.me/LuLu786) - bzatch70@gmail.com

Project Link : [https://github.com/BioHazard786/BookMymovie](https://github.com/BioHazard786/BookMymovie)

## Acknowledgments

- Thanks To Dan For His Awesome [Library](https://github.com/pyrogram/pyrogram)
- Thanks To [Poimandres](https://github.com/pmndrss) for Zustand Library.
- Thanks To All Everyone In This Journey

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/BioHazard786/BookMyMovie.svg?style=for-the-badge
[contributors-url]: https://github.com/BioHazard786/BookMyMovie/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/BioHazard786/BookMyMovie.svg?style=for-the-badge
[forks-url]: https://github.com/BioHazard786/BookMyMovie/network/members
[stars-shield]: https://img.shields.io/github/stars/BioHazard786/BookMyMovie.svg?style=for-the-badge
[stars-url]: https://github.com/BioHazard786/BookMyMovie/stargazers
[issues-shield]: https://img.shields.io/github/issues/BioHazard786/BookMyMovie.svg?style=for-the-badge
[issues-url]: https://github.com/BioHazard786/BookMyMovie/issues
[license-shield]: https://img.shields.io/github/license/BioHazard786/BookMyMovie.svg?style=for-the-badge
[license-url]: https://github.com/BioHazard786/BookMyMovie/blob/master/LICENSE
[screenshot-1]: images/Screenshot_1.jpg
[screenshot-2]: images/Screenshot_2.jpg
[screenshot-3]: images/Screenshot_3.jpg
