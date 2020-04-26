Cypress.Commands.add('login', () => {
    cy.fixture('user.json').then((userTestData) => {
        cy.request('POST', '/login', userTestData)
            .then((response) => {
                const body = response.body;
                expect(body).to.contain.property('status');
                expect(body.status).to.eq(true);
                expect(body).to.contain.property('token');
                document.cookie = body.token;
                expect(body).to.contain.property('response');
                expect(body.response).to.have.contain.property('UserID');
                expect(body.response).to.have.contain.property('UserFirstName');
                expect(body.response).to.have.contain.property('UserLastName');
                expect(body.response).to.have.contain.property('UserIdentityNo');
                expect(body.response.UserIdentityNo).to.eq(parseInt(userTestData.UserIdentityNo));
                expect(body.response).to.have.contain.property('UserEmail');
                expect(body.response).to.have.contain.property('UserPhone');
                expect(body.response).to.have.contain.property('UserStatusName');
            });
        cy.wait(2000);
    });
});