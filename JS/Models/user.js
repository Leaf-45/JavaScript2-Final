class user
{
    constructor(firebaseUser)
    {
        {
            this.displayName = ''
            this.email = ''
            this.uid = ''

            if(firebaseUser)
            {
                this.displayName = firebaseUser.displayName ? firebaseUser.displayName : '';
                this.email = firebaseUser.email ? firebaseUser.email : '';
                this.uid = firebaseUser.uid ? firebaseUser.uid : '';
            }
        }
    }
}