describe("full run", () => {
    it("passes", () => {
        cy.visit("http://127.0.0.1:3002");

        // Check if one sequence is displayed
        cy.get('div[cy-elem="list-item"]').should("have.length", 1);

        // Check if buttons are disabled
        cy.get('button[cy-role="play"]').should("be.disabled");
        cy.get('button[cy-role="pause"]').should("not.exist");
        cy.get('button[cy-role="restart"]').should("be.disabled");
        cy.get('button[cy-role="delete"]').should("be.enabled");
        cy.get("button").contains(/edit/i).should("be.disabled");

        // Change tab to settings
        cy.get("a")
            .contains(/settings/i)
            .click();

        // Add test plugin
        cy.get('div[role="combobox"]').click();
        cy.get('div[role="option"]').contains(/test/i).click();
        cy.get("button").contains(/add/i).click();

        // Check for default values
        cy.get('input[name="ip"]').should("have.attr", "value", "127.0.0.1");
        cy.get('input[name="port"]').should("have.attr", "value", "8099");

        // Save
        cy.get("button").contains(/save/i).click();

        // Get table row (only one should be visible)
        const tableRow = cy.get("tbody > tr");
        tableRow.should("have.length", 1);

        // It should fail after 2 seconds
        tableRow.get(".label").contains(/error/i).should("exist");

        // So we restart it
        tableRow
            .get("button")
            .contains(/restart/i)
            .click();

        // And type the correct port number
        cy.get('input[name="port"]').clear().type("2222");
        cy.get("button").contains(/save/i).click();

        // And this time it should have RUNNING status
        tableRow
            .get(".label")
            .contains(/running/i)
            .should("exist");

        // So we switch to the playout page
        cy.get("a")
            .contains(/playout/i)
            .click();

        // Check if buttons are enabled
        cy.get('button[cy-role="play"]').should("be.enabled");
        cy.get('button[cy-role="pause"]').should("not.exist");
        cy.get('button[cy-role="restart"]').should("be.disabled");
        cy.get('button[cy-role="delete"]').should("be.enabled");
        cy.get("button").contains(/edit/i).should("be.enabled");

        // Check sequence
        cy.get("div")
            .contains(/actions:/i)
            .invoke("text")
            .should("contain", "4");
        cy.get("div")
            .contains(/duration:/i)
            .invoke("text")
            .should("contain", "4 s");

        // Play the damn sequence
        const playoutStatus = cy.get("h5").contains(/playout/i);
        playoutStatus.invoke("text").should("contain", "STOPPED");
        cy.get('button[cy-role="play"]').click();
        cy.get("h5")
            .contains(/playout/i)
            .invoke("text")
            .should("contain", "1/4");
        cy.get("h5")
            .contains(/playout/i)
            .invoke("text")
            .should("contain", "2/4");
        cy.get("h5")
            .contains(/playout/i)
            .invoke("text")
            .should("contain", "3/4");
        cy.get("h5")
            .contains(/playout/i)
            .invoke("text")
            .should("contain", "4/4");
        cy.get("h5")
            .contains(/playout/i)
            .invoke("text")
            .should("contain", "STOPPED");
    });
});
