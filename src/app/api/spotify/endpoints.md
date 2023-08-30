# Data Fetching Endpoints: Spotify

All API endpoints expect an Header 'Authorization' with the value "Bearer {AccessToken}" and use the GET Method.

Every StatusCode other than 200 is bad. If something went wron the res will have a "err" property specify what went wrong!

## /me

return:

```TS
{
    displayName: String,
    email: String,
    externalUrl: String,
    followersCount: Number,
    id: String,
    images: [String],
}
```

## /artist/id

return:

```TS
{
    externalUrl: String,
    followersCount: Number,
    genres: [String],
    images: [String]
    name: String,
    popularity: Number,
    topSongs: [{
        id: String,
        name: String,
        imageUrl:String, // null if not available
    }],
    relatedArtists: [{
        id: String,
        name: String,
        imageUrl:String, // null if not available
    }]

}
```

## /topartists?limit={}&time={}

params:

```TS
    limit: Number
    time: short_term || medium_term || long_term
```

return:

```TS
total: Number
items: [{
    imageUrls:[String]
    name: String
    id: String
    imageUrls: [String]
}]
```

## /topsongs?limit={}&time={}

params:

```TS
    limit: Number
    time: short_term || medium_term || long_term
```

return:

```TS
total: Number
items: [{
    id: String,
    name: String,
    artists:[{name: String, id: String}],
    previewUrl: String // null if not available
    albumImages: [String]
}]
```

## /song/id

```TS
{
    album: {
        name: String
        images: [String]
        releaseDate: String
        releaseDatePrecision: String
        popularity: Number
    }
    artist:[{
        name:String
        id: String
        images: [String]
    }]
    genres: [String]
    externalUrl: String
    popularity: Number
    name: String
    previewUrl: String // null if not available
    id: String
    duration: Number // in seconds
    //audio fetures
    key: String
    mode: String //major or minor
    //for chart
    acousticness: Number // 0.0 to 1.0
    danceability: Number // 0.0 to 1.0
    energy: Number // 0.0 to 1.0
    instrumentalness: Number // 0.0 to 1.0
    liveness: Number // 0.0 to 1.0
    loudness: Number // -60.0 to 0.0
    speechiness: Number // 0.0 to 1.0
    valence: Number // 0.0 to 1.0
}
```

## /nowplaying

return:

```TS
{
    isPlaying: Boolean,
    name: String,
    artist: [String],
    id: String,
}
```

if isPlaying is false, name, artist and id will be null

## /generateplaylistsongs?time_range:{}

params:

```TS
    time: short_term || medium_term || long_term
```

return if everything is ok:

```TS
{
    href: String,
}
```
