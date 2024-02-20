import {
    observable, action
} from "mobx";

class AppState {
    @observable name = "angyangxu 1.0 Simmer 1.0+";
    @action doSomething(val) {
        this.name = val
    }
}

const appState = new AppState();

export default appState;