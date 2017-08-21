import Ember from 'ember';
import PromiseState from '../utils/promise-state';

export default Ember.Service.extend({
    store: Ember.inject.service(),

    fetch() {
        const promiseState = ViewsPromiseState.create();

        promiseState.load(
            this.get('store')
            .findAll('view')
            .then(
                (data) => promiseState.succeedLoad(data),
                (error) => promiseState.failLoad(error)
            )
        );

        return promiseState;
    },

    fetchById(viewId) {
        const promiseState = ViewPromiseState.create();

        promiseState.load(
            this.get('store')
            .findAll('view')
            .then(
                (data) => promiseState.succeedLoad(data.findBy('id', viewId)),
                (error) => promiseState.failLoad(error)
            )
        );

        return promiseState;
    },
});

const ViewsPromiseState = PromiseState.extend({
    views: null,

    load(promise) {
        this.beginPropertyChanges();

        this.setProperties({
            views: null,
        });
        this._super(promise);

        this.endPropertyChanges();
    },

    succeedLoad(data) {
        this.beginPropertyChanges();

        this.set('views', data);
        this._super(data);

        this.endPropertyChanges();
    },
});

const ViewPromiseState = PromiseState.extend({
    view: null,

    load(promise) {
        this.beginPropertyChanges();

        this.setProperties({
            view: null,
        });
        this._super(promise);

        this.endPropertyChanges();
    },

    succeedLoad(data) {
        this.beginPropertyChanges();

        this.set('view', data);
        this._super(data);

        this.endPropertyChanges();
    },
});
