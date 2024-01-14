const Claims = {
    NameIdentifierTokenKey: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
    NameTokenKey: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
    EmailTokenKey: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
    RoleTokenKey: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
    AvatarTokenKey: 'Avatar'
};

const Event = {
    DELETE_POST: 'delete:post'
}

export {
    Claims,
    Event
};
