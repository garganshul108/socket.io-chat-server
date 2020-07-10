const buildMakeRoom = ({ textSanitizer }) => {
  const makeRoom = ({ title, admins, members, messages }) => {
    if (!title) {
      throw new Error("Room must have a title.");
    }
    title = textSanitizer(title);

    if (!admins || Array.isArray(admins) || admins.length < 1) {
      throw new Error("Room must have an admin.");
    }

    if (!members || Array.isArray(members)) {
      throw new Error("Room must have an admin.");
    }

    if (!messages || Array.isArray(messages)) {
      throw new Error("Room must have an admin.");
    }

    return Object.freeze({
      getTitle: () => title,
      getAdmins: () => admins,
      getMembers: () => members,
      getMessages: () => messages,
      countMembers: () => members.length,
      addMember: ({ admin, user }) => {
        if (!admin) throw new Error("Admin required.");
        if (!user) throw new Error("User required.");

        if (admins.includes(admin)) {
          members.push(user);
        } else {
          throw new Error("Only admin can add a new member.");
        }
      },
      hasAsAdmin: ({ user }) => {
        if (!user) throw new Error("User to be tested required.");
        return admins.includes(user);
      },
      hasAsMember: ({ user }) => {
        if (!user) throw new Error("User to be tested required.");
        return members.includes(user);
      },
      removeMember: ({ member }) => {
        if (!member) throw new Error("Member required.");
        if (members.includes(member)) {
          //TODO: delete member
          throw new Error("Not functional.");
        } else {
          throw new Error("Not a member.");
        }
      },
      addAdmin: ({ admin, member }) => {
        if (!admin) throw new Error("Admin required.");
        if (!member) throw new Error("Member required.");
        if (admins.includes(member)) throw new Error("Already admin.");
        if (admins.includes(admin) && members.includes(members)) {
          admins.push(member);
        } else {
          throw new Error("Either insufficient priveledges or not a member.");
        }
      },
      removeAdmin: () => {
        throw new Error("Not Functional.");
      },
      addMessage: ({ message }) => {
        if (!members.includes(message.senderId)) {
          throw new Error(
            "Action Prohibited: Not authorised as a member of the room."
          );
        }
        if (!message) {
          throw new Error("Message must be provided.");
        }
        messages.push(message);
      },
    });
  };
  return makeRoom;
};

module.exports = buildMakeRoom;
