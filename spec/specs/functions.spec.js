describe('Function', () => {

    beforeAll(() => {
        console.log('\nFunctions Specs');
    });

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

    describe("Fetcher", () => {
        const { fetcher } = require('../../src/functions');
    
        it("should be able to return a response", async() => {
            await fetcher("http://github.com");
        });
    
        it("should return 'undefined' when failed to bind or not valid JSON response", async() => {
            const response = await fetcher("invalid-url");
            const response2 = await fetcher("https://raw.githubusercontent.com/Mssjim");
            
            expect(response).toBeUndefined();
            expect(response2).toBeUndefined();
        });
    
        it("should be able to return an object", async() => {
            const response = await fetcher("https://raw.githubusercontent.com/Mssjim/discord-warframe/main/src/settings.json");
    
            expect(response).toBeInstanceOf(Object);
            expect(response.json).toBe("true");
        });
    });

    describe("Title Case", () => {
        const { titleCase } = require("../../src/functions");
    
        it("works", () => {
            expect(titleCase("title case")).toEqual("Title Case");
            expect(titleCase("title-case")).toEqual("Title Case");
            expect(titleCase("tITLE cASE")).toEqual("Title Case");
            expect(titleCase("tITLE-cASE")).toEqual("Title Case");
        });
    
        it("should be able to accept numbers", () => {
            expect(titleCase(5+5)).toEqual("10");
        });
    });
});