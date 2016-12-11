// + -------------------------------------
// | reducers test for common
// + -------------------------------------
// | 
// + -------------------------------------
// | author: Wangsiyuan @ 2016-12-09
// + -------------------------------------

import { showLoading } from '../../actions/index';
import { common } from '../common';

describe('Common Reducer Test', () => {

    it('show loading Test', () => {

        const initState = {
            isLoading: false
        }

        const newState = common(initState, showLoading());

        expect(newState).to.eql({
            isLoading: true
        });

    });
});