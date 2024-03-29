const Claims = {
    NameIdentifierTokenKey: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
    NameTokenKey: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
    EmailTokenKey: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
    RoleTokenKey: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
    AvatarTokenKey: 'Avatar'
};

const Event = {
    CREATE_POST: 'create:post',
    DELETE_POST: 'delete:post',
    EDIT_POST: 'edit:post',
    CREATE_COMMENT: 'create:comment',
    DELETE_COMMENT: 'delete:comment',
    EDIT_COMMENT: 'edit:comment',
    CLOSE_MODAL: 'close:modal',
    CREATE_FEEDBACK: 'create:feedback',
    DELETE_FEEDBACK: 'delete:feedback',
    UPDATE_AVATAR: 'update:avatar',
    UPDATE_WORKOUT: 'update:workout'
}

export {
    Claims,
    Event
};
