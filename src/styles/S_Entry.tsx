import styled from 'styled-components';
import { Box, Grid } from './S_Box';

export const InputLine = styled(Grid)``;
export const Input = styled(Grid)``;
export const Label = styled(Box)``;
export const BtnWrapper = styled(Grid)<{ count: number }>`
    grid-template-columns: ${(p) => {
        return `repeat(${p.count}, 1fr)`;
    }};
`;
export const Btn = styled(Grid)<{ isOn: boolean }>`
    --onColor: lightblue;
    border-radius: 8px;
    border: 1px solid;
    padding: 0.4rem;
    cursor: pointer;
    background-color: ${(p) => {
        return p.isOn ? 'var(--onColor)' : '';
    }};

    :hover {
        background-color: var(--onColor);
    }
`;

// ----------------------------------
export const ArrayWrapper = styled(Grid)`
    padding: 2rem;
    gap: 1rem;
    ${InputLine} {
        grid-template-columns: minmax(6rem, 15rem) 15rem;
        ${Label} {
            /* border: 2px solid blue; */
            font-size: 1.4rem;
        }
        ${Input} {
            height: 100%;
            input {
                height: 100%;
                font-size: 1.2rem;
            }
            ${BtnWrapper} {
                gap: 0.5rem;
                ${Btn} {
                }
            }
        }
    }
`;
