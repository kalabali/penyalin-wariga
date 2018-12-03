const calendarBaliInfo = require('../calendar-bali-info');

it("throw error when passed non object", () => {
    return expect(calendarBaliInfo("non object"))
        .rejects.toThrow('expected object as options!');
});

it("throw error when month is not passed in options", () => {
    return expect(calendarBaliInfo({year: 2018}))
    .rejects.toThrow(`expected properties month passed in options`);
})

it("throw error when year is not passed in options", () => {
    return expect(calendarBaliInfo({month: 11}))
    .rejects.toThrow(`expected properties year passed in options`);
})

it("throw error when month set to string \"november\"", () => {
    return expect(calendarBaliInfo({
        month: "november",
        year: 2018
    })).rejects.toThrow(
        "month expected as integer and value from 0 to 11!"
    );
})



