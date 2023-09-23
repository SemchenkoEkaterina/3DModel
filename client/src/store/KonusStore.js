import { makeAutoObservable } from 'mobx';

export default class KonusStore {
    constructor() {
        this._konus = [];
         makeAutoObservable(this);
    }

    setKonus(konus) {
        this._konus = konus;
    }

    get konus() {
        return this._konus;
    }
}