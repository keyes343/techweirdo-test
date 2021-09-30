import React, { useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
import { h, r, e, s, t, reuse } from './incoming';
// import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';

export const InputLine = () => {
    const S = s.ent;

    const state_med = useContext(r.med.StateContext);
    const dispatch_med = useContext(r.med.DispatchContext)!;

    const times: t.med.Med['time_of_day'][] = ['Morning', 'Afternoon', 'Evening', 'Night'];
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
                    <input />
                </S.Input>
            ),
        },
        {
            label: 'Start Date',
            action: 'start',
            ui: (
                <DatePicker
                    selected={state_med.start}
                    // minDate={new Date()}
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
            label: 'End Name',
            action: 'end',
            ui: (
                <S.Input>
                    <input />
                </S.Input>
            ),
        },
        {
            label: 'Gap days',
            action: 'gap',
            ui: <input />,
        },
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
