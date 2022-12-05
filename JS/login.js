function signIn(email, password)
{
    firebase.auth().signInWithEmailAndPassword(email, password)
}

function signUp(email, password)
{
    firebase.auth().createUserWithEmailAndPassword(email, password)
}

