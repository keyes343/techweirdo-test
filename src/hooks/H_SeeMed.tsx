import { useEffect, useState, useContext, useCallback } from 'react';
import { r, e, t } from './incoming';
import axios from 'axios';

// const backend = 'localhost:5000';

const Med = () => {
    // const state_med = useContext(r.med.StateContext);
    // const dispatch_med = useContext(r.med.DispatchContext)!;
    const [selectedDate, set_selectedDate] = useState<null | Date>(null);
    const [spinner, set_spinner] = useState<boolean>(false);

    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;

    const [myMeds, set_myMeds] = useState<null | false | t.med.Med[]>(null);

    const fetch_myMeds = useCallback(async () => {
        if (!state_user.mongoose_id) {
            return;
        }
        const api = `${e.links.apis.aws}/med/get_my_meds`;
        try {
            const { data, status } = await axios.post(api, {
                _id: state_user.mongoose_id,
                date: selectedDate,
            });
            console.log({ data, status });
            if (status === 200) {
                set_myMeds(data.docs);
            }
        } catch (error) {
            console.log({ error });
        }
    }, [selectedDate, state_user.mongoose_id]);

    useEffect(() => {
        console.log('Firing Fetch myMeds');
        fetch_myMeds();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]);

    const toggle_taken = useCallback(
        async (_id: string) => {
            if (!selectedDate) {
                alert('Date not selected, something wrong');
                return;
            }
            set_spinner(true);
            console.log({ selectedDate });
            try {
                const d_ = selectedDate;
                const date_ = d_.getDate();
                const month = d_.getMonth();
                const year = d_.getFullYear();
                const date_text = `${date_}/${month}/${year}`;

                const api = `${e.links.apis.aws}/med/toggle_taken`;
                const payload = {
                    _id,
                    date_text,
                };
                const { data, status } = await axios.post(api, payload);
                if (status === 200) {
                    fetch_myMeds().then(() => {
                        set_spinner(false);
                    });
                }
            } catch (error) {
                console.log({ error });
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedDate]
    );

    return {
        fetch_myMeds,
        myMeds,
        set_myMeds,
        spinner,
        selectedDate,
        set_selectedDate,
        toggle_taken,
    };
};

export default Med;
