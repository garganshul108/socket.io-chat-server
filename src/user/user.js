const buildMakeUser = ({textSanitizer}) => {
    const makeUser = ({username, rooms, friends}) => {
        if(!username) throw new Error('Username must be provided.');
        username = textSanitizer(username);
        rooms = rooms || [];
        friends = friends || [];

        Object.freeze({
            getUsername = () => username,
            getRooms = () => rooms,
            getFriends = () => friends
        });

    }

    return makeUser;
} 


module.exports = buildMakeUser;