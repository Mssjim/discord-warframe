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