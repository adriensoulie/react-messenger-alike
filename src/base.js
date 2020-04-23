import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDqBLdFghveJo8V2OJ2HZZeJXZQb_8X1KU",
    authDomain: "messenger-react-300fb.firebaseapp.com",
    databaseURL: "https://messenger-react-300fb.firebaseio.com",
})

const base = Rebase.createClass(firebase.database())

export { firebaseApp } 

export default base
