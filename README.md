# echo

A location based social network with a unique two dimensional interface in place of a convential timeline. Built with React and Apollo.

## about

I thought it'd be cool to have a social network that only lets you connect with the people close to your physical location and that restricts content to being visible for 24 hours.

How this app works is that it gets your location IRL, and then makes a request to get posts that were created within some fixed distance from that location within the last 24 hours.

This is an extreme work in progress, and is actively being worked on in order to make it a thing that people will actually want to log on to.

## developing

Make sure you have this stuff installed before digging in:

- [Node v10+](https://volta.sh/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [Docker for Mac](https://docs.docker.com/docker-for-mac/install/)

If you're all set, do the following in two separate tabs:

### tab 1

```
docker-compose up
```

### tab 2

Once docker-compose is up and running...

```
yarn install
```

```
yarn dev
```

Assuming all goes well, echo will be accessible from http://localhost:4200.
