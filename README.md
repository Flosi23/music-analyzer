## Get Started 💨

Clone the repo using git:

```console
cd ~/Folder/you/want/to/clone/this/repository/into
git clone https://github.com/Flosi23/music-analyzer.git 
```

Open the project in your editor of choice (WebStorm, Vim 🌚 or Visual Studio Code recommended)

### Development

Create a `.env.development` file and set required environment variables (have a look at `env.example`)

You can obtain your own `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in
the [Google Developer Console](https://console.cloud.google.com/apis/dashboard)

You can obtain your own Spotify `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` in
the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)

```dotenv
NEXTAUTH_URL=http://localhost:3000/
API_URL=http://localhost:3000/api
APP_URL=http://localhost:3000
NEXTAUTH_SECRET=<secure password>
SPOTIFY_CLIENT_SECRET=<your spotify client secret>
SPOTIFY_CLIENT_ID=<your spotify client id>
```

Install the dependencies of the Project (You can open up a new terminal in Visua Studio Code with <kbd>
Ctrl</kbd> + <kbd>J</kbd>):

```console
npm i
```

Setup the database

```console
npm run new
```

Start a local development server

```console
npm run dev
```

#### Other useful commands

- `npm run debug` starts a development server that can be debugged
- `npm run check` runs the typescript linter
- `npm run lint` runs prettier and eslint linter
- `npm run fix` attempts to fix as many prettier and eslint errors as possible

### Deployment / Production

Create a separate `.env.production` file with your production environment secrets

Build the applicatoin using `npm run build` and then start it using `npm run start` or do both by
running `npm run production`

