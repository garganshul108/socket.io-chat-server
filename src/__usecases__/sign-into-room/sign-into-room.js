const makeSignIntoRoom = ({roomDb}) => {
    const signIntoRoom = ({title, member}) => {
        const existing = await roomDb.findByTitle({title});
        if(!existing){
            return {
                ok: false,
                message: `No room with title as ${title} exists.`
            }
        }

        if(!existing.members.includes(member)){
            return {
                ok: false,
                statusCode: 403,
                message: `Not an autorised member.`
            }
        }

        return {
            ok: true,
            message: 'Sign into room successfull.',
            body: {...existing}
        }
    }

    return signIntoRoom;
}

module.exports = makeSignIntoRoom;