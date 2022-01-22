# Packet Formatting

The game uses a WebSocket to transmit data between the game frontend and backend.
While there's a small REST API to handle account / character creation, the vast
majority of work is done through the WebSocket packets. This document describes
the schema of messages.

# Messages

Messages are sent from the client to the game.

## Auth

All messages must contain an authentication field and valid token. This tags a
message to a logged in account. All logins are handled through the REST /login API.

```
{
	...
	auth: String,
	...
}
```

## System

### LoginCharacter

Logs a character into the game.

```
{
	messageType: 'LoginCharacter',
	characterId: String
}
```

# Events

Events are sent from the game to the client.

## TextMessage

A raw text message sent from the service. These have a raw message in them that should be displayed to the characters.

```
{
	event: 'TextMessage',
	message: String
}

```

# Responses

Responses are messages sent as a result of the client initiating some action. Most
other messages are sent as events, i.e., not as a result of responding to the action.

## Errors

Valid errors:
* `Unauthorized`: the message failed authentication. This will cause the socket to close.
* `BadMessage`: the message was formatted improperly or was missing a required field.

```
{
	error: String,
	message: String
}
```
