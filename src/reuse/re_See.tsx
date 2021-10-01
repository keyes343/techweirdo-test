import React, { useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
import { h, r, e, s, t, reuse } from './incoming';
// import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const InputLine = () => {
    const S = s.see;
    const state_settings = useContext(r.settings.StateContext);
    const dispatch_settings = useContext(r.settings.DispatchContext)!;
    const hook_seeMed = h.SeeMed();
    const hook_med = h.Med();
    // const state_med = useContext(r.med.StateContext);
    // const dispatch_med = useContext(r.med.DispatchContext)!;

    const fields: {
        label: string;
        // action: keyof r.med.State;
        ui: any;
    }[] = [
        {
            label: 'Choose a Date to see meds',
            ui: (
                <DatePicker
                    selected={hook_seeMed.selectedDate}
                    minDate={new Date()}
                    isClearable
                    showYearDropdown
                    // scrollableYearDropdown
                    scrollableMonthYearDropdown
                    onChange={(date) => {
                        hook_seeMed.set_selectedDate(date as Date);
                        // dispatch_settings({
                        //     type: r.settings.act['set-date'],
                        //     payload: date as Date,
                        // });
                    }}
                />
            ),
        },
    ];

    const med_card_fields: {
        key: keyof r.med.State;
        label: string;
        identifier?: 'taken' | 'date';
        onClick: (...args: any) => void;
    }[] = [
        {
            label: 'Medicine Name',
            key: 'name',
            onClick: () => {},
        },
        {
            label: 'Quantity / Dosage per day',
            key: 'quantity',
            onClick: () => {},
        },
        {
            label: 'Medicine Type',
            key: 'med_type',
            onClick: () => {},
        },
        {
            label: 'Start Date',
            key: 'start',
            identifier: 'date',
            onClick: () => {},
        },
        {
            label: 'End Date',
            key: 'end',
            identifier: 'date',
            onClick: () => {},
        },
        {
            label: 'When to take medicine',
            key: 'time_of_day',
            onClick: () => {},
        },
        {
            label: 'Before or after meal',
            key: 'meal',
            onClick: () => {},
        },
        {
            label: 'Taken today',
            key: 'taken',
            identifier: 'taken',
            onClick: (_id: string) => {
                hook_seeMed.toggle_taken(_id);
            },
        },
    ];

    const date_to_string = (d: Date) => {
        // console.log({ d });
        const day = reuse.func.d.dayString(d.getTime(), 0, 3);
        const date = d.getDate();
        const month = reuse.func.d.monthString(d.getTime(), 0, 3);
        const year = d.getFullYear();
        const final = `${day} / ${date} / ${month} / ${year}`;
        return final;
        // return d;
    };

    const date_text = (date: Date) => {
        const d_ = new Date(date);
        const date_ = d_.getDate();
        const month = d_.getMonth();
        const year = d_.getFullYear();
        const date_text = `${date_}/${month}/${year}`;
        return date_text;
    };
    return (
        <s.Box>
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
            <S.CardArray>
                {hook_seeMed.myMeds === false
                    ? 'No medicine for this date'
                    : hook_seeMed.myMeds === null
                    ? 'Not fetched'
                    : hook_seeMed.myMeds.map((med, i) => {
                          return (
                              <S.Card key={i}>
                                  {med_card_fields.map((field, i) => {
                                      const date_exists = med.taken.includes(date_text(hook_seeMed.selectedDate!));
                                      return (
                                          <S.Pair key={i}>
                                              <S.Label>{field.label}</S.Label>
                                              {field.identifier === 'date' ? (
                                                  <S.Text>{date_to_string(new Date(med[field.key] as string))}</S.Text>
                                              ) : field.identifier === 'taken' ? (
                                                  <S.Text
                                                      bd="grey"
                                                      pd="0 0.7rem"
                                                      wd="auto"
                                                      pointer
                                                      bgcl={date_exists ? 'yellow' : 'maroon'}
                                                      clr={date_exists ? '' : 'white'}
                                                      onClick={() => {
                                                          field.onClick(med._id!);
                                                      }}
                                                  >
                                                      {hook_seeMed.spinner ? 'Wait......' : date_exists ? 'Yes' : 'No'}
                                                  </S.Text>
                                              ) : (
                                                  <S.Text>{med[field.key]}</S.Text>
                                              )}
                                          </S.Pair>
                                      );
                                  })}
                              </S.Card>
                          );
                      })}
            </S.CardArray>
        </s.Box>
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
