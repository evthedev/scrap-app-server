import { routerReducer } from "react-router-redux";
import imagesReducer from './structural/images/reducers'

const reducers = {
    router: routerReducer,
    images: imagesReducer
}

export default reducers