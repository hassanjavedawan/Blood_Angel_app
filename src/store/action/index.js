import database from "@react-native-firebase/database";
import auth from '@react-native-firebase/auth';

const getPersonalInfo = () => {
    let arr = []
    return (dispatch) => {
        database().ref('/').child('Personal information').on("child_added", (data) => {
            arr.push(data.val())
            var js = JSON.stringify(arr)
            var st = JSON.parse(js)
            // setTimeout(() => {
                dispatch({ type: 'DONOR', payload: st })
            // }, 2000);
        })
    }
}



export {
    getPersonalInfo, 
}