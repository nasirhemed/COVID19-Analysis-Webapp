import { CountrySeries } from "../../store/types/data"
import {getGroupedData} from './'

describe('Utilities test', () => {

    it('be successful', () => {

        const sampleData: CountrySeries[] = [
            {
                country: "US",
                dates: ['1/22/20',
                    '1/23/20',
                    '1/24/20',
                    '1/25/20',
                    '1/26/20',
                    '1/27/20',
                    '1/28/20'
                ],
                confirmed: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7
                ],
                deltaConfirmed: [
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1
                ],
                deltaRecovered: [
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1
                ],
                recovered: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7
                ],
                deaths: [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]

            }
        ]


        const grouped = getGroupedData(sampleData)
        const expected: CountrySeries[] = [
            {
                country: 'US',
                confirmed: [7],
                recovered: [7],
                deaths: [0],
                deltaConfirmed: [7],
                deltaRecovered: [7],
                dates: [ 'Week 1']
            }
        ]

        expect(expected).toEqual(grouped)
    })
})

//'1/29/20',
        //         '1/30/20',
        //         '1/31/20',
        //         '2/1/20',
        //         '2/2/20',
        //         '2/3/20',
        //         '2/4/20',
        //         '2/5/20',
        //   '2/6/20',
        //   '2/7/20',
        //   '2/8/20',
        //   '2/9/20',
        //   '2/10/20',
        //   '2/11/20',