describe('Auth Routing Test', () => {
    let userTestData;
    beforeEach(() => {
        cy.fixture('user.json').then((user) => {
            userTestData = user;
        });
    })

    it('Should be sign in', () => {
        cy.request('POST', '/login', userTestData)
            .then((response) => {
                const body = response.body;
                expect(body).to.contain.property('status');
                expect(body.status).to.eq(true);
                expect(body).to.contain.property('token');
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
    });

    it('Should not login from the wrong user information', () => {
        cy.request('POST', '/login', { UserIdentityNo: '123', UserPassword: 'asdasd' })
            .then((response) => {
                const body = response.body;
                expect(body).to.contain.property('status');
                expect(body.status).to.eq(404);
                expect(body).to.contain.property('message');
                expect(body).not.to.contain.property('token');
                expect(body).not.to.contain.property('response');
            });
    });

    it('Should not be logged in with missing information', () => {
        cy.request('POST', '/login', { UserPassword: 'asdasd' })
            .then((response) => {
                const body = response.body;
                expect(body).to.contain.property('status');
                expect(body.status).to.eq(false);
                expect(body).to.contain.property('message');
                expect(body).not.to.contain.property('token');
                expect(body).not.to.contain.property('response');
            });

        cy.request('POST', '/login', { UserIdentityNo: '123' })
            .then((response) => {
                const body = response.body;
                expect(body).to.contain.property('status');
                expect(body.status).to.eq(false);
                expect(body).to.contain.property('message');
                expect(body).not.to.contain.property('token');
                expect(body).not.to.contain.property('response');
            });
    });
});
