describe("ETA", () => {
    const { etaTime } = require("../../src/functions");

    it("should accept only Date or valid number param", () => {
        etaTime(new Date(1609470000000));
        etaTime(Date.now());
        etaTime("1609470000000");
        etaTime(1609470000000);

        expect(() => etaTime(undefined)).toThrowError("Invalid date param");
        expect(() => etaTime('foo')).toThrowError("Invalid date param");
        expect(() => etaTime({})).toThrowError("Invalid date param");
    })

    it("works", () => {
        const times = {
            nextWeek: Date.now() + (1000*60*60*24*7),
            nextDay: Date.now() + (1000*60*60*24),
            nextHour: Date.now() + (1000*60*60),
            nextMinute: Date.now() + (1000*60)
        }

        for (let key in times) {
            const date = times[key];
            const eta = etaTime(date);

            expect(eta).toBeInstanceOf(String);
            expect(eta).toMatch(/\d+./);
        }
    });
});