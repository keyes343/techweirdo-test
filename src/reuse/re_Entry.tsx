import React, { useContext } from 'react';
import { h, r, s, t } from './incoming';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const InputLine = () => {
    const S = s.ent;

    const state_med = useContext(r.med.StateContext);
    const dispatch_med = useContext(r.med.DispatchContext)!;

    const times: t.med.Med['time_of_day'][] = ['Morning', 'Afternoon', 'Evening', 'Night'];
    const meals: t.med.Med['meal'][] = ['After', 'Before'];
    const med_types: t.med.Med['med_type'][] = ['Lotion', 'Syrup', 'Tablet', 'others'];

    const fields: {
        label: string;
        action: keyof r.med.State;
        ui: any;
    }[] = [
        {
            label: 'Medicine Name',
            action: 'name',
            ui: (
                <S.Input>
                    <input
                        value={state_med.name ?? ''}
                        onChange={(e) => {
                            dispatch_med({
                                type: r.med.act['set-state'],
                                payload: {
                                    name: e.currentTarget.value,
                                },
                            });
                        }}
                    />
                </S.Input>
            ),
        },
        {
            label: 'Start Date',
            action: 'start',
            ui: (
                <DatePicker
                    selected={state_med.start}
                    minDate={new Date()}
                    isClearable
                    showYearDropdown
                    // scrollableYearDropdown
                    scrollableMonthYearDropdown
                    onChange={(date) => {
                        console.log({ date });
                        dispatch_med({
                            type: r.med.act['set-state'],
                            payload: {
                                start: date as Date,
                            },
                        });
                    }}
                />
            ),
        },
        {
            label: 'End Date',
            action: 'end',
            ui: (
                <DatePicker
                    selected={state_med.end}
                    minDate={state_med.start}
                    isClearable
                    showYearDropdown
                    // scrollableYearDropdown
                    scrollableMonthYearDropdown
                    onChange={(date) => {
                        console.log({ date });
                        dispatch_med({
                            type: r.med.act['set-state'],
                            payload: {
                                end: date as Date,
                            },
                        });
                    }}
                />
            ),
        },
        // quantity
        {
            label: 'Quantity ( no. of pills / doses )',
            action: 'quantity',
            ui: (
                <input
                    type="number"
                    value={state_med.quantity ?? ''}
                    onChange={(e) => {
                        dispatch_med({
                            type: r.med.act['set-state'],
                            payload: {
                                quantity: parseInt(e.currentTarget.value, 10),
                            },
                        });
                    }}
                />
            ),
        },
        // med type
        {
            label: 'Medicine Type',
            action: 'med_type',
            ui: (
                <S.BtnWrapper count={med_types.length}>
                    {med_types.map((med_type, i) => {
                        return (
                            <S.Btn
                                key={i}
                                isOn={state_med.med_type === med_type}
                                onClick={() => {
                                    dispatch_med({
                                        type: r.med.act['set-state'],
                                        payload: {
                                            med_type,
                                        },
                                    });
                                }}
                            >
                                {med_type}
                            </S.Btn>
                        );
                    })}
                </S.BtnWrapper>
            ),
        },
        // med time
        {
            label: 'Medicine time',
            action: 'time_of_day',
            ui: (
                <S.BtnWrapper count={times.length}>
                    {times.map((time, i) => {
                        return (
                            <S.Btn
                                key={i}
                                isOn={state_med.time_of_day === time}
                                onClick={() => {
                                    dispatch_med({
                                        type: r.med.act['set-state'],
                                        payload: {
                                            time_of_day: time,
                                        },
                                    });
                                }}
                            >
                                {time}
                            </S.Btn>
                        );
                    })}
                </S.BtnWrapper>
            ),
        },
        // meal timings
        {
            label: 'Meal timings',
            action: 'meal',
            ui: (
                <S.BtnWrapper count={meals.length}>
                    {meals.map((meal, i) => {
                        return (
                            <S.Btn
                                key={i}
                                isOn={state_med.meal === meal}
                                onClick={() => {
                                    dispatch_med({
                                        type: r.med.act['set-state'],
                                        payload: {
                                            meal,
                                        },
                                    });
                                }}
                            >
                                {meal}
                            </S.Btn>
                        );
                    })}
                </S.BtnWrapper>
            ),
        },
    ];
    return (
        <S.ArrayWrapper>
            {fields.map((field, i) => {
                return (
                    <S.InputLine>
                        <S.Label key={i}>{field.label}</S.Label>
                        <S.Input>{field.ui}</S.Input>
                    </S.InputLine>
                );
            })}
        </S.ArrayWrapper>
    );
};

export const Save = () => {
    const S = s.ent;
    const hook_med = h.Med();
    const hook_user = h.User();

    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;
    // const save = () => {
    //     const { myMeds, fetch_meds, set_myMeds,save_meds } = hook_med;
    //     if (hook_med.myMeds) hook_med.fetch_meds();
    // };

    return (
        <S.Save>
            <S.Btn
                isOn={false}
                onClick={() => {
                    if (state_user.acknowledged) {
                        hook_med.save_meds();
                    } else {
                        hook_user.LOGIN();
                    }
                }}
            >
                {hook_med.spinner ? 'Wait... Saving your meds to database' : 'Save'}
            </S.Btn>
        </S.Save>
    );
};
