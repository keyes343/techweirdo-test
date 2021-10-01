import { useState, useContext, useCallback } from 'react';
import { r, e, t } from './incoming';
import axios from 'axios';

// const backend = 'localhost:5000';

const Med = () => {
    const state_med = useContext(r.med.StateContext);
    const dispatch_med = useContext(r.med.DispatchContext)!;

    const [spinner, set_spinner] = useState<boolean>(false);

    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;

    const [myMeds, set_myMeds] = useState<null | false | t.med.Med[]>(null);

    const fetch_meds = useCallback(async () => {
        if (!state_user.mongoose_id) {
            alert('Cannot fetch meds, You are not logged in yet. Please login first');
            return;
        }
        const api = `${e.links.apis.aws}/med/new`;
        try {
            const { data, status } = await axios.post(api, {
                _id: state_user.mongoose_id,
            });
            if (status === 200) {
                set_myMeds(data.docs);
            }
        } catch (error) {
            console.log({ error });
        }
    }, [state_user.mongoose_id]);

    const save_meds = useCallback(async () => {
        set_spinner(true);
        if (!state_user.mongoose_id) {
            alert('You are not logged in yet. Please login first');
            return;
        }

        const { name, quantity, med_type, start, end, time_of_day, meal } = state_med;
        const check_these: (keyof r.med.State)[] = ['name', 'quantity', 'med_type', 'start', 'end', 'time_of_day', 'meal'];

        let alert_for = '';
        const allow = check_these.every((item) => {
            if (state_med[item]) {
                return true;
            } else {
                alert_for = item;
                return false;
            }
        });
        if (!allow) {
            alert(`You missed the field - ${alert_for}`);
            set_spinner(false);
            return;
        }

        const api = `${e.links.apis.aws}/med/new`;
        // const api = 'http://localhost:5000/med/new';
        const payload: r.med.State = {
            name,
            owner: state_user.mongoose_id,
            quantity,
            med_type,
            start,
            end,
            time_of_day,
            meal,
            taken: [],
        };
        console.log({ api, payload });
        console.log('step 1');
        try {
            const { data, status } = await axios.post(api, payload);
            console.log('step 2');
            if (status === 200) {
                console.log('step 3 - success');
                console.log({ data, status });
                set_myMeds(data.docs);
                set_spinner(false);
                dispatch_med({
                    // reset med field
                    type: r.med.act.reset,
                });
            } else {
                console.log('step 3 - fail');
            }
            console.log('step 4');
        } catch (error) {
            console.log({ error });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state_med, state_user.mongoose_id]);

    return {
        fetch_meds,
        myMeds,
        set_myMeds,
        save_meds,
        spinner,
    };
};

export default Med;
