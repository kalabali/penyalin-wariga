jest.mock('../html-fetch');

const purnamaTilem = require('../purnama-tilem');

// The assertion for a promise must be returned.
it('Getting purnama tilem on november 2018', () => {
    expect.assertions(1);
    return purnamaTilem(11, 2019)
        .then(data => {            
            expect(data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        date: 7,
                        month: "Nopember",
                        year: 2018,
                        events: [
                            {
                                type: "purnama-tilem",
                                event_name: "tilem",
                                information: "Tilem Kelima"
                            }
                        ]
                    }),
                    expect.objectContaining({
                        date: 22,
                        month: "Nopember",
                        year: 2018,
                        events: [
                            {
                                type: "purnama-tilem",
                                event_name: "purnama",
                                information: "Purnama Kenam"
                            }
                        ]
                    })
                ])
            )
        });
});