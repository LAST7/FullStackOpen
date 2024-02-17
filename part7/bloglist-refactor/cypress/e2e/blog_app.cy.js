describe("blog app", () => {
    beforeEach(function () {
        // reset all data and determine whether the backend is running in test env
        try {
            cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
        } catch (exception) {
            console.error("Backend not running in test environment!");
            process.exit(1)
        }

        // create the required users for testing and post them to the backend
        const user_1 = {
            username: "Cypress1",
            name: "E2E Tester1",
            password: "passwd",
        };
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, user_1);
        const user_2 = {
            username: "Cypress2",
            name: "E2E Tester2",
            password: "passwd",
        };
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, user_2);

        cy.visit("");
    });

    it("Login form is shown", function () {
        cy.contains("login").click();
        cy.contains("username");
    });

    describe("Login", () => {
        it("succeeds with correct credentials", function () {
            cy.contains("login").click();
            cy.get("#username").type("Cypress1");
            cy.get("#password").type("passwd");
            cy.get("#button-login").click();

            cy.contains("E2E Tester1 logged in");
        });

        it("fails with wrong credentials", function () {
            cy.contains("login").click();
            cy.get("#username").type("Cypress1");
            cy.get("#password").type("wrong");
            cy.get("#button-login").click();

            cy.get(".notification")
                .should("contain", "wrong username or password")
                .and("have.css", "color", "rgb(255, 0, 0)")
                .and("have.css", "border-style", "solid");

            cy.get("html").should("not.contain", "E2E Tester1 logged in");
        });
    });

    describe("when logged in", function () {
        beforeEach(function () {
            cy.login({ username: "Cypress1", password: "passwd" });
        });

        it("a blog can be created", function () {
            cy.contains("new blog").click();
            cy.get("#input-title").type("a blog created by cypress");
            cy.contains("save").click();
            cy.contains("a blog created by cypress");
        });

        describe("a blog exists", function () {
            beforeEach(function () {
                cy.createBlog({
                    title: "another blog cypress",
                });
            });

            it("it can be liked", function () {
                cy.contains("view").click();
                cy.contains("another blog cypress").get("#button-like").click();

                cy.contains("another blog cypress").get("#like").contains("1");
            });

            it("it can be deleted by its owner", function () {
                cy.contains("view").click();
                cy.contains("another blog cypress")
                    .get("#button-remove")
                    .click();

                cy.get("html").should("not.contain", "another blog cypress");
            });

            it("it can not be deleted by someone else", function () {
                cy.contains("log out").click();
                cy.login({ username: "Cypress2", password: "passwd" });

                cy.contains("view").click();
                cy.contains("another blog cypress")
                    .get("#button-remove")
                    .click();

                cy.get("html").should("contain", "another blog cypress");
            });
        });

        describe("two blogs exist", () => {
            beforeEach(function () {
                cy.createBlog({
                    title: "blog with less likes",
                    likes: 1,
                });
                cy.createBlog({
                    title: "blog with more likes",
                    likes: 5,
                });
            });

            it("the one with more likes should be upper", function () {
                cy.get(".blog").eq(0).should("contain", "blog with more likes");
                cy.get(".blog").eq(1).should("contain", "blog with less likes");
            });
        });
    });
});
