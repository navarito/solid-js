export const MemberType = {
    NORMAL: 'NORMAL',
    MEMBER: 'MEMBER',
};

export class Member {
    /**
     * @param {string} id
     * @param {string} name
     * @param {string} email
     * @param {MemberType} memberType
     */
    constructor(id, name, email, memberType = MemberType.NORMAL) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.memberType = memberType;
    }

    isNormal() { return this.memberType == 'NORMAL'; }
    isMember() { return this.memberType == 'MEMBER'; }
}